let question, optionA, optionB, optionC, optionD, answer, time;
let count = 0;
storage = new Map();
questions = [[]];
let current_Question_Number = 0;

document.getElementById("saveQuiz").addEventListener('click', () => {
    if(count == 0){
        alert("cannot submit a quiz with zero questions.");
        return;
    }
    let quiz_code = generate_quiz_code();
    document.querySelector("#quizID").innerHTML = `Your QUIZZY is Made<br> Code For Quiz is <b>${quiz_code}<b>`;
    storage.set(quiz_code + " " + time, questions);
    let storedData = JSON.parse(localStorage.getItem("storage")) || {};

    storedData[quiz_code + " " + time] = questions;  

    localStorage.setItem("storage", JSON.stringify(storedData));
    console.log(questions);
});

document.getElementById("quizform").addEventListener('submit', function (event) {
    event.preventDefault();
    count++;
    console.log(question, optionA, optionB, optionC, optionD, answer);
    let newQuestion = [question, optionA, optionB, optionC, optionD, answer];
    questions.push(newQuestion);
    document.querySelector("#question_confirm").innerHTML = `Question Added Successfully <br> Total Questions are ${count}`;
    time = document.querySelector("#time").value;
    clearAll();
});

function preview(){
    question = document.getElementById("question").value;
    optionA = document.getElementById("A").value;
    optionB = document.getElementById("B").value;
    optionC = document.getElementById("C").value;
    optionD = document.getElementById("D").value;
    answer = document.getElementById("answer").value;
    document.getElementById("preview_question").textContent = "Q) " + question;
    document.getElementById("PA").textContent = "A) " + optionA;
    document.getElementById("PB").textContent = "B) " + optionB;
    document.getElementById("PC").textContent = "C) " + optionC;
    document.getElementById("PD").textContent = "D) " + optionD;
}

function clearAll(){
    document.getElementById("question").value = "";
    document.getElementById("A").value = "";
    document.getElementById("B").value = "";
    document.getElementById("C").value = "";
    document.getElementById("D").value = "";
    document.getElementById("answer").value = "A";
    document.getElementById("preview_question").textContent = "";
    document.getElementById("PA").textContent = "";
    document.getElementById("PB").textContent = "";
    document.getElementById("PC").textContent = "";
    document.getElementById("PD").textContent = "";
}

function generate_quiz_code(){
    let d1 = Math.floor(Math.random() * 10);
    let d2 = Math.floor(Math.random() * 10);
    let d3 = Math.floor(Math.random() * 10);
    let d4 = Math.floor(Math.random() * 10);
    let d5 = Math.floor(Math.random() * 10);
    let code = "#" + d1.toString() + d2.toString() + d3.toString() + d4.toString() + d5.toString();
    return code;
}