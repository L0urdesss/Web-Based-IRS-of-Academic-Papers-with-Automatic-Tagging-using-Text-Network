import fitz
import nltk
from nltk.corpus import stopwords
import string

# Function to clean the text by removing stop words and punctuation
def clean_text(text):
    stop_words = set(stopwords.words('english'))  # Load English stopwords
    # Remove punctuation and stop words
    cleaned_text = ' '.join(
        word for word in text.split() if word.lower() not in stop_words and word not in string.punctuation)
    return cleaned_text

# Function to extract text from the entire PDF
def extract_pdf_text(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        full_text += page.get_text()
    return full_text

# Function to extract the text from only the first page of the PDF
def extract_first_page_text(pdf_path):
    doc = fitz.open(pdf_path)
    first_page_text = ""
    if doc.page_count > 0:
        first_page = doc[0]  # Get the first page
        first_page_text = first_page.get_text()  # Extract text from the first page
    return first_page_text

# Function to extract degree and course from the text
def extract_degree_course(text):
    # Define possible degrees and courses
    degrees = ["associate", "bachelor", "master", "doctorate"]
    courses = ["computer science", "information technology", "information systems", "environmental science",
               "laboratory technology"]

    degree_found = None
    course_found = None

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

# Main process
pdf_path = "PDF Files (For testing)//MRC_CHAP1.pdf"

# Extract and clean the entire PDF text
full_text = extract_pdf_text(pdf_path)
cleaned_full_text = clean_text(full_text)

# Extract and clean the first page text
first_page_text = extract_first_page_text(pdf_path)
cleaned_first_page_text = clean_text(first_page_text)

# Extract degree and course only from the cleaned first page text
degree, course = extract_degree_course(cleaned_first_page_text)

# Output the cleaned full text and degree/course from the first page
print("Cleaned Full Text (Entire PDF):")
print(cleaned_full_text)

print("\nExtracted Information from First Page:")
print(f"Degree: {degree}")
print(f"Course: {course}")
