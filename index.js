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

isTie = ( board ) => {
  return !(board.includes(" ")); 
} 

checkCombination = ( combo ) => {
  if (combo[0] == " ") {
    return false
  } 
  if (combo[0] == combo[1] && combo[1] == combo[2]) {
    return true; 
  } 
  return false; 
} 

isWin = ( board ) => {
  var won = false; 
  combinations = [ 
    [board[0], board[3], board[6]], 
    [board[1], board[4], board[7]], 
    [board[2], board[5], board[8]], 
    [board[0], board[1], board[2]], 
    [board[3], board[4], board[5]], 
    [board[6], board[7], board[8]], 
    [board[0], board[4], board[8]], 
    [board[2], board[4], board[6]]
  ]; 

  combinations.forEach(function(combination) {
    if (checkCombination(combination) == true) { 
      won = true; 
      return; 
    } 
  }); 

  return won; 
} 

gameOver = (game) => {
  if (isWin(game.board)) {
    printBoard(game.board); 
    console.log(otherPlayer.name + " won!! Congrats " + otherPlayer.name); 
    return true; 
  } else if (isTie(game.board)) {
    printBoard(game.board); 
    console.log("It's a tie!"); 
    return true; 
  } 
  return false; 
} 

displayTitle = () => {
  clear(); 
  console.log(
    chalk.yellow(
      figlet.textSync('Tic Tac Toe', { horizontalLayout: 'full' })
    )
  ); 
}

getPlayerNames = () => {
  playerOne.name = readline.question("Player One, what is your name? "); 
  playerTwo.name = readline.question("Player Two, what is your name? "); 
} 

playGame = () => {
  var currentPlayer = playerOne; 
  var otherPlayer = playerTwo; 
  while (!gameOver(game)){
    takeTurn(currentPlayer); 

    //switch current player
    currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne; 
    otherPlayer = (otherPlayer == playerOne) ? playerTwo : playerOne; 
  }
} 

playAgain = () => {
  playAgain = readline.question("Would you like to play again? Y/n "); 
  if (playAgain.toLowerCase() == "y") {
    return true; 
  } else {
    return false; 
  } 
} 

rollCredits = () => {
  clear(); 
  console.log(
    chalk.yellow(
      figlet.textSync('Thank You', { horizontalLayout: 'full', font: '3-d' })
    )
  ); 
  console.log(
    chalk.red(
      "Copyright Leah Garber 2019" 
    )
  ); 
}

ultimateTicTacToe = () => {
  displayTitle(); 
  getPlayerNames(); 
  while (newGame = true) {
    playGame(); 
    newGame = playAgain(); 
  } 
  rollCredits();   
} 

ultimateTicTacToe(); 
