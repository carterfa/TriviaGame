//variables
let quizArray = [];
let quizIdx = 0;
let quizNum = 10;
let currentQ = "";
let correctNum = 0;
let wrongNum = 0;
let timer = 20;
let intervalId;
let clockRunning = true;
let token = "";
let correctId = "";

//question constructor
function Question(title, correct, options) {
    this.title = title;
    this.correct = correct;
    this.options = options;
    options.push(correct);

}

//gets token from trivia database
function getToken() {

    $.ajax({
        url: "https://opentdb.com/api_token.php?command=request",
        Method: "GET"
    }).then(function (response) {
        token = response.token;
    })
}

//resets token
function resetToken(token) {

    $.ajax({
        url: "https://opentdb.com/api_token.php?command=reset&token=" + token,
        Method: "GET"
    }).then(function (response) {
        getTrivia();
    })
}

//API request
function getTrivia() {
    //object containing parameters 
    const QueryParams = {
        "amount": quizNum,
        "category": 15,
        "token": token
    };

    //set parameters from object
    let paramString = $.param(QueryParams);
    let queryURL = "https://opentdb.com/api.php?" + paramString;

    $.ajax({
        //calls search
        url: queryURL,
        Method: "GET"
    }).then(function (response) {
        //console.log(response);
        if (response.response_code === 4) {
            resetToken();
        }

        //builds array of questions
        let resArr = response.results;
        for (let i = 0; i < resArr.length; i++) {
            
                let title = resArr[i].question;
                let correct = resArr[i].correct_answer;
                let options = resArr[i].incorrect_answers;
                let q = new Question(title, correct, options);
                quizArray.push(q);
            
        }

        //establishes the current question
        currentQ = quizArray[quizIdx];
        correctId = currentQ.options.length - 1;
        displayQuestion(currentQ);

    })


}

//only go to next question if there is one, or go to final screen
function nextQ() {

    quizIdx++;
    if (quizIdx == quizArray.length) {
        setTimeout(function () { displayOver(); }, 3000);
    } else {
        currentQ = quizArray[quizIdx];
        correctId = currentQ.options.length - 1;
        setTimeout(function () { displayQuestion(currentQ); }, 3000);
    }

}

//displays question with options
function displayQuestion(currentQ) {

    //reset the clock
    timer = 20;
    $("#countdown").text(timer);
    clockRunning = true;

    //start the clock
    intervalId = setInterval(function () {
        timer--;
        $("#countdown").text(timer);

        if (timer == 0) {
            $("#countdown").text("TIMES UP!");
            wrongDisplay();
        }

    }, 1000);

    //clears and adds question title
    $("#questionTitle").text("");
    $("#questionTitle").html(currentQ.title);

    //clears options
    $("#optionsBox").empty();

    //shuffles options
    const shuffle = new Set([])
    let opts = currentQ.options.length;
    
    while (shuffle.size < opts){
        shuffle.add(Math.floor(Math.random() * opts));
      };

    //adds question options
    for (const i of shuffle) {
        $("#optionsBox").append(`<h4 class='choice' id='${i}'>${currentQ.options[i]}</h4>`);
    }

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

    nextQ();
}

//displays wrong answer dialog
function wrongDisplay() {

    //stops the clock
    clearInterval(intervalId);
    clockRunning = false;

    //grabs and displays correct answer
    let correctA = $("#" + correctId).text();
    $("#questionTitle").text("The correct answer was: " + correctA);
    //highlights correct answer
    $("#" + correctId).css("background-color", "#04aa04");

    //adds to wrong count
    wrongNum++;

    nextQ();
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
    $("#messageBox").append("<h4>Correct: " + correctNum + "</h4>");
    $("#messageBox").append("<h4>Wrong: " + wrongNum + "</h4>");

    //clears timer
    $("#countdown").text("");

    //shows start button
    $("#startBtn").show()

    //resets quizIdx
    quizIdx = 0;

}

//waits for page to load
$(document).ready(function () {

    getToken();

    //begins quiz on button click
    $("#startBtn").on("click", function () {

        //resets correct and wrong count
        correctNum = 0;
        wrongNum = 0;
        quizArray = [];

        getTrivia();

        $("#messageBox").empty();
        $("#startBtn").hide();
    })


    //code for choosing answer
    $("#optionsBox").on("click", ".choice", function () {
        //only runs comparison if question not answered yet
        if (clockRunning === true) {
            //compares option id to correct answer
            if ($(this).attr("id") === correctId.toString()) {
                correctDisplay();
                $(this).css("background-color", "#04aa04");
            } else {
                wrongDisplay();
                $(this).css("background-color", "#fb993b");
            }
        }
    })

});