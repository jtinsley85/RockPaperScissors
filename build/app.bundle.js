"use strict";

//SCORES:
var userScore = 0;
var compScore = 0;
var userScore_span = document.getElementById("user-score");
var compScore_span = document.getElementById("computer-score");

//CHOICES:
var choicesArr = ["rock", "paper", "scissors"];

//MISC:
var winBorder = "4px solid green";
var stdBorder = "2px solid white";
var choiceBntAnimation = "choiceBtn 200ms ease-out 0s 1 normal;";

//FUNCTIONS:
function setChoiceImg(player, choice) {
    //Set the correct img src & alt msg
    var playerSrc = "images/" + choice + "_mickey.png";
    var playerAlt = "Hand showing " + choice + ".";
    //Assign them to the correct img attr:
    $(".selection-img #" + player + "-choice-img").attr({
        'src': playerSrc,
        'alt': playerAlt
    });
} //DONE

function setChoiceBorders(user, comp) {
    $('user-choice-img').css('border', user);
    $('comp-choice-img').css('border', comp);
} //OK

function updateScores() {
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
} //OK

function setResultsMsg(str) {
    $('.results-message:first').html(str);
} //DONE

function win(userChoice, compChoice, resultMsg) {
    //update scores
    userScore++;
    updateScores();
    //update DOM
    setResultsMsg(resultMsg);
    setChoiceBorders(winBorder, stdBorder); //user, comp
} //DONE

function lose(userChoice, compChoice, resultMsg) {
    //update scores
    compScore++;
    updateScores();
    //update DOM
    setResultsMsg(resultMsg);
    setChoiceBorders(stdBorder, winBorder); //user, comp
} //DONE

function draw(resultMsg) {
    setResultsMsg(resultMsg);
    setChoiceBorders(stdBorder, stdBorder);
} //DONE

function getCompChoice() {
    var randomNumber = Math.floor(Math.random() * choicesArr.length);
    return choicesArr[randomNumber];
} //DONE

function calcResult(userChoice, compChoice) {
    var choices = userChoice + " " + compChoice;
    var msg1 = "Rock breaks Scissors,";
    var msg2 = "Paper covers Rock,";
    var msg3 = "Scissors cut Paper,";
    var resultMsg = void 0;

    //calculate what win/lose/draw means
    switch (choices) {
        case "rock scissors":
            resultMsg = msg1 + "\nYou Win!";
            win();
            break;
        case "paper rock":
            resultMsg = msg2 + "\nYou Win!";
            win();
            break;
        case "scissors paper":
            resultMsg = msg3 + "\nYou Win!";
            win();
            break;
        case "scissors rock":
            resultMsg = msg1 + "\nYou Lose!";
            lose();
            break;
        case "rock paper":
            resultMsg = msg2 + "\nYou Lose!";
            lose();
            break;
        case "paper scissors":
            resultMsg = msg3 + "\nYou Lose!";
            lose();
            break;
        default:
            draw();
            resultMsg = "It's A Draw!"; //Don't calculate special message for draw.
            break;
    }

    return resultMsg;
} //ALMOST DONE  -  maybe just go back to "YOU WIN / YOU LOSE / IT'S A DRAW...
// Then add the word "breaks/cuts/covers" between the images.


//DOM ANIMATION
function showResultsSection() {
    $('.results').addClass('opacity1');
}

function findResultsAndShow(userChoice, compChoice) {
    //figure out resultMsg and call result fn
    var resultMsg = calcResult(userChoice, compChoice);
    //update selection imgs in DOM
    setChoiceImg("user", userChoice);
    setChoiceImg("comp", compChoice);
    //set result msg in DOM
    $(".results-message:first").html(resultMsg);
    //make results section visible
    showResultsSection();
} //DONE

function animateChoiceBtn($btn) {
    //Add animation class
    $($btn).addClass('btnClicked', removeClass());
    //Remove class after delay
    function removeClass() {
        setTimeout(function () {
            $($btn).removeClass('btnClicked');
            // console.log("btnClicked class removed");
        }, 150);
    }
} //DONE

function game(userChoice) {
    var compChoice = getCompChoice();
    //log choices
    console.log("user chose = " + userChoice + " || comp chose = " + compChoice);
    //set user images in results
    setChoiceImg("user", userChoice);
    setChoiceImg("comp", compChoice);
    //calculate results and update DOM
    var result = calcResult(userChoice, compChoice);
    //animate results in DOM
    findResultsAndShow(userChoice, compChoice);
} //DONE

//GAME PLAY
function start() {
    $(function () {
        //Handle Button Clicks and start game:
        $('.choices .choice').on('click', function () {
            //Get ID for btn clicked
            var $btn = $(this).attr('id');
            //Animate the btn:
            animateChoiceBtn('#' + $btn); //requires hashed string "#string" version for use as ID in jQuery later.
            //launch game:
            game($btn); //Non hashed version used here...
        });
    });
}

//GAME STARTS HERE:
start();
