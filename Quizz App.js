const questions=[
    {
        question:"Which is largest animal in the World?",
        answers:[
            { text:"Shark", correct: false},
            { text:"Blue Whale", correct: true},
            { text:"Elephant", correct: false},
            { text:"Giraffe", correct: false},
        ]
    },
    {
        question:"Which is largest desert in the World?",
        answers:[
            { text:"Kalahari", correct: false},
            { text:"Gobi", correct: false},
            { text:"Sahara", correct: false},
            { text:"Antarctica", correct: true},
        ]
    },
    {
        question:"Which is smallest continent in the World?",
        answers:[
            { text:"Asia", correct: false},
            { text:"Australia", correct: true},
            { text:"Arctic", correct: false},
            { text:"Africa", correct: false},
        ]
    },
    {
        question:"What country has highest life expectancy in the World?",
        answers:[
            { text:"Brazil", correct: false},
            { text:"Hong Kong", correct: true},
            { text:"Australia", correct: false},
            { text:"UK", correct: false},
        ]
    },
    {
        question:"Which is the only body part that is fully grown from birth?",
        answers:[
            { text:"nose", correct: false},
            { text:"eyes", correct: true},
            { text:"heart", correct: false},
            { text:"brain", correct: false},
        ]
    },
    {
        question:"What is the only continent with land in all four hemispheres?",
        answers:[
            { text:"Africa", correct: true},
            { text:"Australia", correct: false},
            { text:"Brazil", correct: false},
            { text:"Dublin", correct: false},
        ]
    },
    {
        question:"Where is Angel Falls, the world’s largest waterfall, located?",
        answers:[
            { text:"India", correct: false},
            { text:"Hong Kong", correct:false},
            { text:"Rhode Island", correct: false},
            { text:"Venezuela", correct: true},
        ]
    },
    {
        question:"What is the capital of Canada?",
        answers:[
            { text:"Edmonton", correct: false},
            { text:"Ottawa", correct: true},
            { text:"Calbary", correct: false},
            { text:"Alberta", correct: false},
        ]
    },
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuizz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState(); //first of all,all the precious question boxes will dissappear
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            //the correct property will be set in button attribute by using dataset.Dataset stores additional data about an attribute
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
    });
}
function resetState(){
    nextButton.style.display="none";
    // loop runs as long as there is first child
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target; //targetting attribute that triggered the event(button in this case)
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    //array.from is taking the child elements of the answerButtons and converting them into an array.
    //For each iterates over each button of answerbuttons to find if any button has data-correct=true
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuizz(); //for restarting the quizz
    }
})
startQuizz();


