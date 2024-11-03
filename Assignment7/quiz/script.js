const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctida", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asi", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeLeftElement = document.getElementById("time-left");
const reviewContainer = document.getElementById("review-container");
const reviewQuestion = document.getElementById("review-question");
const reviewPreviousButton = document.getElementById("review-previous");
const reviewNextButton = document.getElementById("review-next");

let currentQuestionIndex = 0;
let currentReviewQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.getElementById("timer").style.display = "block";
    showQuestion();

    reviewPreviousButton.style.display = "none";
    reviewNextButton.style.display = "none";
    reviewContainer.style.display = "none";
}

function showScore() {
    resetState();
    document.getElementById("timer").style.display = "none";

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    reviewContainer.style.display = "block";
    document.getElementById("review-buttons").style.display = "flex";

    currentReviewQuestionIndex = 0;
    showReviewQuestion();
}

function showReviewQuestion() {
    resetReviewState();

    reviewContainer.style.marginTop = "30px";

    let currentReviewQuestion = questions[currentReviewQuestionIndex];
    let reviewQuestionNo = currentReviewQuestionIndex + 1;
    reviewQuestion.innerHTML = reviewQuestionNo + ". " + currentReviewQuestion.question;

    currentReviewQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
        document.getElementById("answer-buttons").appendChild(button);
    });

    reviewPreviousButton.style.display = "block";
    reviewNextButton.style.display = "block";

    reviewPreviousButton.disabled = currentReviewQuestionIndex === 0;
    reviewNextButton.disabled = currentReviewQuestionIndex === questions.length - 1;
}

function resetReviewState() {
    while (document.getElementById("answer-buttons").firstChild) {
        document.getElementById("answer-buttons").removeChild(document.getElementById("answer-buttons").firstChild);
    }
}

reviewPreviousButton.addEventListener("click", () => {
    if (currentReviewQuestionIndex > 0) {
        currentReviewQuestionIndex--;
        showReviewQuestion();
    }
});

reviewNextButton.addEventListener("click", () => {
    if (currentReviewQuestionIndex < questions.length - 1) {
        currentReviewQuestionIndex++;
        showReviewQuestion();
    }
});

function showQuestion(){
    resetState();
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    clearInterval(timer);
    timeLeft = 30;
    timeLeftElement.textContent = timeLeft;
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer(){
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if(timeLeft === 0){
            clearInterval(timer);
            handleUnansweredQuestion();
        }
    }, 1000);
}

function handleUnansweredQuestion(){
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
