//array of quiz questions
let quizArray = [
    {
        title: "What is a banana?",
        options: {
            a: "A mineral.",
            b: "An animal.",
            c: "A car.",
            d: "A fruit."
        },
        correct: "d"
    },

    {
        title: "What is a man?",
        options: {
            a: "An airplane.",
            b: "A friend.",
            c: "Tasty.",
            d: "A potato."
        },
        correct: "b"
    }

]

let i = 0;
let currentQ = quizArray[i];
let correctNum = 0;
let wrongNum = 0;
let timer = 20;
let intervalId;

//displays question with options
function displayQuestion(objQuiz) {

    //reset the clock
    timer = 20;

    //start the clock
    intervalId = setInterval(function () {
        $("#countdown").text(timer);
        timer--;

        if (timer == 0) {
            $("#countdown").text("TIMES UP!");
            wrongDisplay();
        }

    }, 1000);

    //clears and adds question title
    $("#questionTitle").text("");
    $("#questionTitle").text(objQuiz.title);

    //clears options
    $("#optionsBox").empty();

    //adds question options
    $("#optionsBox").append("<h2 class='choice' id='a'>" + objQuiz.options.a + "</h2>");
    $("#optionsBox").append("<h2 class='choice' id='b'>" + objQuiz.options.b + "</h2>");
    $("#optionsBox").append("<h2 class='choice' id='c'>" + objQuiz.options.c + "</h2");
    $("#optionsBox").append("<h2 class='choice' id='d'>" + objQuiz.options.d + "</h2>");

}

//displays correct answer dialog
function correctDisplay() {
    clearInterval(intervalId);

    $("#questionTitle").text("Correct");
    i++;
    correctNum++;
    currentQ = quizArray[i];

    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else { setTimeout(function () { displayQuestion(currentQ); }, 3000); }
}

//displays wrong answer dialog
function wrongDisplay() {
    clearInterval(intervalId);
    //grabs correct answer
    let correctA = $("#" + currentQ.correct).text();
    $("#questionTitle").text("The correct answer was: " + correctA);
    i++;
    wrongNum++;
    currentQ = quizArray[i];

    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else { setTimeout(function () { displayQuestion(currentQ); }, 3000); }
}

//displays final screen
function displayOver() {
    $("#optionsBox").empty();

    $("#questionTitle").text("All Done!");

    $("#messageBox").append("<h2>Correct Answers: " + correctNum + "</h2>");
    $("#messageBox").append("<h2>Wrong Answers: " + wrongNum + "</h2>");

    $("#countdown").text("");

}

$(document).ready(function () {

    displayQuestion(quizArray[i]);

    $("#optionsBox").on("click", ".choice", function () {

        //compares option id to correct answer
        if ($(this).attr("id") === currentQ.correct) {
            correctDisplay();
        } else {
            wrongDisplay();
        }

    })

});