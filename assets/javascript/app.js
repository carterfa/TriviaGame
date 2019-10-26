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
    },

    {
        title: "I have apples.",
        options: {
            a: "Cool.",
            b: "Nice.",
            c: "Bad.",
            d: "Awful."
        },
        correct: "a"
    }

]

//variables
let i = 0;
let currentQ = quizArray[i];
let correctNum = 0;
let wrongNum = 0;
let timer = 20;
let intervalId;
let clockRunning = true;

//displays question with options
function displayQuestion(currentQ) {

    //reset the clock
    timer = 20;
    $("#countdown").text(timer);
    clockRunning = true;

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
    $("#questionTitle").text(currentQ.title);

    //clears options
    $("#optionsBox").empty();

    //adds question options
    $("#optionsBox").append("<h2 class='choice' id='a'>" + currentQ.options.a + "</h2>");
    $("#optionsBox").append("<h2 class='choice' id='b'>" + currentQ.options.b + "</h2>");
    $("#optionsBox").append("<h2 class='choice' id='c'>" + currentQ.options.c + "</h2");
    $("#optionsBox").append("<h2 class='choice' id='d'>" + currentQ.options.d + "</h2>");

}

//displays correct answer dialog
function correctDisplay() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //display message
    $("#questionTitle").text("Correct!");

    //adds to correct count
    correctNum++;

    //only go to next question if there is one, or go to final screen
    i++;
    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else {
        currentQ = quizArray[i];
        setTimeout(function () { displayQuestion(currentQ); }, 3000);
    }
}

//displays wrong answer dialog
function wrongDisplay() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //grabs and displays correct answer
    let correctA = $("#" + currentQ.correct).text();
    $("#questionTitle").text("The correct answer was: " + correctA);

    $("#" + currentQ.correct).css("background-color", "green");

    //adds to wrong count
    wrongNum++;

    //only go to next question if there is one, or go to final screen
    i++;
    if (i == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else {
        setTimeout(function () {
            currentQ = quizArray[i];
            displayQuestion(currentQ);
        }, 3000);
    }
}

//displays final screen
function displayOver() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //clear out options
    $("#optionsBox").empty();

    //display message
    $("#questionTitle").text("All Done!");

    //display number wrong and correct
    $("#messageBox").append("<h2>Correct Answers: " + correctNum + "</h2>");
    $("#messageBox").append("<h2>Wrong Answers: " + wrongNum + "</h2>");

    //clears timer
    $("#countdown").text("");

}

$(document).ready(function () {

    //begins quiz
    displayQuestion(quizArray[i]);

    //code for choosing answer
    $("#optionsBox").on("click", ".choice", function () {

        if (clockRunning === true) {
            //compares option id to correct answer
            if ($(this).attr("id") === currentQ.correct) {
                correctDisplay();
                $(this).css("background-color", "green");
            } else {
                wrongDisplay();
                $(this).css("background-color", "red");
            }
        }
    })

});