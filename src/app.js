$(function() {
	//VARS:
	let userScore = 0;
	let compScore = 0;
	let userChoice;
	let compChoice;
	const choicesArr = [ 'rock', 'paper', 'scissors' ];

	//DOM ELEMENT VARS:
	const $scores = $('.scores:first');
	const $userScore = $scores.find('#user-score');
	const $compScore = $scores.find('#comp-score');
	const $choices = $('.choices'); //container for choices
	const $choice = $choices.find('.choice'); //each individual choice

	//RESULTS:
	const $resultsSection = $('.results'); //entire container
	const $resultsMsg = $resultsSection.find('results-message:first'); //p elem containing text
	const $selectionImgContainer = $('.selection-img');
	const $userResultsImg = $selectionImgContainer.find('user-results-img');
	const $compResultsImg = $selectionImgContainer.find('comp-results-img');
	let resultMsg;

	//MISC:
	const winBorder = '4px solid green';
	const stdBorder = '2px solid white';

	//BUTTON HANDLER  (Starts Game)
	$choice.on('click', function() {
		//Store Button Clicked:
		let $btn = $(this).attr('id');
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
		const randomNumber = Math.floor(Math.random() * choicesArr.length);
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
		let choices = userChoice + ' ' + compChoice;
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
		const playerSrc = `images/${choice}_mickey.png`;
		const playerAlt = `Hand showing ${choice}.`;
		const $selectionImg = $selectionImgContainer.find(`#${player}-results-img`);
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
		let choices = userChoice + ' ' + compChoice;
		let msg1 = 'Rock breaks Scissors,';
		let msg2 = 'Paper covers Rock,';
		let msg3 = 'Scissors cut Paper,';
		let msg;

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
			setTimeout(function() {
				$($btn).removeClass('btnClicked');
				// console.log("btnClicked class removed");
			}, 150);
		}
	} //DONE
});
