// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var startScreen = document.getElementById('start-screen');
var timerId;


function startQuiz() {
    startScreen.classList.add('hide');
    // hide start screen
    questionsEl.classList.remove('hide');
    feedbackEl.classList.remove('hide');
    // un-hide questions section

    //start timer (high)
    timerId = setInterval(clockTick, 1000);

    getQuestion();
}

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function getQuestion() { //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex]

    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    // it looks at the div with the id of choices and clears anything inside there
    choicesEl.innerHTML = ''; //Study this later

    // create a for loop that creates the choice elements
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        // create new button for each choice
        var button = document.createElement('button');
        //.createElement
        button.setAttribute('class', 'choice')
        //.setAttribute (set a class="choice")
        button.textContent = currentQuestion.choices[i];
        //.textContent
        choicesEl.append(button);
        //.appendChild
    }
}

function questionClick(event) {
    var buttonEl = event.target;

    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
        return;
    }

    // check if user guessed right or wrong
    if (buttonEl.textContent != questions[currentQuestionIndex].answer) { //replace true with a conditional statement that checks if the clicked choice button's value is the same as the questions[currentQuestionIndex]'s answer
        //incorrect answer scenario

        // penalize time
        time-=15;
        // display new time on page
        feedbackEl.innerHTML = '';
        var p = document.createElement('p');
        p.textContent = "Incorrect!";
        feedbackEl.append(p);
        // return;
    } else {
        //correct scenario

        // move to next question
        feedbackEl.innerHTML = '';
        var p = document.createElement('p');
        p.textContent = "Correct!";
        feedbackEl.append(p);
        // return;
    }
    // flash correct/incorrect feedback on page

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute('class', 'hide');
}


function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {

        //JSON.parse
        // get saved scores from localstorage (highscores), or if not any, set to empty array
        // LOOK INTO LOCALSTORAGE GET ITEM
    var count = localStorage.getItem(highscores);
        // format new score object for current user
        // TAKE THE NEW SCORE (initals) AND PUSH/ADD ONTO OLD SCORES
        

        // save to localstorage
        //RE UPDATE LOCAL STORAGE BY USING LOCALSTORAGE SET ITEM
        
        window.localStorage.setItem("initials", initials);
        window.localStorage.setItem("highscores", highscores);

        // redirect to next page
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;