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

# Function to extract text from the first page of the PDF
def extract_first_page_text(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    if doc.page_count > 0:
        first_page = doc[0]  # Get the first page
        text = first_page.get_text()  # Extract text from the first page
    return text

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

# Function to apply S.Y. restriction on text (if S.Y. appears on the first page)
def apply_sy_restriction(text):
    # Find the position of "S.Y." in the text (case-insensitive search)
    sy_pos = text.lower().find("s.y.")

    # If "S.Y." is found, consider only the part before it
    if sy_pos != -1:
        text = text[:sy_pos]

    return text

# Main process
pdf_path = "PDF Files (For testing)//SGM-MRC_CHAP1-3.pdf"
text = extract_first_page_text(pdf_path)  # Extract only from the first page

# Apply restriction (only scan text before "S.Y.")
restricted_text = apply_sy_restriction(text)

# Clean the restricted text
cleaned_text = clean_text(restricted_text)
print("Cleaned Text (Before S.Y.):")
print(cleaned_text)

# Extract degree and course
degree, course = extract_degree_course(cleaned_text)

# Output the degree and course
print("\nExtracted Information:")
print(f"Degree: {degree}")
print(f"Course: {course}")
