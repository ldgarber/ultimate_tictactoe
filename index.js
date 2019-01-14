const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 

printBoard = (board) => {
  printedBoard = 
`${board[0]} | ${board[1]} | ${board[2]}
---------
${board[3]} | ${board[4]} | ${board[5]}
---------
${board[6]} | ${board[7]} | ${board[8]}`

  console.log(printedBoard); 
}


clear(); 
console.log(
  chalk.yellow(
    figlet.textSync('Tic Tac Toe', { horizontalLayout: 'full' })
  )
); 
//starting the game: print empty board
const game = {
  board: [" "," "," "," "," "," "," "," "," "],  
} 

const playerOne = {
  symbol: "X", 
  name: ""
} 
const playerTwo = {
  symbol: "O", 
  name: ""
}

playerOne.name = readline.question("Player One, what is your name? "); 
playerTwo.name = readline.question("Player Two, what is your name? "); 

var currentPlayer = playerOne; 

validMove = (move) => {
  move = parseInt(move.trim()); 
  console.log(move); 
  if ((move == null) || isNaN(move)) {
    console.log("null or NaN"); 
    return false 
  } else if (move > 9 || move < 1) {
    console.log("not in range 1-9"); 
    return false 
  } else if (game.board[move - 1] != " ") {
    console.log("game board is occupied at position"); 
    return false; 
  } 
  return true
} 

playMove = (move, currentPlayer, game) => {
  game.board[move - 1] = currentPlayer.symbol; 
} 

takeTurn = (currentPlayer) => {
  console.log("Your turn, " + currentPlayer.name); 
  printBoard(game.board); 

  move = readline.question("Play in any empty square (enter # 1-9)"); 
  while (!validMove(move)) {
    move = readline.question("Move not valid. Please enter a digit between 1-9"); 
  } 
  playMove(move, currentPlayer, game); 
} 

takeTurn(currentPlayer); 
currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne; 
takeTurn(currentPlayer); 

