// // VARIABLE DECLARATIONS
var timer;
var time = 60;
var questionIndex = 0;
var score = 0;
var scoreDiv = document.getElementById("scoreDiv");
var initialsEl = document.getElementById("initials");
// var highScoresEl = document.getElementById("high-scores");
var startPageEl = document.getElementById("start-page");
var questionPageEl = document.getElementById("question-page");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var answerBtnsEl = document.getElementById("answer-buttons");
var endPageEl = document.getElementById("end-page");
var submitBtn = document.getElementById("submit");


var startBtnEl = document.querySelector("#start-game");
var timerEl = document.querySelector("#timer");

var questionArray = [{
        question: "1. Commonly used data types DO NOT include",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "2. The condition in an if/else statement is enclosed within ___.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "3. Arrays in JavaScript can be used to store ___",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "4. String values must be enclosed within ___ when being assigned to variables. ",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "5. A very useful tool used during development and debugging for printing content to the debugger is ___.",
        options: ["JavaScript", "terminal/bash", "alerts", "console.log" ],
        answer: "console.log"
    }
]

function startGame() {
    // hide starting page
    startPageEl.setAttribute("class", "hide");

    // show question page
    questionPageEl.setAttribute("class", "show");

    // render first question and keep track of question we're on
    questionEl.innerText = questionArray[0].question;
   
    // creates a button for each option in the question array
    for (var i = 0; i < 4; i++){
        var button = document.createElement("button");
        button.innerText = questionArray[0].options[i];
        button.classList.add("option");
        // if the option at index 0 of the questionArray is equal
        // to the answer, the button will have a value of true.
        if (questionArray[0].options[i] == questionArray[0].answer){
            button.value = true 
        }else{
            button.value = false
        }
        // when the next button is clicked, run the checkAnswer function
        button.addEventListener("click", checkAnswer);

        optionsEl.appendChild(button);
    }

   

    // start timer
    timer = setInterval(tick, 1000);
   
}

function tick(){
    time--;
     // show time
     timerEl.textContent = time;
    
    if (time < 0 || time == 0){
        clearInterval(timer)
        gameOver();
        
    }
}

function nextQuestion(){
    questionIndex++
    questionEl.innerText = questionArray[questionIndex].question;
   
    optionsEl.innerHTML = ""

    for (var i = 0; i < 4; i++){
        var button = document.createElement("button");
        button.innerText = questionArray[questionIndex].options[i];
        button.classList.add("option");
        
        if (questionArray[questionIndex].options[i] == questionArray[questionIndex].answer){
            button.value = true 
        }else{
            button.value = false
        }

        optionsEl.appendChild(button);

        button.addEventListener("click", checkAnswer)
    }
}
// Adding a correct answer to the score, or if it is 
// false, decreasing the time.
function checkAnswer(event){
    console.log(event.target.value);
    if (event.target.value == "true") {
        score++;
        console.log(score);
        scoreDiv.innerText = score;
    }else{
        time -= 5
    }
    
    console.log(event.target);
}

function gameOver(){
    // show question page
    questionPageEl.setAttribute("class", "hide");
    // hide starting page
    endPageEl.setAttribute("class", "show");
    submitBtn.addEventListener("click", highScores);
}

// 

function highScores() {
    // get the user input
  localStorage.setItem('inits', document.getElementById("initials").value);
       

}


// User clicks start button and startGame function is run
startBtnEl.addEventListener("click", startGame);

answerBtnsEl.addEventListener("click", nextQuestion);
