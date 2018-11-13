
//VARIABLES
    //SCORES:
        let userScore = 0;
        let compScore = 0;
        const userScore_span = document.getElementById("user-score");
        const compScore_span = document.getElementById("computer-score");
    //ACTION MSG:
        const action_message_p = document.getElementById("message");
    //BUTTONS:
        const rock_div = document.getElementById("rock");
        const paper_div = document.getElementById("paper");
        const scissors_div = document.getElementById("scissors");
    //RESULTS:
        const results_section = document.querySelector(".results")
        const resultsMessage_p = document.querySelector(".results-message > p")
        const userChoice = document.getElementById("user-choice-img");
        const compChoice = document.getElementById("comp-choice-img");
    //PLAYER CHOICE IMGs:
        const userChoice_img = document.getElementById("user-choice-img");
        const compChoice_img = document.getElementById("comp-choice-img");
    //MISC:
        const winBorder = "4px solid green";
        const stdBorder = "2px solid white";
        
//FUNCTIONS:

    function setChoiceImg (player, choice) {
        let element;
        //Cache the correct element:
        if (player === "user") {
            element = userChoice_img;
        } else if (player === "comp") {
            element = compChoice_img;
        }
        //Set the correct img scr/alt based on choice:
        switch (choice) {
            case "rock":
                element.src = "images/rock_mickey.png";
                element.alt = "Hand showing rock.";
                break;
            case "paper":
                element.src = "images/paper_mickey.png";
                element.alt = "Hand showing paper.";
                break;
            case "scissors":
                element.src = "images/scissors_mickey.png";
                element.alt = "Hand showing scissors."
                break;
        }
    }

    function setChoiceBorders(user, comp) {
        userChoice.style.border = user;
        compChoice.style.border = comp;
    }

    function updateScores() {
        userScore_span.innerHTML = userScore;
        compScore_span.innerHTML = compScore;
    }

    function setResultsMsg(str) {
        resultsMessage_p.innerHTML = str;
    }

    function win (userChoice, compChoice) {
        //update scores
        userScore++;
        updateScores();

        //update DOM
        let outcome = "YOU WIN!";
        setResultsMsg(outcome);
        setChoiceBorders(winBorder, stdBorder);  //user, comp
    }

    function lose (userChoice, compChoice) {
        //update scores
        compScore++;
        updateScores();

        //update DOM
        let outcome = "YOU LOSE!"
        setResultsMsg(outcome);
        setChoiceBorders(stdBorder, winBorder); //user, comp
    }

    function draw () {
        let outcome = "IT'S A DRAW!";
        setResultsMsg(outcome);
        setChoiceBorders(stdBorder, stdBorder);
    }

    function getCompChoice () {
        const choicesArr = ["rock", "paper", "scissors"];
        const randomNumber = Math.floor(Math.random() * (choicesArr.length));
        return choicesArr[randomNumber];
    }

    function findResults (userChoice, compChoice) {
        let choices = userChoice + " " + compChoice;
        let result;

        switch (choices) {
            case "rock scissors":
            case "paper rock":
            case "scissors paper":
                win(); 
                result = "w";
                break;
            case "scissors rock":
            case "rock paper":
            case "paper scissors":
                lose(); 
                result = "l";
                break;
            default:
                draw(); 
                result = "d";
                break;
        }
        return result;
    }


//DOM ANIMATION
    function animateResults (result) {
        
        //animate winning choice img:
        switch (result) {
            case "w":
                userChoice_img.classList.add("showUserImg");
                userChoice_img.classList.add("")
        }
        
        
        userChoice_img. = 
        compChoice_img = 
    }



//GAME PLAY
let start = function(){

    function game (userChoice) {
        const compChoice = getCompChoice();
        //set user images in results
         setChoiceImg("user", userChoice);
         setChoiceImg("comp", compChoice);
         //calculate results and update DOM
         let result = findResults(userChoice, compChoice);
         //animate results in DOM
         animateResults(result);
    }

    //BUTTON HANDLERS
    rock_div.addEventListener("click", function () {
        game("rock");
    });

    paper_div.addEventListener("click", function () {
        game("paper");
    });

    scissors_div.addEventListener("click", function () {
        game("scissors");
    });

}

//GAME STARTS HERE:
start();