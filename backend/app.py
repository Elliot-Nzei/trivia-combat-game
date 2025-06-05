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



@app.get("/questions/{question_id}")
def get_question(question_id: int):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        questions = json.load(f)
    if 0 <= question_id < len(questions):
        return questions[question_id]
    else:
        return {"error": "Question not found"}, 404

@app.post("/questions")
def add_question(question: dict):
    with open(DATA_PATH, "r+", encoding="utf-8") as f:
        questions = json.load(f)
        questions.append(question)
        f.seek(0)
        json.dump(questions, f, indent=4)
    return {"message": "Question added successfully", "question": question}

@app.delete("/questions/{question_id}")
def delete_question(question_id: int):
    with open(DATA_PATH, "r+", encoding="utf-8") as f:
        questions = json.load(f)
        if 0 <= question_id < len(questions):
            deleted_question = questions.pop(question_id)
            f.seek(0)
            f.truncate()
            json.dump(questions, f, indent=4)
            return {"message": "Question deleted successfully", "question": deleted_question}
        else:
            return {"error": "Question not found"}, 404
        
@app.put("/questions/{question_id}")
def update_question(question_id: int, updated_question: dict):
    with open(DATA_PATH, "r+", encoding="utf-8") as f:
        questions = json.load(f)
        if 0 <= question_id < len(questions):
            questions[question_id] = updated_question
            f.seek(0)
            f.truncate()
            json.dump(questions, f, indent=4)
            return {"message": "Question updated successfully", "question": updated_question}
        else:
            return {"error": "Question not found"}, 404
        

