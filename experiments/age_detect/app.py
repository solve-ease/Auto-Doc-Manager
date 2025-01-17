import gradio as gr
import pdfplumber
import pytesseract
from PIL import Image
import io
import re
from datetime import datetime
import cv2
import numpy as np
import os
import tempfile

class EnhancedDocumentAgeExtractor:
    def __init__(self):
        self.age_patterns = {
            'direct_age': [
                r'age[:\s]+(\d+)',
                r'(\d+)\s+years?\s+old',
            ],
            'dob': [
                r'date\s+of\s+birth[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})',
                r'dob[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})',
                r'born\s+on[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})',
            ],
            'year': [
                r'birth\s+year[:\s]+(\d{4})',
                r'year\s+of\s+birth[:\s]+(\d{4})'
            ]
        }

    def preprocess_image(self, image):
        """Enhance image for better OCR results"""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Apply thresholding
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        # Noise removal
        denoised = cv2.medianBlur(thresh, 3)
        return denoised

    def extract_text_from_image(self, image):
        """Extract text from image using OCR"""
        # Preprocess image
        processed_image = self.preprocess_image(image)
        # Perform OCR
        text = pytesseract.image_to_string(processed_image)
        return text

    def calculate_age_from_dob(self, dob_str):
        """Calculate age from various date formats"""
        date_formats = [
            '%d-%m-%Y', '%d/%m/%Y', '%m-%d-%Y', '%m/%d/%Y',
            '%d-%m-%y', '%d/%m/%y', '%m-%d-%y', '%m/%d/%y'
        ]
        
        for fmt in date_formats:
            try:
                dob = datetime.strptime(dob_str, fmt)
                today = datetime.today()
                age = today.year - dob.year
                if today.month < dob.month or (today.month == dob.month and today.day < dob.day):
                    age -= 1
                return age, 'dob_calculation', 0.9
            except ValueError:
                continue
        return None, None, 0

    def process_document(self, file):
        """Process document and extract age information"""
        try:
            if isinstance(file, str):  # File path provided
                file_ext = os.path.splitext(file)[1].lower()
            else:  # File object provided
                file_ext = os.path.splitext(file.name)[1].lower()

            text = ""
            
            # Handle different file types
            if file_ext in ['.jpg', '.jpeg', '.png']:
                if isinstance(file, str):
                    image = cv2.imread(file)
                else:
                    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
                text = self.extract_text_from_image(image)
                
            elif file_ext == '.pdf':
                with pdfplumber.open(file) as pdf:
                    for page in pdf.pages:
                        text += page.extract_text() or ''
                        if page.images:
                            for img in page.images:
                                image = Image.open(io.BytesIO(img['stream']))
                                text += pytesseract.image_to_string(image)
            
            # Process extracted text
            text = text.lower()
            
            # Try different methods of age extraction
            # 1. Direct age mention
            for pattern in self.age_patterns['direct_age']:
                match = re.search(pattern, text)
                if match:
                    age = int(match.group(1))
                    if 0 <= age <= 120:
                        return {
                            'success': True,
                            'age': age,
                            'confidence': 0.95,
                            'method': 'direct_mention',
                            'text_found': match.group(0)
                        }

            # 2. Date of Birth
            for pattern in self.age_patterns['dob']:
                match = re.search(pattern, text)
                if match:
                    dob_str = match.group(1)
                    age, method, confidence = self.calculate_age_from_dob(dob_str)
                    if age:
                        return {
                            'success': True,
                            'age': age,
                            'confidence': confidence,
                            'method': method,
                            'text_found': match.group(0)
                        }

            # 3. Birth Year
            for pattern in self.age_patterns['year']:
                match = re.search(pattern, text)
                if match:
                    birth_year = int(match.group(1))
                    current_year = datetime.now().year
                    age = current_year - birth_year
                    if 0 <= age <= 120:
                        return {
                            'success': True,
                            'age': age,
                            'confidence': 0.8,
                            'method': 'birth_year',
                            'text_found': match.group(0)
                        }

            return {
                'success': False,
                'error': 'No age information found in the document',
                'confidence': 0,
                'method': None,
                'text_found': None
            }

        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'confidence': 0,
                'method': None,
                'text_found': None
            }

def process_upload(file):
    """Handle file upload and process document"""
    extractor = EnhancedDocumentAgeExtractor()
    result = extractor.process_document(file)
    
    if result['success']:
        output_html = f"""
        <div style='background-color: #f0f8ff; padding: 20px; border-radius: 10px; border: 1px solid #b8daff;'>
            <h3 style='color: #004085; margin-bottom: 15px;'>Age Information Extracted</h3>
            <p style='margin: 10px 0;'><strong>Age:</strong> {result['age']} years</p>
            <p style='margin: 10px 0;'><strong>Confidence:</strong> {result['confidence']*100:.1f}%</p>
            <p style='margin: 10px 0;'><strong>Method:</strong> {result['method'].replace('_', ' ').title()}</p>
            <p style='margin: 10px 0;'><strong>Text Found:</strong> "{result['text_found']}"</p>
        </div>
        """
    else:
        output_html = f"""
        <div style='background-color: #fff3f3; padding: 20px; border-radius: 10px; border: 1px solid #f5c6cb;'>
            <h3 style='color: #721c24; margin-bottom: 15px;'>Error</h3>
            <p style='margin: 10px 0;'>{result['error']}</p>
        </div>
        """
    
    return output_html

# Create Gradio interface
css = """
.gradio-container {
    font-family: 'Helvetica Neue', Arial, sans-serif;
}
.input-container, .output-container {
    border-radius: 15px;
    border: 1px solid #e0e0e0;
    padding: 20px;
    margin: 10px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
"""

with gr.Blocks(css=css) as app:
    gr.Markdown(
        """
        # 📄 Document Age Extractor
        Upload a document (PDF, JPG, or PNG) to extract age information. The system supports:
        * Direct age mentions
        * Date of birth calculations
        * Birth year references
        """
    )
    
    with gr.Row():
        with gr.Column():
            file_input = gr.File(
                label="Upload Document",
                file_types=[".pdf", ".png", ".jpg", ".jpeg"],
            )
            
    with gr.Row():
        output = gr.HTML(label="Results")
        
    file_input.change(
        fn=process_upload,
        inputs=[file_input],
        outputs=[output]
    )

# Launch the app
if __name__ == "__main__":
    app.launch(share=True)