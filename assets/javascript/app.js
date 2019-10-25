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

//displays question with options
function displayQuestion(objQuiz) {

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

function correctDisplay() {
    $("#questionTitle").text("Correct");
    i++;
    correctNum++;
    currentQ = quizArray[i];
    setTimeout(function(){ displayQuestion (currentQ); }, 3000);
}

function wrongDisplay() {
    //grabs correct answer
    let correctA = $("#"+currentQ.correct).text();
    $("#questionTitle").text("Wrong! The correct answer was: " +correctA);
    i++;
    wrongNum++;
    currentQ = quizArray[i];
    setTimeout(function(){ displayQuestion (currentQ); }, 3000);
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