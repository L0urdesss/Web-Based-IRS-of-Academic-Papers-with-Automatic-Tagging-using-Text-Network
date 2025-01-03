import pdfplumber
from docx import Document
import pytesseract
from PIL import Image
import json
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import networkx as nx
from collections import Counter
from nltk.util import ngrams
from itertools import permutations, combinations
import matplotlib.pyplot as plt
import nltk
import os
import re
import spacy
import enchant  
import difflib  
import sys
from meta import extract_metada

#print("0")
d = enchant.Dict("en_US")
#print("1")
#nltk.download('punkt')
#print("2")
#nltk.download('stopwords')
#print("3")
#nltk.download('wordnet')
#print("4")
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' #pabago nito mhie, kung saang path naka install tesseract mo
#print("5")
nlp = spacy.load("en_core_web_sm")  # Load spaCy language model
#print("6")

# Function to load category keywords from a JSON file
def load_category_keywords(json_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to load custom stopwords from a text file
def load_custom_stopwords(file_name):
    try:
        with open(file_name, "r", encoding="utf-8") as file:
            stopwords_list = file.read().splitlines()
        return set(stopwords_list)
    except FileNotFoundError:
        print(f"Stopwords file not found: {file_name}")
        return set()

# Base directory relative to the script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Load category keywords
category_keywords_path = os.path.join(base_dir, "dummy.json")
CATEGORY_KEYWORDS = load_category_keywords(category_keywords_path)

# Load custom stopwords
custom_keywords_path = os.path.join(base_dir, "stopwords.txt")
STOPWORDS = load_custom_stopwords(file_name=custom_keywords_path)


# Function to extract text from different file types
def extract_text(file_path):
    if file_path.endswith('.pdf'):
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
                else:
                    pil_image = page.to_image().original 
                    text += pytesseract.image_to_string(pil_image) + "\n" 
        return text
    elif file_path.endswith('.docx'):
        doc = Document(file_path)
        return "\n".join([paragraph.text for paragraph in doc.paragraphs])
    elif file_path.endswith('.txt'):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    else:
        raise ValueError("Unsupported file format. Use PDF, DOCX, or TXT.")

def preprocess_text(text):
    custom_stopwords_path = os.path.join(base_dir, "stopwords.txt")  # Direct path to stopwords.txt
    custom_stopwords = load_custom_stopwords(file_name=custom_stopwords_path)
    stop_words = set(stopwords.words("english")) | custom_stopwords

    # Remove URLs, emails, and standalone numbers
    text = re.sub(r"http\S+|www\S+|@\S+|[^@\s]+@[^@\s]+\.[^@\s]+", "", text)
    text = re.sub(r"\b\d+\b", "", text)
    text = text.lower()  
    text = text.translate(str.maketrans("", "", string.punctuation)) 

    # Tokenize and filter stopwords
    tokens = word_tokenize(text)
    tokens = [
        word for word in tokens if word not in stop_words and len(word) > 2 and d.check(word)
    ]

    # Remove named entities
    doc = nlp(" ".join(tokens))
    tokens = [
        token.text
        for token in doc
        if not token.ent_type_ in {"PERSON", "GPE", "ORG", "LOC", "DATE"}
    ]

    # Lemmatize tokens
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return tokens

#Function to match multi-word keywords effectively
def generate_ngrams(key_terms, n=2):
    ngrams = []
    for combination in combinations(key_terms, n):
        # Generate all permutations of the combination
        ngrams.extend([' '.join(p) for p in permutations(combination)])
    return ngrams

def boost_keywords(key_terms, category_keywords):
    boosted_terms = key_terms.copy()
    
    # Generate bigrams and trigrams from key terms
    bigrams = generate_ngrams(key_terms, 2)
    trigrams = generate_ngrams(key_terms, 3)
    all_grams = key_terms + bigrams + trigrams  # Combine original terms and n-grams

    # Match against keywords in category_keywords
    for keyword_list in category_keywords.values():
        for keyword in keyword_list:
            if keyword in all_grams:
                boosted_terms += [keyword] * 5  # Boost multi-word keywords

    return boosted_terms

# Function to build a text network
def build_text_network(tokens, window_size=5):
    """
    Build a text network where edge weights represent co-occurrence counts.
    """
    co_occurrences = []
    for i in range(len(tokens) - window_size + 1):
        window = tokens[i:i + window_size]
        co_occurrences.extend(combinations(window, 2))  

    co_occurrence_counts = Counter(co_occurrences)

    G = nx.Graph()
    for (word1, word2), weight in co_occurrence_counts.items():
        G.add_edge(word1, word2, weight=weight) 
    return G

def extract_key_terms(G, tokens, top_n=5):
    # Calculate centrality for nodes
    centrality = nx.degree_centrality(G)
    term_freq = Counter(tokens)  # Calculate term frequency for single tokens

    # Combine centrality and frequency for scoring
    combined_scores = {node: centrality.get(node, 0) + term_freq[node] for node in G.nodes}
    sorted_terms = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)

    # Extract top N key terms
    return [term for term, _ in sorted_terms[:top_n]]

