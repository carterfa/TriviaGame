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
    }

]


$(document).ready(function () {

    function displayQuestion(objQuiz) {

        $("#questionTitle").text(objQuiz.title);

        $("#optionsBox").empty();

        $("#optionsBox").append("<div><input type='radio' name='option' value='1'>"+objQuiz.options.a+"</input></div>");
        $("#optionsBox").append("<div><input type='radio' name='option' value='2'>"+objQuiz.options.b+"</input></div>");
        $("#optionsBox").append("<div><input type='radio' name='option' value='3'>"+objQuiz.options.c+"</input></div>");
        $("#optionsBox").append("<div><input type='radio' name='option' value='4'>"+objQuiz.options.d+"</input></div>");
    
    }

    displayQuestion(quizArray[0]);



});