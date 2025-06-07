from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str
    choices: List[str]
    answer: str

questions: List[Question] = [
    Question(
        question="What is the capital of France?",
        choices=["London", "Berlin", "Paris", "Rome"],
        answer="Paris"
    ),
    Question(
        question="Which language is used for web apps?",
        choices=["Python", "JavaScript", "HTML", "All of the above"],
        answer="All of the above"
    ),
    Question(
        question="What does CSS stand for?",
        choices=["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Syntax"],
        answer="Cascading Style Sheets"
    ),
    Question(
        question="Which company developed Python?",
        choices=["Google", "Microsoft", "Python Software Foundation", "Netscape"],
        answer="Python Software Foundation"
    ),
]

@app.get("/questions", response_model=List[Question])
def get_questions():
    return questions

@app.get("/questions/{question_id}", response_model=Question)
def get_question(question_id: int):
    if 0 <= question_id < len(questions):
        return questions[question_id]
    raise HTTPException(status_code=404, detail="Question not found")

@app.post("/questions", response_model=Question)
def add_question(question: Question):
    questions.append(question)
    return question

@app.put("/questions/{question_id}", response_model=Question)
def update_question(question_id: int, updated_question: Question):
    if 0 <= question_id < len(questions):
        questions[question_id] = updated_question
        return updated_question
    raise HTTPException(status_code=404, detail="Question not found")

@app.delete("/questions/{question_id}")
def delete_question(question_id: int):
    if 0 <= question_id < len(questions):
        deleted = questions.pop(question_id)
        return {"message": "Question deleted successfully", "question": deleted}
    raise HTTPException(status_code=404, detail="Question not found")

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
