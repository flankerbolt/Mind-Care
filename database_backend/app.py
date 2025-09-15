# database_backend/app.py

import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from datetime import datetime
from flask_cors import CORS
import google.generativeai as genai

# --- INITIALIZATIONS ---

load_dotenv()
app = Flask(__name__)
CORS(app) 

# --- CONFIGURATIONS ---

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- EXTENSIONS ---

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- GOOGLE GEMINI AI ---

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)

# --- DATABASE MODELS ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ... (Yahan aap aur models jaise Counselor, Assessment, Booking add kar sakte hain) ...

# --- SCHEMAS ---

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True # Optional: If you want to load instances from data

user_schema = UserSchema()

# --- CHATBOT LOGIC ---

def chatbot_response(user_input):
    if not GOOGLE_API_KEY:
        return "Sorry, my AI brain is currently offline as the API key is missing."
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(user_input)
        return response.text
    except Exception as e:
        return "Sorry, I am having trouble connecting to my brain right now."

# --- API ROUTES ---

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    reply = chatbot_response(user_message)
    return jsonify({"reply": reply})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity={'id': user.id})
        return jsonify(access_token=access_token, user=user_schema.dump(user))
    return jsonify({"message": "Invalid email or password"}), 401

# --- RUN APPLICATION ---

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)