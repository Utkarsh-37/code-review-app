# check_models.py
import google.generativeai as genai
import os

# Temporarily paste your API key here for this one-time check
API_KEY = "AIzaSyBNnp9KJoQIvdsOj6s5EwUGoXNRNuc2MWw" 

genai.configure(api_key=API_KEY)

print("Available models that support 'generateContent':")
for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(f"- {m.name}")