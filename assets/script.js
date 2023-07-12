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
}];

// quiz query/element selectors
var startGameBtn = document.getElementById("#start-button")
var quizBox = document.querySelector("#quiz-box")
var quizQuestion = document.querySelector("#question-header")
var userAnswer = document.querySelector("#user-answer")
var submitBtn = document.querySelector("#submit-answer")

// save game query selectors
var quizOverBox = document.querySelector("#quiz-over-box")
var initialLabel = document.querySelector("#initialsLabel")
var saveQuizBtn = document.querySelector("#save-quiz")

// button event listeners
startGameBtn.addEventListener("click", quizStart);
submitBtn.addEventListener("click", userAnswer);
saveQuizBtn.addEventListener("click", save-quiz);




// start quiz function
function startQuiz() {
displayQuestion();
startTime();
}

function displayQuestion() { 
    let currentQuestion = questions[currentQuestionuestionIndex];
    questionEl.textContent = currentQuestion.question;
}


function answerQuestion() {
    let currentQuestion = questions[currentQuestionIndex]
    let userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === currentQ.answer.toLowerCase()) {
        currentQuestionIndex++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        time -= 30;
    }
    answerInput.value = ""
}

function endQuiz() {
    clearInterval(timerId);
}

function startTimer(){
    timerId = setInterval(remainingTime, 300);
}

function remainingTime() {
    time--;
    if (time <= 0) {
        endQuiz();
    }
}