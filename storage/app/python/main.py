import networkx as nx
import json  # For printing JSON format
from nltk.corpus import stopwords
from tqdm import tqdm  
from networkx.algorithms import community  
import logging
import fitz  # PyMuPDF for PDF text extraction
import nltk
import string
import re
import sys  # To capture command-line arguments
import os

# Download nltk resources if not already downloaded
nltk.download('stopwords')

# Degrees and Courses to be included in the network
degrees = ["associate", "bachelor", "master", "doctorate"]
courses = ["computer science", "information technology", "information systems", "environmental science", "laboratory technology"]

# Function to clean the text by removing stop words, punctuation, and numbers
def clean_text(text):
    stop_words = set(stopwords.words('english'))
    # Remove punctuation, numbers, and stop words
    cleaned_text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    cleaned_text = re.sub(r'\d+', '', cleaned_text)  # Remove numbers
    return ' '.join(word for word in cleaned_text.split() if word.lower() not in stop_words and len(word) > 1)

# Function to extract text from the entire PDF
def extract_pdf_text(pdf_path):
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")

    full_text = ""

    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        full_text += page.get_text()
    return full_text

# Function to extract degree and course from the text
def extract_degree_course(text):
    degree_found, course_found = None, None
    # Search for degrees
    for degree in degrees:
        if degree in text.lower():
            degree_found = degree.capitalize()
            break  # Stop once the first degree is found

    # Search for courses
    for course in courses:
        if course in text.lower():
            course_found = course.title()
            break  # Stop once the first course is found

    return degree_found, course_found

# Function to preprocess text for the graph, remove stopwords, and exclude single letters
def preprocess(line):
    stop_words = set(stopwords.words('english'))
    return [item.lower() for item in line if item.lower() not in stop_words and len(item) > 1 and not item.isdigit()]

# Optimized function to create the word network graph, including degrees and courses
def create_graph_with_degree_course(text, degree, course):
    logging.info('Creating graph with degrees and courses')
    G = nx.Graph()

    # Preprocess the text
    lines = text.splitlines()
    for line in tqdm(lines, desc="Processing lines"):
        line = preprocess(line.strip().split())
        for i, word in enumerate(line):
            if i < len(line) - 1:
                word_a, word_b = word, line[i + 1]
                G.add_edge(word_a, word_b, weight=G.get_edge_data(word_a, word_b, default={'weight': 0})['weight'] + 1)

    # Add degree and course as nodes connected to nearby words
    if degree:
        G.add_node(degree, color='green', size=30, shape='triangle')  # Set shape as triangle for degree
        connect_nearby_words(G, degree, lines, 5)  # Connect to words within a context window of 5
    if course:
        G.add_node(course, color='green', size=30, shape='rectangle')  # Set shape as rectangle for course
        connect_nearby_words(G, course, lines, 5)

    return G

# Helper function to connect degree/course to nearby words
def connect_nearby_words(graph, node, lines, window_size):
    for line in lines:
        words = preprocess(line.strip().split())
        if node.lower() in line.lower():
            for i, word in enumerate(words):
                if node.lower() in words[i]:
                    for j in range(max(0, i - window_size), min(len(words), i + window_size + 1)):
                        if len(words[j]) > 1 and words[j] != node.lower():  # Ensure no single letter
                            graph.add_edge(node, words[j], weight=1)

# Calculate central nodes based on betweenness centrality
def calculate_central_nodes(text_network):
    logging.info('Calculating centrality')
    bc = nx.betweenness_centrality(text_network, weight='weight')
    nx.set_node_attributes(text_network, bc, 'betweenness')
    
    # Threshold for keeping nodes with high centrality
    bc_threshold = sorted(bc.values(), reverse=True)[10] if len(bc) > 100 else min(bc.values())
    filtered_network = text_network.subgraph([n for n in bc if bc[n] > bc_threshold])
    
    return filtered_network

# Detect and assign communities
def create_and_assign_communities(text_network):
    logging.info("Assigning communities")
    communities_generator = community.girvan_newman(text_network)
    top_level_communities = next(communities_generator)
    next_level_communities = next(communities_generator)
    
    communities = {item: next_level_communities.index(community) for community in next_level_communities for item in community}
    return communities

# Main process for Text Network Analysis (TNA)
if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s %(message)s')
    logging.getLogger().setLevel(logging.INFO)
    
    # Get the path from the command-line argument
    file_path = sys.argv[1]

    # Step 1: Extract text from the uploaded PDF
    full_text = extract_pdf_text(file_path)
    # Step 2: Clean the extracted text
    cleaned_full_text = clean_text(full_text)

    # Step 3: Extract degree and course from the first page
    first_page_text = extract_pdf_text(file_path)

    degree, course = extract_degree_course(first_page_text)

    # Output degree and course from the first page before visualization
    
    # Step 4: Create the word network graph, including degree and course
    text_network = create_graph_with_degree_course(cleaned_full_text, degree, course)
    
    # Step 5: Filter central nodes
    text_network = calculate_central_nodes(text_network)
    
    # Step 6: Detect and assign communities
    communities = create_and_assign_communities(text_network)

    # Step 7: Print the JSON output
    data = {
        "degree": degree,
        "course": course,
        "tags": list(communities.keys())
    }
    
    print(json.dumps(data, indent=4))
