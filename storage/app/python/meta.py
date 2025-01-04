import spacy
import re
from spacy.matcher import Matcher
import pdfplumber
import pytesseract
import os
import json
import sys

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Tesseract configuration
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Extract metadata from the PDF
def extract_metada(file_path):
    result = {}
    try:
        with pdfplumber.open(file_path) as pdf:
            first_page = pdf.pages[0]
            first_page_image = first_page.to_image().original

            # Extract number of pages
            result["Number of Pages"] = len(pdf.pages)

            # Extract text from the first page using OCR
            text = pytesseract.image_to_string(first_page_image)

            # Extract file size
            file_size = os.path.getsize(file_path) / 1024  # File size in KB
            result["File Size"] = f"{file_size:.2f} KB"

            # Extract additional information from text
            extracted_info = extract_information(text)
            result.update(extracted_info)

    except Exception as e:
        print(f"Error processing file: {e}")
        return None

    return result

# Extract specific information from text
def extract_information(text):
    doc = nlp(text)
    matcher = Matcher(nlp.vocab)

    # Define patterns for college and course
    college_pattern = [{"LOWER": "college"}, {"LOWER": "of"}, {"IS_TITLE": True, "OP": "+"}]
    matcher.add("COLLEGE", [college_pattern])
    course_pattern = [{"LOWER": "bachelor"}, {"LOWER": "of"}, {"LOWER": "science"}, {"LOWER": "in"}, {"IS_TITLE": True, "OP": "+"}]
    matcher.add("COURSE", [course_pattern])

    # Course abbreviations mapping
    course_abbreviations = {
        "Bachelor of Science in Computer Science": "BSCS",
        "Bachelor of Science in Information Technology": "BSIT",
        "Bachelor of Science in Information System": "BSIS",
        "Bachelor of Applied Science Major in Laboratory Technology": "BASLT",
        "Bachelor of Science in Environmental Science": "BSES",
        # Add more mappings as needed
    }

    # Extract matches
    college = ""
    course_full = ""
    matches = matcher(doc)
    for match_id, start, end in matches:
        span = doc[start:end]
        if nlp.vocab.strings[match_id] == "COLLEGE":
            college = span.text
        elif nlp.vocab.strings[match_id] == "COURSE":
            course_full = span.text

    # Convert full course name to abbreviation if it exists in the mapping
    course_abbreviation = course_abbreviations.get(course_full, course_full)  # Default to full name if no abbreviation found

    # Extract title
    lines = text.split('\n')
    title = extract_title(lines)

    # Extract authors
    authors = extract_authors(lines, title)

    # Extract year
    year = extract_year(text)

    return {
        "Title": title,
        "College": college,
        "Course": course_abbreviation,  # Abbreviated course name in output
        "Authors": authors,
        "Year": year
    }


# Extract title from text
def extract_title(lines):
    title_buffer = []
    for line in lines:
        line = line.strip()
        if line.isupper():
            title_buffer.append(line)
        elif title_buffer:
            break
        if len(title_buffer) >= 4:  # Stop after capturing enough lines
            break
    return " ".join(title_buffer) if title_buffer else ""

# Extract authors from text
def extract_authors(lines, title):
    authors = []
    title_section_done = False
    name_pattern = r'^([A-Z]+,\s[A-Z]+(\s[A-Z]+)?(\s[A-Z]\.)?|[A-Z]+(\s[A-Z]+)?(\s[A-Z]\.)?\s[A-Z]+|[A-Z]+,\s[A-Z]+(\s[A-Z]+)?|[A-Z]+\s[A-Z]+(\s[A-Z]+)?)(\.)?$'

    for line in lines:
        line = line.strip()
        if not title_section_done:
            if line.isupper():
                continue
            else:
                title_section_done = True
        if title_section_done:
            if re.match(name_pattern, line):
                authors.append(line)

    # Remove author names that are part of the title
    return [author for author in authors if author not in title]

# Extract year from text
def extract_year(text):
    year_match = re.search(r'\b(19|20)\d{2}\b', text)
    return year_match.group() if year_match else ""

# Main function
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        sys.exit(1)
    metadata = extract_metada(file_path)
    if metadata:
        print(json.dumps(metadata, indent=4))
