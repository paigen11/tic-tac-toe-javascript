var whosTurn = 1; //start off on player 1's turn

var winners = [
	["A1", "A2", "A3"], //row 1
	["B1", "B2", "B3"], //row 2
	["C1", "C2", "C3"], //row 3
	["A1", "B2", "C3"], //diag 1
	["A1", "B1", "C1"], //col 1
	["A2", "B2", "C2"], //col 2
	["A3", "B3", "C3"], //col 3
	["A3", "B2", "C1"]  //other diag
];


var player1 = []; //array where we will stash the squares player 1 has checked
var player2 = []; //array for player2
var someoneWon = false;
var numPlayers = 1;

var options = ["A1", "A2","A3", "B1", "B2", "B3", "C1", "C2", "C3"];

function setNumberOfUsers(x){
	numPlayers = x;
}

function markSquare(square){
	if(someoneWon){
		message.innerHTML = ("Why are you still trying? Someone already won. Time for a new game.");
	}else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)){ 
			//check to see if this square is in either player array. if so, goodbye
			//if BOTH are -1 then it's in neither array
		if(whosTurn == 1){	
			square.innerHTML = "X";
			player1.push(square.id)
			checkWin(player1,1);
			if(numPlayers == 1){
				// this is a one player game. move the computer
				moveComputer();
			}else{
				// this is a two player game. switch control
				whosTurn = 2;
				}
		}else{
			square.innerHTML = "0";
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2,2);
		}
	}else{
		console.log("Something's already there. No cheating!!");
	}
}


function moveComputer(){
	// get a valid square for the computer to markSquare
	// we have the options array which has ALL squares in it
	var valid = false;  // initialize valid to false, change when we have a valid (not-taken) square
	// the code is trapped in this loop until we change valid
	while(!valid){
		var squareNumber = Math.floor(Math.random() * 9);
		// we have a random number between 0 and 8, grab that square out of options and see if player1 or player2 has it
		isInPlayerOne = player1.indexOf(options[squareNumber]);
		isInPlayerTwo = player2.indexOf(options[squareNumber]);
		if((isInPlayerOne == -1) && (isInPlayerTwo == -1)){
			// this square is not in player1 or player2's arrays
			valid = true;
		}else{
				// taken!!
		}
		console.log(squareNumber);	
	}
	document.getElementById(options[squareNumber]).innerHTML = "0";
	whosTurn = 1;
	player2.push(squareNumber);
	checkWin(player2,2);
}

function checkWin(currentPlayersSquares, whoJustMarked){
	var rowCount = 0;
	//loop through the outer array
	for(var i = 0; i < winners.length; i++){
		//loop through each row (inner array)
		rowCount = 0;
		for(var j = 0; j < winners[i].length; j++){
			if(currentPlayersSquares.indexOf(winners[i][j]) > -1){
				//HIT!
				rowCount++;
			}
			console.log(rowCount);
			if(rowCount == 3){
				//BINGO!!
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
	if(player1.length + player2.length == 9){
		gameOver("Draw");
	}
}

function gameOver(whoWon, winningCombo){
	var message = document.getElementById("message");
	if(whoWon == "Draw"){
		message.innerHTML = "Time to reset the game. You had a draw."
	}else{
		message.innerHTML = "Congratulations to player " + whoWon + ". You won with " + winningCombo.join(", ");
		for(var i = 0; i < winningCombo.length; i++){
			document.getElementById(winningCombo[i]).className += " winner";
		}
	}
	someoneWon = true;
}

function reset(){
	for(var i = 0; i < 9; i++){
		document.getElementsByClassName("box")[i].setAttribute("class", "box");	
		document.getElementsByClassName("box")[i].innerHTML = "-";
		document.getElementById("message").innerHTML = "";
		someoneWon = false;
		player1 = [];
		player2 = [];
	}	
}

