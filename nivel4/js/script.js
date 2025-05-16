const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const feedbackDisplay = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const menuButton = document.getElementById('menu-button');
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let level = 4;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "¿Cuál es el resultado de sumar 111, 222 y 333 rápidamente?",
    answers: [
      { text: "555", correct: false },
      { text: "666", correct: true },
      { text: "444", correct: false },
      { text: "777", correct: false }
    ]
  },
  {
    question: "Si tienes 3 manzanas y das 2, ¿cuántas te quedan?",
    answers: [
      { text: "2", correct: false },
      { text: "0", correct: false },
      { text: "1", correct: true },
      { text: "3", correct: false }
    ]
  },
  {
    question: "¿Qué número falta? 2, 4, 8, 16, __, 64",
    answers: [
      { text: "48", correct: false },
      { text: "30", correct: false },
      { text: "24", correct: false },
      { text: "32", correct: true }
    ]
  },
  {
    question: "Multiplica 25 x 4 rápidamente.",
    answers: [
      { text: "110", correct: false },
      { text: "80", correct: false },
      { text: "100", correct: true },
      { text: "90", correct: false }
    ]
  },
  {
    question: "Si 5x = 20, ¿cuánto vale x?",
    answers: [
      { text: "5", correct: false },
      { text: "3", correct: false },
      { text: "2", correct: false },
      { text: "4", correct: true }
    ]
  },
  {
    question: "¿Cuál es la mitad de 1/2?",
    answers: [
      { text: "1/2", correct: false },
      { text: "2", correct: false },
      { text: "1", correct: false },
      { text: "1/4", correct: true }
    ]
  },
  {
    question: "¿Qué número multiplicado por sí mismo da 49?",
    answers: [
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "9", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "¿Cuánto es 10% de 200?",
    answers: [
      { text: "20", correct: true },
      { text: "30", correct: false },
      { text: "25", correct: false },
      { text: "10", correct: false }
    ]
  },
  {
    question: "Si un triángulo tiene dos ángulos de 45°, ¿cuánto mide el tercero?",
    answers: [
      { text: "45°", correct: false },
      { text: "90°", correct: true },
      { text: "30°", correct: false },
      { text: "60°", correct: false }
    ]
  },
  {
    question: "¿Cuál es el resultado de 9 x 9 - 9?",
    answers: [
      { text: "81", correct: false },
      { text: "72", correct: true },
      { text: "63", correct: false },
      { text: "90", correct: false }
    ]
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 20;
  updateScoreDisplay();
  updateLevelDisplay();
  updateTimerDisplay();
  nextButton.classList.add('hidden');
  feedbackDisplay.classList.add('hidden');
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetAnswerButtons();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetAnswerButtons() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  feedbackDisplay.classList.add('hidden');
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    if (button === selectedButton && !isCorrect) {
      button.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score += 10;
    feedbackDisplay.textContent = "¡Correcto!";
  } else {
    feedbackDisplay.textContent = "Incorrecto.";
  }

  feedbackDisplay.classList.remove('hidden');
  updateScoreDisplay();

  nextButton.classList.remove('hidden');
  stopTimer();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    feedbackDisplay.classList.add('hidden');
    nextButton.classList.add('hidden');
    startTimer();
  } else {
    questionText.textContent = `¡Juego Terminado! Puntuación final: ${score}`;
    answerButtons.innerHTML = '';
    feedbackDisplay.classList.add('hidden');
    nextButton.classList.add('hidden');
    timerDisplay.textContent = '0';
  }
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

function updateLevelDisplay() {
  levelDisplay.textContent = level;
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
}

function startTimer() {
  timeLeft = 20;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackDisplay.textContent = "¡Se acabó el tiempo!";
      feedbackDisplay.classList.remove('hidden');
      disableAnswers();
      nextButton.classList.remove('hidden');
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
  });
}

nextButton.addEventListener('click', nextQuestion);

menuButton.addEventListener('click', () => {
  window.location.href = '../index.html'; // Ajusta la ruta según tu estructura
});

startQuiz();
