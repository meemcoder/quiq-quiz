const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answer-tracker");
const totalQuestionSpan = document.querySelector(".total-question");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const correctAnswerSpan = document.querySelector(".correct-answers");
const questionNumberSpan = document.querySelector(".question-num-value");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");

let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

//questions and options//

const questions =[
    {
        q: "What does HTTP stands for?",
        options: ["Hypertext Tcp Packet", "HyperTIm Transport Protocol", "Hyperterm Transfer Particle", "Hypertext Transfer Protocol"],
        answer: 3
    },
    {
        q: "What are the two most popular web server operating systems?",
        options: ["Linux and Vista", "OS/2 and system", "Mac Os and Linux", "Windows and Linux"],
        answer: 3
    },
    {
        q: "What terms describes developers proficient at working on all parts of a web application?",
        options: ["Python Developers", "Server Developers", "Full Stack Developers", "Client Developers"],
        answer: 2
    },
    {
        q: "What acronym is used to describe a web application designed to give users the look and feel of a native mobile application? ",
        options: ["PWA", "XML", "JSON", "CSS"],
        answer: 0
    },
    {
        q: "What type of developers are focused more on gathering data, calling external services, and implementing proprietary business rules?",
        options: ["Operating Business Developers", "Network Engineers", "Client side web Developers", "Server side web Developers"],
        answer: 3
    },
];

//set questions and options//

totalQuestionSpan.innerHTML = questions.length;
function load(){
    questionNumberSpan.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].options[0];
    op2.innerHTML = questions[questionIndex].options[1];
    op3.innerHTML = questions[questionIndex].options[2];
    op4.innerHTML = questions[questionIndex].options[3];
    index++;

    };

    function check(element){
        if(element.id==questions[questionIndex].answer){
            element.classList.add("correct");
            updateAnswerTracker("correct");
            score++;
        }
        else{
            element.classList.add("incorrect");
            updateAnswerTracker("incorrect");

        }
        disabledOptions() 
    }
    function disabledOptions(){
        for(let i=0; i<options.length; i++) {
            options[i].classList.add("disabled");
            if(options[i].id==questions[questionIndex].answer){
                options[i].classList.add("correct");

            }
        }
    }

    function enableOptions(){
        for(let i=0; i<options.length; i++) {
            options[i].classList.remove("disabled", "correct", "incorrect");
        }
    }

    function Validate(){
        if(!options[0].classList.contains("disabled")){
            alert("please select one option");
        }
        else{
            enableOptions();
            randomQuestion();
        }
    }
    function next(){
        Validate();
    }

    function randomQuestion(){
        let randomNumber = Math.floor(Math.random()*questions.length);
        let hitDuplicate=0;
        if(index==questions.length){
            quizOver();
        }
        else{
            if(myArray.length>0){
                for(let i=0; i<myArray.length; i++){
                    if(myArray[i]==randomNumber){
                        hitDuplicate=1;
                        break;
                    }
                }
                if(hitDuplicate==1){
                    randomNumber();
                }
                else{
                    questionIndex=randomNumber;
                    load();
                    myArr.push(questionIndex);
                }
            }
            if(myArray.length==0){
                questionIndex = randomNumber;
                load();
                myArr.push(questionIndex);
            }

        myArray.push(randomNumber);
    
        }
    }

    function answerTracker(){
        for(let i=0; i<questions.length; i++){
            const div=document.createElement("div")
            answerTrackerContainer.appendChild(div);
        }
    }
    function updateAnswerTracker(classNam){
        answerTrackerContainer.children[index-1].classList.add(classNam);
    }

function quizOver(){
    document.querySelector(".quizOver").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}
function tryAgain(){
    window.location.reload();
}
    window.onload = function(){
    
        randomQuestion();
        answerTracker();
}
load();
