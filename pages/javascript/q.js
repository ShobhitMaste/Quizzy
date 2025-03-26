const storedData = localStorage.getItem("storage");
let storage = storedData ? new Map(Object.entries(JSON.parse(storedData))) : new Map();

const x = localStorage.getItem("QuizCode");
const entered_code = x.substr(0, 6);
const time = x.substr(7, x.length - 6);
console.log(entered_code, time, x);
let quizData = storage.get(`${entered_code} ${time}`);

if (!quizData) {
    alert(`Quiz not found!`);
} else {
    let currentQuestionIndex = 0;
    let totalQuestions = quizData.length;
    
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-btn");
    const quizContainer = document.getElementById("quiz-container");

    function loadQuestion() {
        let currentQuestion = quizData[currentQuestionIndex + 1];

        if (!currentQuestion) {
            showQuizCompleted();
            return;
        }

        questionContainer.innerText = currentQuestion[0];
        optionsContainer.innerHTML = "";

        for (let i = 1; i <= 4; i++) {
            const li = document.createElement("li");
            li.innerText = currentQuestion[i];
            li.addEventListener("click", () => selectOption(li));
            optionsContainer.appendChild(li);
        }
    }

    function selectOption(selectedOption) {
        document.querySelectorAll(".options li").forEach(option => option.classList.remove("selected"));
        selectedOption.classList.add("selected");
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    function showQuizCompleted() {
        quizContainer.innerHTML = "<h2>Quiz Completed!</h2>";
    }

    let timeLeft = parseInt(time);
    const timerElement = document.getElementById("timer");

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

    let timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    loadQuestion();
}