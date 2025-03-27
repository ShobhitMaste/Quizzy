
const storedData = localStorage.getItem("storage");

if (storedData) {
    const parsedData = JSON.parse(storedData);
    storage = new Map(Object.entries(parsedData));
    console.log(storage);
}

window.onload=function(){
    const user = JSON.parse(localStorage.getItem("logged"));
    console.log(user);
    if(user.status == 1){
        const username = user.username;
        document.getElementById("loginbar").classList.add("hide");
        document.getElementById("signupbar").textContent = "Welcome Back, " + username;
        console.log(username);
    }
    document.getElementById("joinform").addEventListener('submit', function(event){
        event.preventDefault();
        let entered_code = document.getElementById("joinid").value;
        let found = false;
        storage.forEach(function(value, key) {
            let code = key.substr(0, 6);
            let time = key.substr(7, key.length - 6);
            if(entered_code === code){
                localStorage.setItem("QuizCode",key);
                console.log(entered_code, time, code);
                found = true;
                window.location.href = "./pages/quiz.html";
            }
        });
        if(!found){
            alert("No quiz Exist with that Code!!");
        }
    });
}

// console.log(document.querySelector("#joinform"));
// localStorage.clear();
