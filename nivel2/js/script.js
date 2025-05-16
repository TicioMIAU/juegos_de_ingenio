
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
let level = 2;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "¿Qué palabra empieza con 'E', termina con 'E' y solo tiene una letra?",
    answers: [
      { text: "Sobre", correct: false },
      { text: "Envelope (sobre en inglés)", correct: true },
      { text: "Elefante", correct: false },
      { text: "Espejo", correct: false }
    ]
  },
  {
    question: "¿Qué palabra contiene todas las letras del abecedario?",
    answers: [
      { text: "Abecedario", correct: false },
      { text: "Alfabeto", correct: false },
      { text: "Diccionario", correct: false },
      { text: "El pangrama", correct: true }
    ]
  },
  {
    question: "¿Qué es lo que tiene cuatro patas por la mañana, dos patas al mediodía y tres patas por la noche?",
    answers: [
      { text: "Un perro", correct: false },
      { text: "El hombre", correct: true },
      { text: "Una silla", correct: false },
      { text: "Un gato", correct: false }
    ]
  },
  {
    question: "Trabalenguas: ¿Cómo se llama la serpiente que no muerde?",
    answers: [
      { text: "Serpiente mansa", correct: false },
      { text: "La lengua", correct: true },
      { text: "La cascabel", correct: false },
      { text: "La boa", correct: false }
    ]
  },
  {
    question: "¿Qué palabra se lee igual al derecho y al revés?",
    answers: [
      { text: "raton", correct: false },
      { text: "Casa", correct: false },
      { text: "Perro", correct: false },
      { text: "Anana", correct: true }
    ]
  },
  {
    question: "¿Qué es una casa que tiene muchas ventanas y nunca se puede entrar?",
    answers: [
      { text: "Una computadora", correct: true },
      { text: "Un castillo", correct: false },
      { text: "Un edificio", correct: false },
      { text: "Una cueva", correct: false }
    ]
  },
  {
    question: "¿Qué se puede atrapar pero no lanzar?",
    answers: [
      { text: "Una pelota", correct: false },
      { text: "Un resfriado", correct: true },
      { text: "Un pez", correct: false },
      { text: "Una sombra", correct: false }
    ]
  },
  {
    question: "¿Cuál es el colmo de un jardinero?",
    answers: [
      { text: "Que no sepa regar", correct: false },
      { text: "Que no tenga jardín", correct: false },
      { text: "Que le gusten las flores", correct: false },
      { text: "Que le dé miedo las plantas", correct: true }
    ]
  },
  {
    question: "¿Qué tiene cabeza y no es animal, tiene boca y no habla?",
    answers: [
      { text: "la serpiente", correct: false },
      { text: "El hombre", correct: false },
      { text: "El rio", correct: true },
      { text: "La almohada", correct: false }
    ]
  },
  {
    question: "¿Qué palabra tiene 5 letras, pero se pronuncia con solo una?",
    answers: [
      { text: "Correo", correct: false },
      { text: "Ojo", correct: false },
      { text: "Agua", correct: false },
      { text: "Ajedrez", correct: true }
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
  window.location.href = '../index.html'; // Ajusta según la ubicación del menú
});

startQuiz();
