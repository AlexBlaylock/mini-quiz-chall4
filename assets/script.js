// quiz query selectors
var startGameBtn = document.querySelector("#start-button")
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


// Questions Array

const questions = [
    {
        question: "What does CSS stand for?"
    }
]

// start quiz function
function startQuiz() {
displayQuestion();
startTime();
}

function displayQuestion() { 
    let currentQ = questions[currentQuestionIndex];
    questionEl.textContent = currentQ.question;
}


function answerQuestion() {
    let currentQ = questions[currentQIndex]
    let userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === currentQ.answer.toLowerCase()) {
        currentQuestionIndex++;
        if (currentQ < questions.length) {
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