# Function to match key terms with predefined categories
def match_key_terms_to_topics(combined_terms, category_keywords, threshold=0.8):
    if not combined_terms or not category_keywords:
        return None, None

    best_subtopic = None
    best_main_topic = None
    max_score = 0

    # Loop through main topics and their subtopics
    for main_topic, details in category_keywords.items():
        if "subtopics" not in details:
            continue

        for subtopic, keywords in details["subtopics"].items():
            score = 0

            # Scoring based on matches
            for term in combined_terms:
                if term in keywords:  # Exact match
                    # Assign a higher weight for n-grams
                    if len(term.split()) == 2:  # Bigram
                        score += 5
                    elif len(term.split()) > 2:  # Trigram or longer
                        score += 7
                    else:  # Single word
                        score += 3
                else:
                    # Fuzzy match for single words (less weight)
                    if len(term.split()) == 1:  # Only apply fuzzy matching to single words
                        close_matches = difflib.get_close_matches(term, keywords, n=1, cutoff=threshold)
                        if close_matches:
                            score += 1

            # Update the best match if the score is higher
            if score > max_score:
                best_subtopic = subtopic
                best_main_topic = main_topic
                max_score = score

    return best_main_topic, best_subtopic


def match_with_nested_keywords(key_terms, category_keywords):
    category_scores = match_key_terms_to_topics(key_terms, category_keywords)
    # Find the category with the highest score
    best_category = max(category_scores, key=category_scores.get)
    return best_category, category_scores

# Visualization with adjustable edge thickness
def visualize_text_network_with_scaled_edges(G, key_terms, max_thickness=5):
    """
    Visualize the text network using only the extracted key terms.
    """
    limited_nodes = [node for node in G.nodes if node in key_terms]
    subgraph = G.subgraph(limited_nodes)

    edge_weights = nx.get_edge_attributes(subgraph, 'weight')
    max_weight = max(edge_weights.values(), default=1)  

    scaled_weights = {
        edge: 1 + (max_thickness - 1) * (weight / max_weight)
        for edge, weight in edge_weights.items()
    }
    
    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(subgraph)

    # Draw nodes and edges
    nx.draw(
        subgraph, pos, with_labels=True,
        node_size=500, font_size=10, edge_color='gray', alpha=0.7
    )
    nx.draw_networkx_edges(
        subgraph, pos,
        width=[scaled_weights[edge] for edge in subgraph.edges]
    )
    nx.draw_networkx_edge_labels(subgraph, pos, edge_labels=edge_weights)

    plt.title("Key Terms in Text Network", fontsize=16)
    plt.show()


def hybrid_categorization_with_nested_keywords(file_path):
    # Step 1: Extract and preprocess text
    raw_text = extract_text(file_path)
    tokens = preprocess_text(raw_text)

    #extract metadata
    result = extract_metada(file_path)
    # print("Title:", result["Title"])
    # print("College:", result["College"])
    # print("Course:", result["Course"])
    # print("Authors:", result["Authors"])
    # print("Year:", result["Year"])
    # print("Number of Pages:", result.get("Number of Pages", "N/A"))
    # print("File Size:", result.get("File Size", "N/A"))

    # Step 2: Build the text network
    G = build_text_network(tokens)
    
    # Step 3: Extract key terms (top 20 terms)
    key_terms = extract_key_terms(G, tokens, top_n=5)
    
    # Step 4: Generate n-grams from key terms
    bigrams = generate_ngrams(key_terms, 2)
    trigrams = generate_ngrams(key_terms, 3)
    combined_terms = key_terms + bigrams + trigrams  # Combine original terms and n-grams
    
    # Step 5: Determine main topic and subtopic using boosted terms
    main_topic, subtopic = match_key_terms_to_topics(combined_terms, CATEGORY_KEYWORDS)
    
    # Step 6: Visualize the network
    #visualize_text_network_with_scaled_edges(G, tokens, num_words=num_words, max_thickness=5)
    #visualize_text_network_with_scaled_edges(G, key_terms, max_thickness=5)
    
    return {
        "Main Topic": main_topic,
        "Subtopic": subtopic if subtopic else "None",
        "Key Terms": key_terms
    }

# Main function
if __name__ == "__main__":
    # Check for correct usage
    if len(sys.argv) < 2:
        print("Usage: python script.py <file_path>")
        sys.exit(1)

    # Get file path from arguments
    file_path = sys.argv[1]

    # Check if file exists
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        sys.exit(1)

    # Perform hybrid categorization
    result = hybrid_categorization_with_nested_keywords(file_path)

    # Print the result in JSON format
    if result:
        print(json.dumps(result, indent=4))