const storedData = localStorage.getItem("storage");
let storage = storedData ? new Map(Object.entries(JSON.parse(storedData))) : new Map();

const x = localStorage.getItem("QuizCode");
const entered_code = x.substr(0, 6);
const time = x.substr(7, x.length - 6);
console.log(entered_code, time, x);
let quizData = storage.get(`${entered_code} ${time}`);

if (!quizData || quizData.length <= 1) {
    alert(`Quiz not found or empty!`);
} else {
    let currentQuestionIndex = 1;
    let totalQuestions = quizData.length - 1;
    let score = 0;
    let selectedAnswer = null;

    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-btn");
    const quizContainer = document.getElementById("quiz-container");
    const questionNumber = document.getElementById("question-number");
    const startButton = document.getElementById("start-btn");
    const quizContent = document.getElementById("quiz-content");
    const scoreContainer = document.getElementById("score-container");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");

    let timeLeft = parseInt(time);
    let timerInterval;

    startButton.addEventListener("click", () => {
        startButton.parentElement.classList.add("hidden");
        quizContent.classList.remove("hidden");
        timerElement.style.display = "block";

        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();

        loadQuestion();
    });

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            showQuizCompleted();
        }
    }

    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            showQuizCompleted();
            return;
        }

        let currentQuestion = quizData[currentQuestionIndex];
        questionNumber.innerText = `Question ${currentQuestionIndex} of ${totalQuestions}`;
        questionContainer.innerText = currentQuestion[0];
        optionsContainer.innerHTML = "";
        selectedAnswer = null;

        for (let i = 1; i <= 4; i++) {
            const li = document.createElement("li");
            li.innerText = currentQuestion[i];
            li.dataset.option = String.fromCharCode(64 + i);
            li.addEventListener("click", () => selectOption(li));
            optionsContainer.appendChild(li);
        }

        nextButton.classList.add("hidden");
    }

    function selectOption(selectedOption) {
        document.querySelectorAll(".options li").forEach(option => option.classList.remove("selected"));
        selectedOption.classList.add("selected");
        selectedAnswer = selectedOption.dataset.option;
        nextButton.classList.remove("hidden");
    }

    nextButton.addEventListener("click", () => {
        if (!selectedAnswer) return;

        let correctAnswer = quizData[currentQuestionIndex][5];
        if (selectedAnswer === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;
        loadQuestion();
    });

    function showQuizCompleted() {
        clearInterval(timerInterval);
        quizContent.classList.add("hidden");
        scoreContainer.classList.remove("hidden");
        scoreElement.innerText = `${score} / ${totalQuestions}`;
    }
}
