// questions
const questions = [{
    q: "When was JavaScript created?",
    a: "1. 1995",
    b: "2. 2002",
    c: "3. 1974",
    d: "4. 1877",
    correct: "1. 1995",
},
{
    q: "What of the following is a boolean object?",
    a: "1. Numbers",
    b: "2. True",
    c: "3. A string",
    d: "4. An array",
    correct: "2. True",
},
{
    q: "What does CSS stand for?",
    a: "1. Commonly Stringed Styles",
    b: "2. Constant Style Suits",
    c: "3. Cascading Style Suits",
    d: "4. Cascading Style Sheets",
    correct: "4. Cascading Style Sheets",
},
{
    q: "How do you make a template literal?",
    a: "1. Backticks",
    b: "2. Quotes",
    c: "3. Parentheses",
    d: "4. Curly Brackets",
    correct: "1. Backticks",
},
{
    // source https://blog.gitnux.com/javascript-statistics/
    q: "JavaScript is used in ___ of all websites",
    a: "1. 74%",
    b: "2. 62%",
    c: "3. 98%",
    d: "4. 100%",
    correct: "3. 98%",
},
{
    
    q: "Github has ___ amount of users?",
    a: "1. 300 million",
    b: "2. 500 thousand",
    c: "3. 100 million",
    d: "4. 30 million",
    correct: "3. 100 million",
},
{
}];
// getelementbyid over query selector due to it being a specific element
var startGameBtn = document.getElementById("start");
var timerEl = document.getElementById("countdown");

var timeRemaining = 180;
var quizLength;
var questionContainer = document.querySelector("#quiz-container");

function timer() {
    // // switched to template literal from a normal string + string
    timerEl.textContent = `Time remaining: ${timeRemaining}s`;
    quizLength = setInterval(function () {
        if (timeRemaining > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000); //1000 here means that setInterval should be executed every 1000ms
}
function adjustTime(amount) {
    timeRemaining += amount;
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    // switched to template literal from a normal string + string
    timerEl.textContent = `Time remaining: ${timeRemaining}s`;
}
// executes timer function
startGameBtn.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";
// quiz question and answers, createElement creates corresponding HTML element.
    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    // creates clickable buttons that correspond with letter choice.
    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var chosenAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // checks answer if it is right or wrong
    var answerDetermination = document.querySelector("#answer-determination");
    if (chosenAnswer !== correctAnswer) {
        adjustTime(-60);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    // Thi
    else if (chosenAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#intro-page").style.display = "none";
}
function highScores() {
    // stores high score on local storage, meaning your score will save.
    let data = localStorage.getItem("object");
    // pulls data
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    // switched to template litral
    questionContainer.innerHTML = `${name} ${score}`;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

var initials; 
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);
    // assigning a blank string to a variable to use for initialbox.
    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";
    // switched to template literal
    endPage.innerHTML = `Congratulations, your score was ${userScore}. Please, enter your initials!`;

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);
    // allows you to store name
    submitInitialBtn.addEventListener("click", () => {
        // makes it to where you need to submit initials
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);
        // resets game back to original page.
        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";
    // submits initials
    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

startGameBtn.addEventListener('click', quiz);


