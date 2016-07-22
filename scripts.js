// N Sized Version

var whosTurn = 1; //start off on player 1's turn

// 1. Build a winners array

var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
var winners = [];
var gridSize = 8;
var diag1 = [];
var diag2 = [];

// a0, a1, a2, a3, a4, ... aN
// b0, b1, b2, b3, b4, ... bN

for(var i = 0; i < gridSize; i++){
	diag1.push(alph[i] + (gridSize - i)); // diag 1
	diag2.push(alph[i] + i); // diag 2
	var winnersInsideH = [];
	var winnersInsideV = [];
	for(var j = 0; j < gridSize; j++){
		// vertical winners
		winnersInsideH.push(alph[j] + i); 
		// horizontal winners
		winnersInsideV.push(alph[i] + j); 
	}
	winners.push(winnersInsideH);
	winners.push(winnersInsideV);
}

winners.push(diag1);
winners.push(diag2);

// 2. We need to populate the board
var htmlForTheBoard = "";
var boxWidth = (100 / gridSize) - (gridSize - 1);

for(var i = 0; i<gridSize; i++){
	htmlForTheBoard += '<div class="board-row-' + i + ' board-row">';
		for(var j = 0; j<gridSize; j++){
			htmlForTheBoard += '<button id=" ' + alph[i] + j + '" class="box" style="width:'+boxWidth+'%" onclick="markSquare(this)">-</button>';
		}
	htmlForTheBoard += '</div>';
}

document.getElementsByClassName('game-wrapper')[0].innerHTML = htmlForTheBoard;


var player1 = []; //array where we will stash the squares player 1 has checked
var player2 = []; //array for player2
var someoneWon = false;
var computer = false;
var attemptedMove;

var victory = false;

var aiActivated;

function activateAi() {
	aiActivated = true;
}

function markSquare(square){
	if(someoneWon){
		message.innerHTML = ("Why are you still trying? Someone already won. Time for a new game.");
	}
	//check to see if this square is in either player array. if so, goodbye
	else if((player1.indexOf(square.id) == -1) && (player2.indexOf(square.id) == -1)){ //look in player1 array for this square, look in player2 array for this square
			//if BOTH are -1 then it's in neither array
		if(whosTurn == 1){
			square.innerHTML = "X";
			whosTurn = 2;
			player1.push(square.id);
			checkWin(player1,1);
				if((aiActivated) && (player1.length < 5)) {
				executeAiMove(aiMove());
				console.log(aiMove());
				whosTurn = 1;
				player2.push(aiMove());
				checkWin(player2, 2);
				// if((computer) && (player1.length < 5)){ //determines if this is one player mode and gets computer to play
				// 	var pick = compOptions(square);
				// 	document.getElementById(pick).innerHTML = "0";
				// 	player2.push(pick);
				// 	whosTurn = 1;
				// 	checkWin(player2,2);
		}else{
			square.innerHTML = "0";
			whosTurn = 1;
			player2.push(square.id);
			checkWin(player2,2);
		}
		
		console.dir(player2);
	}else{
		console.log("Something's already there. No cheating!!");
		}
	}
}

// function withComputer() {
// 	computer= true;
// }

// var options = ["A1", "A2","A3", "B1", "B2", "B3", "C1", "C2", "C3"];

// function compOptions(square){

// 	var pick;
// 	var valid = false;
// 	while(!valid){
// 		pick = Math.floor(Math.random() * 9);
// 		pick = options[pick];
// 		if((player1.indexOf(square.id) == -1) && (player2.indexOf(pick) == -1)){
// 			valid = true;
// 		}
// 	return pick;
// 	}
// }

// function aiMove(){
    
//     function getMove(){
//         var moveChoice1 = Math.floor(Math.random() * 8);
//         var moveChoice2 = Math.floor(Math.random() * 3);
//         var move = winners[moveChoice1][moveChoice2];
//         return move;
//     }
//     var validMove = false;
//     var attemptedMove;

//     while (validMove === false) {

//         var attemptedMove = getMove();
//         if ((player1.indexOf(attemptedMove) == -1) && (player2.indexOf(attemptedMove) == -1)) {
//             validMove = true;
//         }
//     }
//     if (validMove){
//         return attemptedMove;
//     }
// }

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
			if(rowCount == gridSize){
				//BINGO!!
				gameOver(whoJustMarked, winners[i]);
			}
		}
	}
}

function gameOver(whoWon, winningCombo){
	var message = document.getElementById("message");
	message.innerHTML = "Congratulations to player " + whoWon + ". You won with " + winningCombo.join(", ");
	for(var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += " winner";
	}
	someoneWon = true;
}

function reset(){
	for(var i = 0; i < 9; i++){
	document.getElementsByClassName("box")[i].setAttribute("class", "box");	
	document.getElementsByClassName("box")[i].innerHTML = "-";
	document.getElementById("message").innerHTML = "";
	}	
}

function aiMove() {
	
	function moveGet() {
		var move1 = Math.floor(Math.random() * 8);
		var move2 = Math.floor(Math.random() * 3);
		var move = winners[move1][move2];	
		return move;
	}
	var validMove = false
	var attemptedMove;

	while (validMove === false) {
		// statement
		var attemptedMove = moveGet();
		if ((player1.indexOf(attemptedMove) == -1) && (player2.indexOf(attemptedMove) == -1)) {
			validMove = true;
		}
	}
	if (validMove){
		console.log(attemptedMove);
		return attemptedMove;
	}
}

function executeAiMove(aiMove) {
	var buttonGrab = document.getElementById(aiMove);
	console.log(aiMove());
	buttonGrab.click();
}