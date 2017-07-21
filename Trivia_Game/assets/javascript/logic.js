$(document).ready(function() {

    //global variables

    var right = 0;
    var wrong = 0;
    var total = right + wrong;
    var unanswered = 0;
    var percent = 0;
    var quesNum = 0;

    //questions
    var quiz = [{
            questionNumber: 1,
            question: 'What is the name of Jack Sparrows Ship?',
            choices: ['The Black Beauty', 'The Black Pearl', 'The Black Flag', 'None of the Above'],
            correct: 'The Black Pearl',
            placeHolder: 'assets/images/q1.png',
            answerInfo: 'Jack Sparrow is captain of the Black Pearl... most of the time'
        },
        {
            questionNumber: 2,
            question: 'What is locked in Davy Jones\' locker?',
            choices: ['Pirate treasure', 'His gym clothes', 'His heart', 'Nothing, it\'s empty'],
            correct: 'His heart',
            placeHolder: 'assets/images/q1.png',
            answerInfo: 'The heart of Davy Jones is in the locker'
        },
        {
            questionNumber: 3,
            question: 'What instrument does Jack Sparrow use to navigate?',
            choices: ['gut feeling', 'nautical maps', 'sexton', 'compass'],
            correct: 'compass',
            placeHolder: 'assets/images/q1.png',
            answerInfo: 'Jack\'s compass guides him to whatever he most desires'
        },

    ]




    var timer = {
        time: 11,
        reset: function() {
            timer.time = 11;
        },
        start: function() {
            counter = setInterval(timer.count, 1000);
        },
        stop: function() {
            clearInterval(counter);
        },
        count: function() {
            timer.time--;
            var converted = timer.timeConverter(timer.time);
            $('#timeShow').html(converted);
            timer.check();

        },
        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        },
        check: function() {
            if (timer.time == 0) {
                setTimeout(timesUp, 500);
                setTimeout(startQuiz, 4000);
            }
        }
    }

    //functions
    //draw board
    function createBoard() {
        $('.container').empty();
        $('#opening').removeClass().addClass('container game text-center');
        $('.container').append('<div class="row"><div class="timerContainer"><div id="timeLeft">Time Left:</div><div id="timeShow">00:10</div></div>');
        $('.container').append('<div class="row"><div class="col-md-10 col-md-offset-1 quizContainer"><div id="question"></div><ul id="answers"></ul></div></div>');
        $('.container').append('<div class="row"><div class="questionsLeftContainer"><div id="questionsLeft">Questions:</div><div class="numberLeft" id="numQuestionsLeft">1 of 3</div></div></div></div>');
        startQuiz();
    };


    function resetGame() {
        right = 0;
        wrong = 0;
        percent = 0;
        quesNum = 0;
        createBoard();
    }


    function timesUp() {
        timer.stop();
        $('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
        $('#answerImg').attr('src', quiz[quesNum].placeHolder);
        $('.quizContainer').append('<div id="answerText"><span id="incorrect">OUT OF TIME!</span><br>' + quiz[quesNum].answerInfo + '</div>');
        unanswered++;
        quesNum++;
    }



    function youAreCorrect() {
        timer.stop();
        $('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
        $('#answerImg').attr('src', quiz[quesNum].placeHolder);
        $('.quizContainer').append('<div id="answerText"><span id="correct">You are correct!!!</span><br>' + quiz[quesNum].answerInfo + '</div>');
        right++;
        quesNum++;
    }

    function youAreIncorrect() {
        timer.stop();
        $('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
        $('#answerImg').attr('src', quiz[quesNum].placeHolder);
        $('.quizContainer').append('<div id="answerText"><span id="incorrect">Sorry. You are incorrect.</span><br>' + quiz[quesNum].answerInfo + '</div>');
        wrong++;
        quesNum++;
    }



    function quizEnd() {
        $('#timeShow').text('COMPLETE');
        percent = (right / quiz.length) * 100;
        $('.quizContainer').html('<div class="text-center" id="endOfGame">You have reached the end of the quiz</div><hr class="styleOne">');
        $('.quizContainer').append('<div class="text-center" id="score">Correct answers: <span id="correct">' + right + '</span></div>');
        $('.quizContainer').append('<div class="text-center" id="score">Inorrect answers: <span id="incorrect">' + wrong + '</span></div>');
        $('.quizContainer').append('<div class="text-center" id="score">Unanswered: ' + unanswered + '</div>');
        $('.quizContainer').append('<hr class="styleTwo"><div class="text-center" id="percent">You scored: <span id="incorrect">' + percent + '%</span></div>');
        $('.quizContainer').append('<div><button class="start">Restart Game</button></div>');
        $('.start').click(function() {
            resetGame();
        });
    }


    function startQuiz() {

        if (quesNum == quiz.length) {
            quizEnd();
        } else {

            //timer restart
            timer.reset();
            timer.start();

            //number of questions left
            var slideNum = quesNum + 1;
            $('.numberLeft').html('<div id="numQuestionsLeft">' + slideNum + " of " + quiz.length + '</div>');

            //empty div
            $('quizContainer').empty();

            //create divs
            $('.quizContainer').html('<div id="question"></div>' + '<ul id="answers"></ul>');

            //write question to html
            $('#question').html(quiz[quesNum].question);

            //collect answers 		
            for (var i = 0; i < quiz[quesNum].choices.length; i++) {
                $('#answers').append('<li>' + quiz[quesNum].choices[i] + '</li>');
            }

            //record user choice
            $("#answers li").click(function() {
                var userGuess = $(this).text();

                //compare userchoice to correct answer
                if (userGuess == quiz[quesNum].correct) {

                    setTimeout(youAreCorrect, 500);
                    setTimeout(startQuiz, 4000);

                } else {

                    setTimeout(youAreIncorrect, 500);
                    setTimeout(startQuiz, 4000);
                }
            });
        }

    }

    $('.start').click(function() {
        createBoard();
    });



});