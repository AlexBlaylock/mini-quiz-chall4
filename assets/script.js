// questions i created.
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
    q: "What is HyperText Markup Language?",
    a: "1. HTML",
    b: "2. HOTMAIL",
    c: "3. HML",
    d: "4. HTMKLG",
    correct: "1. HTML",
}];
// global variables, getelementbyid is more specific then query selectors.
var startGameBtn = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeRemaining = 120;
var quizLength;
var questionBox = document.querySelector("#quiz-box");

function timer() {
     // switched to template literal from a normal string + string
    timerEl.textContent = `Time remaining: ${timeRemaining}s`;
    quizLength = setInterval(function () {
        if (timeRemaining > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000); //set interval will update every 1000ms
}
// function to tick time down
function adjustTime(amount) {
    timeRemaining += amount;
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    // switched to template literal from a normal string + string
    timerEl.textContent = `Time remaining: ${timeRemaining}s`;
}

// variables for questions and score
var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

// function for clicking on answers, if wrong -30s, if right no time is lost.
var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // determine if answer is wrong or right
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-30);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    // correct answer statement
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};


startGameBtn.onclick = timer;
// questions + answer options
var renderQuestion = function (question) {
    questionBox.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

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

    questionBox.appendChild(questionHeader);
    questionBox.appendChild(answerA);
    questionBox.appendChild(answerB);
    questionBox.appendChild(answerC);
    questionBox.appendChild(answerD);
}


// begins quiz
var quiz = function (event) {
    event.preventDefault();
    resetQuiz();
    renderQuestion(questions[currentQuestionIndex]);
};
// brings back to start quiz page
function resetQuiz() {
    questionBox.innerHTML="";
    document.querySelector("#intro-page").style.display = "none";
}

// local storage function
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionBox.innerHTML = "";
    // switched to template literal from a normal string + string
    questionBox.innerHTML = `${name} ${score}`;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

var initials; 
function endQuizPage() {
    resetQuiz();
    timerEl.textContent = "";
    clearInterval(quizLength);
    // creat eleemnts to dynamically create buttons and input boxes.
    var endPage = document.createElement("h2");
    questionBox.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = `Congratulations on completing the quiz, your score was: ${userScore}!`;

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        // rest variable
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

startGameBtn.addEventListener('click', quiz);