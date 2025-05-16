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
let level = 3;
let timeLeft = 20;
let timerInterval = null;

const questions = [
  {
    question: "¿Qué pasa si pones un gato en un horno y otro en la nevera?",
    answers: [
      { text: "Uno es caliente y otro frío", correct: true },
      { text: "Nada pasa", correct: false },
      { text: "Se convierten en ratones", correct: false },
      { text: "Los dos se escapan", correct: false }
    ]
  },
  {
    question: "¿Qué se moja mientras más seca?",
    answers: [
      { text: "El mar", correct: false },
      { text: "La toalla", correct: true },
      { text: "El sol", correct: false },
      { text: "El viento", correct: false }
    ]
  },
  {
    question: "¿Qué tiene dientes pero no muerde?",
    answers: [
      { text: "Un gato", correct: false },
      { text: "Un tiburón", correct: false },
      { text: "Un peine", correct: true },
      { text: "Un lobo", correct: false }
    ]
  },
  {
    question: "¿Qué se rompe al decir su nombre?",
    answers: [
      { text: "Un secreto", correct: false },
      { text: "El silencio", correct: true },
      { text: "Un vidrio", correct: false },
      { text: "Un huevo", correct: false }
    ]
  },
  {
    question: "¿Qué es lo que nunca vuelve pero siempre llega?",
    answers: [
      { text: "La sombra", correct: false },
      { text: "El tiempo", correct: false },
      { text: "El futuro", correct: false },
      { text: "El ayer", correct: true }
    ]
  },
  {
    question: "¿Qué se puede agarrar pero no se puede lanzar?",
    answers: [
      { text: "Una sombra", correct: false },
      { text: "Una pelota", correct: false },
      { text: "Un pez", correct: false },
      { text: "Un resfriado", correct: true }
    ]
  },
  {
    question: "¿Qué corre pero nunca camina, tiene boca pero no habla?",
    answers: [
      { text: "El viento", correct: false },
      { text: "El río", correct: true },
      { text: "El sol", correct: false },
      { text: "La nube", correct: false }
    ]
  },
  {
    question: "¿Qué sube y baja sin moverse?",
    answers: [
      { text: "La marea", correct: false },
      { text: "Una montaña rusa", correct: false },
      { text: "La temperatura", correct: true },
      { text: "Un ascensor", correct: false }
    ]
  },
  {
    question: "¿Qué tiene cabeza y cola pero no cuerpo?",
    answers: [
      { text: "Una moneda", correct: true },
      { text: "Una lámpara", correct: false },
      { text: "Un pez", correct: false },
      { text: "Una serpiente", correct: false }
    ]
  },
  {
    question: "¿Qué palabra es incorrecta en el diccionario?",
    answers: [
      { text: "Error", correct: false },
      { text: "Diccionario", correct: false },
      { text: "Palabra", correct: false },
      { text: "Incorrecta", correct: true }
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
  window.location.href = '../index.html'; // Ajusta la ruta si es necesario
});

startQuiz();
