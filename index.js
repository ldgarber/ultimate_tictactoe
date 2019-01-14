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
var game = {
  board: [" "," "," "," "," "," "," "," "," "],  
} 

var playerOne = {
  symbol: "X", 
  name: ""
} 
var playerTwo = {
  symbol: "O", 
  name: ""
}

playerOne.name = readline.question("Player One, what is your name? "); 
playerTwo.name = readline.question("Player Two, what is your name? "); 

var currentPlayer = playerOne; 
console.log("Your turn, " + playerOne.name); 
printBoard(game.board); 
