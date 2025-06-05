const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const playerHealthBar = document.getElementById("player-health");
const enemyHealthBar = document.getElementById("enemy-health");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");

let score = 0;
let timer = 15;
let interval;
let currentQuestion = 0;
let playerHealth = 100;
let enemyHealth = 100;

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Rome", "Berlin"],
    correct: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Venus", "Mars", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "What is 5 + 7?",
    answers: ["10", "12", "13", "11"],
    correct: "12"
  }
];

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => location.reload());

function startGame() {
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.correct) {
    enemyHealth -= 30;
    score += 10;
  } else {
    playerHealth -= 20;
  }
  updateStats();
  currentQuestion++;
  if (currentQuestion < questions.length && playerHealth > 0 && enemyHealth > 0) {
    loadQuestion();
    resetTimer();
  } else {
    endGame();
  }
}

function updateStats() {
  playerHealthBar.style.width = `${Math.max(playerHealth, 0)}%`;
  enemyHealthBar.style.width = `${Math.max(enemyHealth, 0)}%`;
  scoreEl.textContent = `Score: ${score}`;
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    timerEl.textContent = `⏱ ${timer}`;
    if (timer <= 0) {
      playerHealth -= 25;
      updateStats();
      currentQuestion++;
      if (currentQuestion < questions.length && playerHealth > 0 && enemyHealth > 0) {
        loadQuestion();
        resetTimer();
      } else {
        endGame();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  timer = 15;
  startTimer();
}

function endGame() {
  clearInterval(interval);
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  resultEl.textContent = playerHealth > 0 && enemyHealth <= 0 ? "🎉 You Win!" : "💀 Game Over";
  finalScoreEl.textContent = `Final Score: ${score}`;
}
