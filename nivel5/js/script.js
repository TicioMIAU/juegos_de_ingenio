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
    question: "Tiene agujas pero no pincha, da la hora pero no habla. ¿Qué es?",
    answers: [
      { text: "Un reloj", correct: true },
      { text: "Una brújula", correct: false },
      { text: "Un mapa", correct: false },
      { text: "Un cactus", correct: false }
    ]
  },
  {
    question: "No tiene boca y grita, no tiene alas y vuela. ¿Qué es?",
    answers: [
      { text: "El eco", correct: false },
      { text: "El viento", correct: true },
      { text: "Una sombra", correct: false },
      { text: "Una canción", correct: false }
    ]
  },
  {
    question: "Cuanto más grande es, menos se ve. ¿Qué es?",
    answers: [
      { text: "La oscuridad", correct: true },
      { text: "El silencio", correct: false },
      { text: "La niebla", correct: false },
      { text: "La sombra", correct: false }
    ]
  },
  {
    question: "Va por el agua y no se moja, va por el fuego y no se quema. ¿Qué es?",
    answers: [
      { text: "El pensamiento", correct: false },
      { text: "La voz", correct: false },
      { text: "La luz", correct: true },
      { text: "El alma", correct: false }
    ]
  },
  {
    question: "Sube, sube y nunca baja. ¿Qué es?",
    answers: [
      { text: "El humo", correct: false },
      { text: "La marea", correct: false },
      { text: "La edad", correct: true },
      { text: "El precio", correct: false }
    ]
  },
  {
    question: "Mientras más le quitas, más grande se vuelve. ¿Qué es?",
    answers: [
      { text: "Un agujero", correct: true },
      { text: "Una deuda", correct: false },
      { text: "El silencio", correct: false },
      { text: "La distancia", correct: false }
    ]
  },
  {
    question: "Tiene ojos pero no ve, tiene agua pero no bebe. ¿Qué es?",
    answers: [
      { text: "Una aguja", correct: false },
      { text: "Una tormenta", correct: false },
      { text: "Una papa", correct: false },
      { text: "Una patata", correct: true }
    ]
  },
  {
    question: "Ladran, no son perros; vuelan, no son aves. ¿Qué son?",
    answers: [
      { text: "Los aviones", correct: false },
      { text: "Los murciélagos", correct: false },
      { text: "Los cohetes", correct: false },
      { text: "Los hombres", correct: true }
    ]
  },
  {
    question: "Si me nombras, desaparezco. ¿Qué soy?",
    answers: [
      { text: "Un secreto", correct: false },
      { text: "El eco", correct: false },
      { text: "El silencio", correct: true },
      { text: "Un fantasma", correct: false }
    ]
  },
  {
    question: "Todos pasan por mí, yo no paso por nadie. ¿Qué soy?",
    answers: [
      { text: "La puerta", correct: false },
      { text: "La calle", correct: true },
      { text: "El reloj", correct: false },
      { text: "La casa", correct: false }
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
