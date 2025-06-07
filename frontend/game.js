// Modal logic
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Navigation logic
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

// Add question form logic (example)
document.getElementById('add-question-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('add-question-message').textContent = "Question submitted! (API integration needed)";
  this.reset();
});

// Fetch questions logic
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch("http://127.0.0.1:8000/questions");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    questions = await response.json();
    console.log("Loaded questions:", questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
}

// Call fetchQuestions before game starts
document.addEventListener("DOMContentLoaded", async () => {
  await fetchQuestions();
});
