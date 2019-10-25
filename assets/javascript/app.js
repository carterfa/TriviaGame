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

//displays question with options
function displayQuestion(objQuiz) {

    $("#questionTitle").text(objQuiz.title);

    $("#optionsBox").empty();

    $("#optionsBox").append("<h2 class='choice' id='a'>"+objQuiz.options.a+"</h2>");
    $("#optionsBox").append("<h2 class='choice' id='b'>"+objQuiz.options.b+"</h2>");
    $("#optionsBox").append("<h2 class='choice' id='c'>"+objQuiz.options.c+"</h2");
    $("#optionsBox").append("<h2 class='choice' id='d'>"+objQuiz.options.d+"</h2>");

}


$(document).ready(function () {

    
    let currentQ = quizArray[0];

    displayQuestion(currentQ);

    $("#optionsBox").on("click", ".choice", function (){
          
        if ($(this).attr("id") === currentQ.correct){

            console.log("correct");
        }else {
            console.log("wrong");
        }
        
        



    })

    

    



});