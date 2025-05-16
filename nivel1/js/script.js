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
let level = 1;
let timeLeft = 20; // segundos
let timerInterval = null;

const questions = [
  {
    question: "Si tres gatos matan tres ratones en tres minutos, ¿cuántos gatos se necesitan para matar 100 ratones en 100 minutos?",
    answers: [
      { text: "100", correct: false },
      { text: "1", correct: false },
      { text: "3", correct: false },
      { text: "10", correct: true }
    ]
  },
  {
    question: "¿Qué pesa más, un kilo de plumas o un kilo de plomo?",
    answers: [
      { text: "Plumas", correct: false },
      { text: "Plomo", correct: false },
      { text: "Pesan igual", correct: true },
      { text: "Ninguno", correct: false }
    ]
  },
  {
    question: "¿Cuántos segundos hay en un año?",
    answers: [
      { text: "12", correct: true },
      { text: "31536000", correct: false },
      { text: "86400", correct: false },
      { text: "365", correct: false }
    ]
  },
  {
    question: "¿Qué palabra se escribe incorrectamente en todos los diccionarios?",
    answers: [
      { text: "Palabra", correct: false },
      { text: "Diccionario", correct: false },
      { text: "Correctamente", correct: true },
      { text: "Incorrectamente", correct: false }
    ]
  },
  {
    question: "Si un avión se estrella justo en la frontera entre dos países, ¿dónde entierran a los sobrevivientes?",
    answers: [
      { text: "En el país del avión", correct: false },
      { text: "En el país donde ocurrió", correct: false },
      { text: "No se entierran porque sobrevivieron", correct: true },
      { text: "En ambos países", correct: false }
    ]
  },
  {
    question: "¿Cuál es el siguiente número en la secuencia: 2, 4, 8, 16, ...?",
    answers: [
      { text: "18", correct: false },
      { text: "32", correct: true },
      { text: "24", correct: false },
      { text: "20", correct: false }
    ]
  },
  {
    question: "¿Qué se rompe sin tocarlo?",
    answers: [
      { text: "Un milagro", correct: false },
      { text: "Un secreto", correct: true },
      { text: "Una promesa", correct: false },
      { text: "Un huevo", correct: false }
    ]
  },
  {
    question: "¿Qué tiene manos pero no puede aplaudir?",
    answers: [
      { text: "Un maniqui", correct: false },
      { text: "Un payaso", correct: false },
      { text: "Un relog", correct: true },
      { text: "Un fantasma", correct: false }
    ]
  },
  {
    question: "¿En qué mes la gente duerme menos?",
    answers: [
      { text: "Abril", correct: false },
      { text: "Enero", correct: false },
      { text: "Marzo", correct: false },
      { text: "Febrero", correct: true }
    ]
  },
  {
    question: "¿Qué palabra es incorrecta siempre que la dices?",
    answers: [
      { text: "Error", correct: false },
      { text: "Incorrecta", correct: true },
      { text: "Falso", correct: false },
      { text: "Mentira", correct: false }
    ]
  }
];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  level = 1;
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
  window.location.href = '../index.html'; // Ajusta la ruta según la ubicación de tu menú
});

startQuiz();
