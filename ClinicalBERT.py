from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch

# Load model and tokenizer (downloads once)
model_name = "emilyalsentzer/Bio_ClinicalBERT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForMaskedLM.from_pretrained(model_name)

# Example text
text = "The patient was diagnosed with [MASK] failure."
inputs = tokenizer(text, return_tensors="pt")

# Predict
with torch.no_grad():
    outputs = model(**inputs)
    predictions = outputs.logits

# Decode the top prediction
mask_token_index = (inputs.input_ids == tokenizer.mask_token_id)[0].nonzero(as_tuple=True)[0]
predicted_token_id = predictions[0, mask_token_index].argmax(axis=-1)
predicted_word = tokenizer.decode(predicted_token_id)

print("Predicted word:", predicted_word)