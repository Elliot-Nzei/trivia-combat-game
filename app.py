from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import random
from pathlib import Path

app = FastAPI()

# Allow frontend access (adjust origins if deploying securely)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent / "questions.json"

@app.get("/questions")
def get_questions():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        questions = json.load(f)
    return random.sample(questions, min(len(questions), 5))  # Send 5 random questions
