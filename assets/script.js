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
  
    let currentQuestionIndex = 0;
    let score = 0;
    let time = 60; 

    const timePenalty = 6; // lose 6 seconds when you get the answer wrong
  
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const timerElement = document.getElementById("timer");
    const highScoresBtn = document.getElementById("high-scores-btn")

    function startQuiz() {
        startBtn.style.display = "none";
        highScoresBtn.style.display = "none";
          displayQuestion();
          const timerInterval = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
                } else {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }
      
        function updateTimerDisplay() {
          timerElement.textContent = `Time: ${time} s`;
        }
  
    function displayQuestion() {
      if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.q;
        choicesElement.innerHTML = "";
  
        for (let option of ["a", "b", "c", "d"]) {
            const choiceBtn = document.createElement("button");
            choiceBtn.textContent = question[option];
            choiceBtn.addEventListener("click", () => checkAnswer(question[option], question.correct));
            choicesElement.appendChild(choiceBtn);
        }
      } else {
        endGame();
      }
    }
  
    // if choice is correct, add to score, if wrong, remove time 
    function checkAnswer(choice, correct) {
        const feedback = document.getElementById("answer-feedback")
    
        if (choice === correct) {
            score++;
            feedback.textContent = "Correct"
          } else {
            time -= timePenalty;
            if (time < 0) time = 0;
            feedback.textContent = "Incorrect"
        }

        feedback.style.display = "block";

        setTimeout(() => { 
            feedback.style.display = "none";
            feedback.textContent = " ";
        }, 1500);
        
      currentQuestionIndex++;
      displayQuestion();
    }
  
    function saveScore(initials) {
      const scoreData = {
        initials: initials,
        score: score,
        };
  
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(scoreData);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
  
        displayHighScores(highScores);
    }
    
    // function displays high scores when you press on the view high scores button
    function displayHighScores(highScores) {
        const highScoresListElement = document.getElementById("high-scores-list");
        highScoresListElement.innerHTML = "";
  
        highScores.forEach((scoreData, index) => {
            const scoreItemElement = document.createElement("li");
            scoreItemElement.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
            highScoresListElement.appendChild(scoreItemElement);
      });
    }
  
    document.getElementById("high-scores-btn").addEventListener("click", function () {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        displayHighScores(highScores);
    });

    
    // displays final score, lets you input and save it
    function endGame() {
        // hides timer on end game
        timerElement.style.display = "none";
        // tells you what score you got
        questionElement.textContent = `Quiz over, you got a ${score}`;
        // hides the choices
        choicesElement.innerHTML = "";
        // lets you input initials
        const initialsInput = document.createElement("input");
        initialsInput.placeholder = "Enter your initials";
        // save your initials/score
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save Your Score";
        // on click, adds your saveScore to the initialInputs value
        saveBtn.addEventListener("click", () => saveScore(initialsInput.value));
        choicesElement.appendChild(initialsInput);
        choicesElement.appendChild(saveBtn);
    }

    //start game on button click
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", startQuiz);
  
