'use strict';

$(function () {
	//VARS:
	var userScore = 0;
	var compScore = 0;
	var userChoice = void 0;
	var compChoice = void 0;
	var choicesArr = ['rock', 'paper', 'scissors'];

	//DOM ELEMENT VARS:
	var $scores = $('.scores:first');
	var $userScore = $scores.find('#user-score');
	var $compScore = $scores.find('#comp-score');
	var $choices = $('.choices'); //container for choices
	var $choice = $choices.find('.choice'); //each individual choice

	//RESULTS:
	var $resultsSection = $('.results'); //entire container
	var $resultsMsg = $resultsSection.find('results-message:first'); //p elem containing text
	var $selectionImgContainer = $('.selection-img');
	var $userResultsImg = $selectionImgContainer.find('user-results-img');
	var $compResultsImg = $selectionImgContainer.find('comp-results-img');
	var resultMsg = void 0;

	//MISC:
	var winBorder = '4px solid green';
	var stdBorder = '2px solid white';

	//BUTTON HANDLER  (Starts Game)
	$choice.on('click', function () {
		//Store Button Clicked:
		var $btn = $(this).attr('id');
		userChoice = $btn;
		//Animate the btn:
		animateChoiceBtn('#' + userChoice); //hashed version
		//launch game:
		game(userChoice); //Non hashed ID used here...
	});

	//GAME FUNCS
	function game(userChoice) {
		//Get compChoice:
		compChoice = getCompChoice();
		//Set user images in results:
		setSelectionImg('user', userChoice);
		setSelectionImg('comp', compChoice);
		//Calc & Set Results:
		findAndShowResults(userChoice, compChoice);
	} //DONE

	function getCompChoice() {
		var randomNumber = Math.floor(Math.random() * choicesArr.length);
		return choicesArr[randomNumber];
	} //DONE

	//OUTCOME FUNCS:
	function findAndShowResults(userChoice, compChoice) {
		//Find results and call outcome fn
		calcResult(userChoice, compChoice);
		//update selection imgs in DOM
		setSelectionImg('user', userChoice);
		setSelectionImg('comp', compChoice);
		//make results section visible
		showResultsSection();
	} //DONE

	function calcResult(userChoice, compChoice) {
		var choices = userChoice + ' ' + compChoice;
		//calculate result based off choice combo
		switch (choices) {
			case 'rock scissors':
			case 'paper rock':
			case 'scissors paper':
				win();
				break;
			case 'scissors rock':
			case 'rock paper':
			case 'paper scissors':
				lose();
				break;
			default:
				draw();
				break;
		}
	} //DONE

	function win() {
		//Update scores
		userScore++;
		// console.log('WIN CALLED');
		// console.log(`SCORES: comp (${compScore}) | user (${userScore})`);
		updateScores();
		//Update DOM
		setResultsMsg(userChoice, compChoice);
		setResultsImgBorders(winBorder, stdBorder); //user, comp
	} //DONE

	function lose() {
		//Update scores:
		compScore++;
		// console.log('LOSE CALLED');
		// console.log(`SCORES: comp (${compScore}) | user (${userScore})`);
		updateScores();
		//Update DOM:
		setResultsMsg(userChoice, compChoice);
		setResultsImgBorders(stdBorder, winBorder); //user, comp
	} //DONE

	function draw() {
		//Update DOM:
		setResultsMsg(userChoice, compChoice);
		setResultsImgBorders(stdBorder, stdBorder);
	} //DONE

	//DOM FUNCS:
	function setSelectionImg(player, choice) {
		//Set the correct img src & alt msg
		var playerSrc = 'images/' + choice + '_mickey.png';
		var playerAlt = 'Hand showing ' + choice + '.';
		var $selectionImg = $selectionImgContainer.find('#' + player + '-results-img');
		//Assign them to the correct img attr:
		$selectionImg.attr({
			src: playerSrc,
			alt: playerAlt
		});
	} //DONE

	function setResultsImgBorders(user, comp) {
		$userResultsImg.css('border', user);
		$compResultsImg.css('border', comp);
	} //OK

	function updateScores() {
		// console.log('updateScores called', `comp= ${compScore} user= ${userScore}`);
		$userScore.html(userScore);
		$compScore.html(compScore);
	} //DONE

	function setResultsMsg(userChoice, compChoice) {
		var choices = userChoice + ' ' + compChoice;
		var msg1 = 'Rock breaks Scissors,';
		var msg2 = 'Paper covers Rock,';
		var msg3 = 'Scissors cut Paper,';
		var msg = void 0;

		switch (choices) {
			case 'rock scissors':
			case 'scissors rock':
				msg = msg1;
				'rock scissors' ? msg + ' You Win!' : ' You Lose!';
				break;
			case 'paper rock':
			case 'rock paper':
				msg = msg2;
				'paper rock' ? msg + ' You Win!' : ' You Lose!';
				break;
			case 'scissors paper':
			case 'paper scissors':
				msg = msg3;
				'scissors paper' ? msg + ' You Win!' : ' You Lose!';
				break;
			default:
				msg = "It's A Draw!"; //Don't calculate special message for draw.
				break;
		}

		//SET MSG to DOM
		$resultsMsg.html(msg);
	} //DONE

	//DOM ANIMATION & VISIBILITY FUNCS
	function showResultsSection() {
		$resultsSection.addClass('opacity1');
	}

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
});