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
let timer = 15; // 30 seconds for the timer
let interval;
let currentQuestion = 0;
let playerHealth = 100; // Player health starts at 100
let enemyHealth = 100; // Enemy health starts at 100
// Questions array with 30 questions

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
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    correct: "Harper Lee"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correct: "Carbon Dioxide"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Osmium", "Oxygen", "Gold", "Zinc"],
    correct: "Oxygen"
  },
  {
    question: "What language is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "Java"],
    correct: "CSS"
  },
  {
    question: "What year did the first man land on the moon?",
    answers: ["1965", "1969", "1972", "1959"],
    correct: "1969"
  },
  {
    question: "Which video game franchise includes 'Link' and 'Zelda'?",
    answers: ["Final Fantasy", "The Legend of Zelda", "Elder Scrolls", "God of War"],
    correct: "The Legend of Zelda"
  },
  {
    question: "What is the largest mammal on Earth?",
    answers: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    correct: "Blue Whale"
  },
  {
    question: "Which country is home to the Great Barrier Reef?",
    answers: ["Australia", "Brazil", "South Africa", "Mexico"],
    correct: "Australia"
  },
  {
    question: "Which of the following is a prime number?",
    answers: ["9", "12", "17", "21"],
    correct: "17"
  },
  {
    question: "In computer science, what does 'AI' stand for?",
    answers: ["Artificial Intelligence", "Automated Input", "Analog Interface", "Application Integration"],
    correct: "Artificial Intelligence"
  },
  {
    question: "What is the fastest land animal?",
    answers: ["Cheetah", "Leopard", "Lion", "Tiger"],
    correct: "Cheetah"
  },
  {
    question: "Which Marvel superhero is also known as the 'First Avenger'?",
    answers: ["Iron Man", "Captain Marvel", "Captain America", "Hulk"],
    correct: "Captain America"
  },
  {
    question: "What is the main ingredient in hummus?",
    answers: ["Chickpeas", "Lentils", "Beans", "Peas"],
    correct: "Chickpeas"
  },
  {
    question: "Which organ is responsible for pumping blood throughout the body?",
    answers: ["Liver", "Lungs", "Heart", "Kidneys"],
    correct: "Heart"
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Saturn", "Jupiter", "Mars"],
    correct: "Jupiter"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correct: "Leonardo da Vinci"
  },
  {
    question: "What is the boiling point of water at sea level in degrees Celsius?",
    answers: ["90", "100", "110", "120"],
    correct: "100"
  },
  {
    question: "Which country is known for the pyramids?",
    answers: ["Mexico", "Egypt", "Greece", "India"],
    correct: "Egypt"
  },
  {
    question: "What is the main ingredient in sushi?",
    answers: ["Rice", "Noodles", "Bread", "Potatoes"],
    correct: "Rice"
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "CO2", "O2", "NaCl"],
    correct: "H2O"
  },
  {
    question: "Which planet is known for its rings?",
    answers: ["Earth", "Mars", "Saturn", "Venus"],
    correct: "Saturn"
  },
  {
    question: "What is the largest continent by area?",
    answers: ["Africa", "Asia", "North America", "South America"],
    correct: "Asia"
  },
  {
    question: "Who discovered penicillin?",
    answers: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Albert Einstein"],
    correct: "Alexander Fleming"
  },
  {
    question: "What is the main ingredient in guacamole?",
    answers: ["Tomato", "Avocado", "Pepper", "Onion"],
    correct: "Avocado"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["China", "Japan", "South Korea", "Thailand"],
    correct: "Japan"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: ["Gold", "Diamond", "Iron", "Platinum"],
    correct: "Diamond"
  }
];

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", resetToStart);

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
    enemyHealth -= 10;
    score += 10;
  } else {
    playerHealth -= 10;
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

function resetToStart() {
  // Hide end screen, show start screen
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
  // Reset all game state variables
  score = 0;
  timer = 15;
  currentQuestion = 0;
  playerHealth = 100;
  enemyHealth = 100;
  // Reset UI elements
  playerHealthBar.style.width = "100%";
  enemyHealthBar.style.width = "100%";
  scoreEl.textContent = "Score: 0";
  resultEl.textContent = "";
  finalScoreEl.textContent = "";
  // Reset question and answers
  timerEl.textContent = "⏱ 15";
  questionEl.textContent = "";
  answersEl.innerHTML = "";
}

