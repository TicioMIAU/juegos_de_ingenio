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
    question: "Si alguien dice 'yo siempre miento', ¿está diciendo la verdad o mintiendo?",
    answers: [
      { text: "Está mintiendo", correct: false },
      { text: "Está diciendo la verdad", correct: false },
      { text: "Es una paradoja", correct: true },
      { text: "No se puede saber", correct: false }
    ]
  },
  {
    question: "¿Qué sucede cuando una fuerza irresistible choca con un objeto inamovible?",
    answers: [
      { text: "El objeto se mueve", correct: false },
      { text: "La fuerza se detiene", correct: false },
      { text: "Nada, es imposible", correct: false },
      { text: "Es una contradicción lógica", correct: true }
    ]
  },
  {
    question: "¿Puedo decir con sinceridad que esta frase es falsa?",
    answers: [
      { text: "Sí", correct: false },
      { text: "No", correct: false },
      { text: "Solo si es verdadera", correct: false },
      { text: "Es autorrefutante", correct: true }
    ]
  },
  {
    question: "Si retrocedes en el tiempo y evitas tu propio nacimiento, ¿podrías haberlo hecho?",
    answers: [
      { text: "Sí, si el viaje fue exitoso", correct: false },
      { text: "No, porque no nacerías", correct: false },
      { text: "Depende del multiverso", correct: false },
      { text: "No, es una paradoja temporal", correct: true }
    ]
  },
  {
    question: "Un hotel con infinitas habitaciones está lleno. Llega un nuevo huésped. ¿Puede quedarse?",
    answers: [
      { text: "Sí, moviendo a todos una habitación adelante", correct: true },
      { text: "No, porque está lleno", correct: false },
      { text: "Solo si alguien se va", correct: false },
      { text: "Sí, pero solo si tiene reserva", correct: false }
    ]
  },
  {
    question: "¿Qué pasa si borras esta pregunta de la realidad?",
    answers: [
      { text: "Nunca fue escrita", correct: false },
      { text: "Ya no se puede responder", correct: false },
      { text: "Dejaría de existir retroactivamente", correct: false },
      { text: "Es una paradoja causal", correct: true }
    ]
  },
  {
    question: "¿Puedes predecir con certeza algo que depende del azar?",
    answers: [
      { text: "Sí, si tienes suerte", correct: false },
      { text: "No, porque sería un error", correct: false },
      { text: "Solo a veces", correct: false },
      { text: "No, eso contradice el azar", correct: true }
    ]
  },
  {
    question: "Un barbero afeita a todos los que no se afeitan a sí mismos. ¿Quién afeita al barbero?",
    answers: [
      { text: "Él mismo", correct: false },
      { text: "Otro barbero", correct: false },
      { text: "Nadie", correct: false },
      { text: "Es una paradoja lógica", correct: true }
    ]
  },
  {
    question: "Si el presente determina el futuro, pero el futuro cambia el pasado, ¿qué es real?",
    answers: [
      { text: "El presente", correct: false },
      { text: "El pasado", correct: false },
      { text: "El futuro", correct: false },
      { text: "Es un bucle paradójico", correct: true }
    ]
  },
  {
    question: "¿Qué ocurre si una afirmación es verdadera solo si es falsa?",
    answers: [
      { text: "Es verdadera", correct: false },
      { text: "Es falsa", correct: false },
      { text: "No tiene valor lógico", correct: true },
      { text: "Es verdadera y falsa", correct: false }
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
