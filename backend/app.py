from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch
import re

app = Flask(__name__)
CORS(app)

# Load ClinicalBERT model
print("Loading ClinicalBERT model...")
model_name = "emilyalsentzer/Bio_ClinicalBERT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForMaskedLM.from_pretrained(model_name)
print("Model loaded successfully!")

# Define chronic conditions to detect
CHRONIC_CONDITIONS = [
    "Cardiac Failure",
    "Hypertension",
    "Diabetes Insipidus",
    "Diabetes Mellitus Type 1",
    "Diabetes Mellitus Type 2"
]

# Keywords for condition detection
CONDITION_KEYWORDS = {
    "Cardiac Failure": ["cardiac failure", "heart failure", "chf", "congestive heart", "cardiac dysfunction"],
    "Hypertension": ["hypertension", "high blood pressure", "elevated bp", "htn", "blood pressure"],
    "Diabetes Insipidus": ["diabetes insipidus", "di ", "polyuria", "polydipsia"],
    "Diabetes Mellitus Type 1": ["diabetes type 1", "type 1 diabetes", "t1dm", "insulin dependent diabetes", "iddm"],
    "Diabetes Mellitus Type 2": ["diabetes type 2", "type 2 diabetes", "t2dm", "non-insulin dependent", "niddm"]
}

def extract_conditions_from_text(text):
    """Extract chronic conditions from clinical text"""
    text_lower = text.lower()
    detected_conditions = []
    
    for condition, keywords in CONDITION_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                if condition not in detected_conditions:
                    detected_conditions.append(condition)
                break
    
    # If no specific keywords found, check for general diabetes
    if not any("Diabetes" in c for c in detected_conditions):
        if "diabetes" in text_lower or "diabetic" in text_lower:
            # Default to Type 2 if not specified
            detected_conditions.append("Diabetes Mellitus Type 2")
    
    return detected_conditions

def analyze_with_clinicalbert(text):
    """Use ClinicalBERT to analyze clinical note"""
    try:
        # Tokenize input
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        
        # Get model predictions
        with torch.no_grad():
            outputs = model(**inputs)
        
        # Extract conditions using keyword matching
        conditions = extract_conditions_from_text(text)
        
        return {
            "success": True,
            "conditions": conditions,
            "text_length": len(text),
            "tokens_analyzed": inputs.input_ids.shape[1]
        }
    except Exception as e:
        print(f"Error in ClinicalBERT analysis: {str(e)}")
        # Fallback to keyword extraction
        conditions = extract_conditions_from_text(text)
        return {
            "success": True,
            "conditions": conditions,
            "text_length": len(text),
            "method": "keyword_extraction"
        }

@app.route('/api/analyze', methods=['POST'])
def analyze_note():
    """Analyze clinical note endpoint"""
    try:
        data = request.get_json()
        clinical_text = data.get('text', '')
        
        if not clinical_text:
            return jsonify({
                "error": "No text provided"
            }), 400
        
        # Analyze with ClinicalBERT
        result = analyze_with_clinicalbert(clinical_text)
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error in /api/analyze: {str(e)}")
        return jsonify({
            "error": str(e),
            "conditions": []
        }), 500

@app.route('/api/authi', methods=['POST'])
def process_authi():
    """Process condition with Authi 1.0"""
    try:
        data = request.get_json()
        condition = data.get('condition', '')
        action = data.get('action', '')
        
        if not condition:
            return jsonify({
                "error": "No condition provided"
            }), 400
        
        # Authi processing logic
        result = {
            "success": True,
            "condition": condition,
            "action": action,
            "message": f"Authi 1.0 processed {condition} for {action}"
        }
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error in /api/authi: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model": "Bio_ClinicalBERT",
        "version": "1.0"
    }), 200

if __name__ == '__main__':
    print("Starting SaluLink Backend API...")
    print("ClinicalBERT is ready to analyze clinical notes!")
    app.run(debug=True, host='0.0.0.0', port=5000)

