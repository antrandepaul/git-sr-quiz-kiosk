var mainJS = (function(){
    var questions;
    var answers;
    var inputFile = "data/quiz.json";
    var userId = 500;
    var questionAt = 0;
    var totalScore = 18;
    //Starts maturity digital quiz, generates new user Id and saves it for later use
    var start = function() {
        if (typeof(Storage) !== "undefined"){
            if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== "undefined") {
                userId = parseInt(localStorage.getItem("userId")) + 1;
                localStorage.setItem("userId", userId);
                
            } else localStorage.setItem("userId", userId);
        }
    };

    //Displays user Id at the right corner of the screen of the current page
    //Displays meter reading and progress bar indicating quiz progress at the left corner of the screen
    var showUserId = function(){
        if (typeof(Storage) !== "undefined")
            if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== "undefined"){ 
                userId = parseInt(localStorage.getItem("userId"));
                var curQuestion = localStorage.getItem(userId + "_q");
                if (curQuestion !== null) 
                    questionAt = parseInt(curQuestion);
            }

        $("#userID").html("#" + userId);

        $("meter").val(questionAt + 1);
        //console.log("meter reading:" + $("meter").val());
       
       $(".progress").html($("meter").val() + "/" + $("meter").attr("max"));

    };

    //Retrieves the next question and displays to the top of the screen
    //Highlights the selected answer from the previous screen
    var showAnswer = function() {
        //Show question
        $.getJSON(inputFile, function( result ){
            questions = result.questions;

            if (typeof(Storage) !== "undefined")
            if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== "undefined"){ 

                var curQuestion = localStorage.getItem(userId + "_q");
                if (curQuestion !== null) {
                    questionAt = parseInt(curQuestion);
                    //console.log("userID:" + userId + " question#: " + questionAt);
                    $(".category").html(questions[questionAt].category);
                    $(".question").html(questions[questionAt].question);
                }
                userId = parseInt(localStorage.getItem("userId"));
                $("#" + localStorage.getItem(userId + "_a")).addClass("active");
                var newWidth = $("#" + localStorage.getItem(userId + "_a") + " .ans-bg").width();
                $("#" + localStorage.getItem(userId + "_a") + " .ans-bg").width(0);
                $("#" + localStorage.getItem(userId + "_a") + " .ans-bg").animate({width:newWidth}, 1500, function(){});
            }
        });

    };

    //Updates response data from survey of the 500 executives for the similar question
    var updateResponse = function() {
        if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== "undefined") {
            userId = parseInt(localStorage.getItem("userId"));
            var curQuestion = parseInt(localStorage.getItem(userId + "_q")) + 1;
            switch(curQuestion){
                case 3: 
                    $("#answer1 .ans-bg").width(144);
                    $("#answer1 .ans-percent").html("12%");
                    $("#answer2 .ans-bg").width(12);
                    $("#answer2 .ans-percent").html("1%");
                    $("#answer3 .ans-bg").width(228);
                    $("#answer3 .ans-percent").html("19%");
                    $("#answer4 .ans-bg").width(420);
                    $("#answer4 .ans-percent").html("35%");
                    $("#answer5 .ans-bg").width(396);
                    $("#answer5 .ans-percent").html("33%");
                    break;
                case 4: 
                    $("#answer1 .ans-bg").width(132);
                    $("#answer1 .ans-percent").html("11%");
                    $("#answer2 .ans-bg").width(12);
                    $("#answer2 .ans-percent").html("1%");
                    $("#answer3 .ans-bg").width(228);
                    $("#answer3 .ans-percent").html("19%");
                    $("#answer4 .ans-bg").width(456);
                    $("#answer4 .ans-percent").html("38%");
                    $("#answer5 .ans-bg").width(372);
                    $("#answer5 .ans-percent").html("31%");
                    break;
                case 5: 
                    $("#answer1 .ans-bg").width(180);
                    $("#answer1 .ans-percent").html("15%");
                    $("#answer2 .ans-bg").width(12);
                    $("#answer2 .ans-percent").html("1%");
                    $("#answer3 .ans-bg").width(264);
                    $("#answer3 .ans-percent").html("22%");
                    $("#answer4 .ans-bg").width(384);
                    $("#answer4 .ans-percent").html("32%");
                    $("#answer5 .ans-bg").width(362);
                    $("#answer5 .ans-percent").html("30%");  
                    break;
                case 6: 
                    $("#answer1 .ans-bg").width(132);
                    $("#answer1 .ans-percent").html("11%");
                    $("#answer2 .ans-bg").width(0);
                    $("#answer2 .ans-percent").html("0%");
                    $("#answer3 .ans-bg").width(252);
                    $("#answer3 .ans-percent").html("21%");
                    $("#answer4 .ans-bg").width(360);
                    $("#answer4 .ans-percent").html("30%");
                    $("#answer5 .ans-bg").width(456);
                    $("#answer5 .ans-percent").html("38%");                                      
                    break;
            }
        }
    }

    //Initialize the quiz
    var init = function(){
        $.getJSON(inputFile, function( result ){
            questions = result.questions;

            answers = result.answers;

            quizResult = result.result;

            if (typeof(Storage) !== "undefined"){
                if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== "undefined") {
                    userId = parseInt(localStorage.getItem("userId"));
                    var curQuestion = localStorage.getItem(userId + "_q");
                    if (curQuestion !== null) {
                        questionAt = parseInt(curQuestion) + 1;
                        //console.log("userID:" + userId + " question#: " + questionAt);
                     
                        $(".ans-content").remove();
                        $(".ans1-h1").html(answers[0].ans);                    
                        $("#answer1").data("score", answers[0].score);
                        $(".ans2-h1").html(answers[1].ans);
                        $("#answer2").data("score", answers[1].score);
                        $(".ans3-h1").html(answers[2].ans);
                        $("#answer3").data("score", answers[2].score);
                        $(".ans4-h1").html(answers[3].ans);
                        $("#answer4").data("score", answers[3].score);
                        $(".ans5-h1").html(answers[4].ans);
                        $("#answer5").data("score", answers[4].score);
                    }
                }
                
                $("#userID").html("#" + userId);
                
                
           }
           else alert("System Error!")

            $("meter").val(questionAt + 1);
             //console.log("meter reading:" + $("meter").val());
            
            $(".progress").html($("meter").val() + "/" + $("meter").attr("max"));

           // console.log("questions:" + questions[questionAt].question);
            $(".category").html(questions[questionAt].category);
            $(".question").html(questions[questionAt].question);
          
        });
    };
    
   
    var _updateScore = function(id) {
        var score = $("li.answer-bg.active").data("score");
        userId = localStorage.getItem("userId");
        var scores = localStorage.getItem( userId + "_s");
        var tscores = localStorage.getItem(userId+ "_ts");
        if (userId !==null && scores !==null && tscores !==null) {
            
            localStorage.setItem(userId+ "_s", scores + " " + score);
            totalScore = score +  parseInt(tscores);
            localStorage.setItem( userId+ "_ts", totalScore);
            localStorage.setItem(userId + "_a", id);
        }
        else {
            localStorage.setItem(userId+ "_s", score);
            localStorage.setItem(userId+ "_ts", score);
            localStorage.setItem(userId + "_a", id);
        }
        
        localStorage.setItem(userId + "_q", questionAt);        
        
    };

    //Saves user score and answer as user clicks on next question
    var next = function(id) {
        _updateScore(id);
        questionAt = questionAt + 1;
    }
    
    //Calculates results and applies animation to move the score marker to the right position on the screen at the same time
    // fade in the butterfly
    var _saveAndshowResult = function() {
        userId = localStorage.getItem("userId");
        var userTotalScore = localStorage.getItem(userId + "_ts");
        if(userId ===null || userTotalScore === null) return;

        var userScore = parseInt(100*(userTotalScore/totalScore)).toFixed(2);
        localStorage.setItem(userId + "_score", userScore);
        //console.log("userScore:" + userScore);

        $.getJSON(inputFile, function( result ){        
            quizResult = result.result;
            var resultJSON;
            var className;
            var butterflyClassName;
            if (userScore <= 48.14){
                resultJSON = quizResult[0];
                className = ".digital-adolescent";
                butterflyClassName = ".results-butterfly-1-png";
            }
            else if (userScore <= 58.89){
                resultJSON = quizResult[1];
                className = ".time-to-get-moving";
                butterflyClassName = ".results-butterfly-2-png";
            }
            else if (userScore <= 67.97) {
                resultJSON = quizResult[2];
                className = ".getting-there";
                butterflyClassName = ".results-butterfly-3-png";
            }
            else if (userScore <= 75.27) {
                resultJSON = quizResult[3];               
                className = ".up-and-coming";
                butterflyClassName = ".results-butterfly-4-png";
            }
            else { resultJSON = quizResult[4];
                className = ".picture-of-maturity";
                butterflyClassName = ".results-butterfly-5-png";
            }

            $(className).fadeIn("slow", function(){$(this).addClass("result-outline")});
            var newTop = $(".scatterplot-png").position().top + $(".scatterplot-png").outerHeight()*0.6;
            var newLeft = $(className).position().left + ($(className).outerWidth() - $(".result-marker").outerWidth())/2;
            
            $(".result-marker").css({"top": newTop + "px", "left": newLeft - 200 + "px"});
            $(".result-marker").show();
            //console.log("marker's top:" + newTop + " left:" + newLeft);

            $(".result-description .result-title").html(resultJSON.title);
            $(".result-description .result-desc").html(resultJSON.desc);
            //console.log("title:" + resultJSON.title + " desc: " + resultJSON.desc);

            $(".loading-executive-results-calc").hide();

            $(".result-description").slideDown("slow");
            $(".result-marker").animate({"left": "+=200px"}, "slow");

            $(".butterflies .active").children("div").addClass("inactive");
            $(butterflyClassName).removeClass("inactive");
        });
        
    }

    var submit = function() {
        _saveAndshowResult();
    }

    return {
        start: start,
        showUserId: showUserId,
        showQA: showAnswer,
        updateExecResponse: updateResponse,
        init: init,        
        next: next,
        submit: submit
    };
})();
