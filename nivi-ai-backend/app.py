import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai # <-- YEH LINE BADLI HAI
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found. Please set it in the .env file.")

genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
CORS(app)

custom_responses = {
    "what is your name": "My name is NIVI AIGPT 🙂",
    "who made you": """I was created by my amazing team:

Archisman Karmakar (Frontend Engineer, Team Lead)
Mriganka Banik (UI/UX Designer, Researcher)
Hiya Maity (AI-ML Deployment, Lead Presenter)
Debojit Neogy (Backend Engineer)
Debjit Karmakar (Researcher, PPT Editor)
Samir Shaw (Frontend Engineer)"""
}

def chatbot_response(user_input):
    user_input_lower = user_input.lower()

    for key in custom_responses:
        if key in user_input_lower:
            return custom_responses[key]

    try:
        # Model ko initialize karne ka naya tareeka
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(user_input)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "Sorry, I am having trouble connecting to my brain right now. Please try again later."

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    reply = chatbot_response(user_message)
    
    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)