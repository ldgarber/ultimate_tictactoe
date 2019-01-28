const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 

class Board {
  constructor(board) {
    this.board = board;  
  } 

  print() {
     var board = this.board; 
     var printedBoard = 
`${board[0]} | ${board[1]} | ${board[2]}
---------
${board[3]} | ${board[4]} | ${board[5]}
---------
${board[6]} | ${board[7]} | ${board[8]}`

    console.log(printedBoard);  
  } 

  occupied(cell) {
    return (this.board[cell] != " ");  
  } 

  checkCombination(combo) {
    if (combo[0] == " ") {
      return false
    } 
    if (combo[0] == combo[1] && combo[1] == combo[2]) {
      return true; 
    } 
    return false; 
  } 
  
  checkCombinations(combinations) {
    for (var i = 0; i < combinations.length; i++) {
      if (this.checkCombination(combinations[i])) {
        return true
      } 
    }; 
    return false; 
  } 

  isWin() {
    var board = this.board; 
    var combinations = [ 
        [board[0], board[3], board[6]], 
        [board[1], board[4], board[7]], 
        [board[2], board[5], board[8]], 
        [board[0], board[1], board[2]], 
        [board[3], board[4], board[5]], 
        [board[6], board[7], board[8]], 
        [board[0], board[4], board[8]], 
        [board[2], board[4], board[6]]
      ]; 

    return this.checkCombinations(combinations); 
  } 

  isTie() {
    return !(this.board.includes(" ")); 
  } 

  set(index, symbol) {
    this.board[index] = symbol; 
    return this.board; 
  } 
} 

class Game {
  constructor(playerOne, playerTwo) { 
    this.board = new Board([" "," "," "," "," "," "," "," "," "]); 
    this.playerOne = playerOne; 
    this.playerTwo = playerTwo; 
    this.currentPlayer = this.playerOne; 
  } 

  toggleCurrentPlayer() {
    if (this.currentPlayer == this.playerOne) {
      this.currentPlayer = this.playerTwo; 
    } else {
      this.currentPlayer = this.playerOne; 
    } 
  } 

  play() {
    while (!this.gameOver()){
      this.takeTurn()

      //switch current player
      this.toggleCurrentPlayer(); 
    }
  } 

  getWinner() {
    if (this.currentPlayer == this.playerOne) {
      return this.playerTwo; 
    } else {
      return this.playerOne; 
    } 
  } 

  gameOver() {
    if (this.board.isWin()) {
      var winner = this.getWinner(); 
      winner.incrementWins(); 
      this.printBoard(); 
      console.log("You win, " + winner.name + "!! Congratulations " + winner.name); 
      return true; 
    } else if (this.board.isTie()) {
      this.printBoard(); 
      console.log("It's a tie!"); 
      return true; 
    } 
    return false; 
  } 

  printBoard() {
    this.board.print(); 
  }

  takeTurn() {
    var player = this.currentPlayer; 
    console.log("Your turn, " + player.name); 
    this.printBoard(); 
    var move; 
    do { 
      var move = player.getMove();    
    } while (!this.validMove(move)) 
    this.playMove(move); 
  } 

  playMove(move) {
    this.board.set([move - 1], this.currentPlayer.symbol); 
  } 

  validMove(move) {
    move = parseInt(move.trim()); 
    if ((move == null) || isNaN(move)) {
      console.log("Null or NaN"); 
      return false 
    } else if (move > 9 || move < 1) {
      console.log("Not in range 1-9"); 
      return false 
    } else if (this.board.occupied([move - 1])) {
      console.log("Game board is occupied at position"); 
      return false; 
    } 
    return true
  } 
}

class Player {
  constructor(name, symbol) {
    this.symbol = symbol;  
    this.name = name;  
    this.wins = 0; 
  } 

  getMove() {
    return readline.question("Play in any empty square (enter # 1-9)"); 
  } 

  incrementWins() {
    this.wins += 1; 
  } 

  announceWins() {
    console.log(this.name + " won " + this.wins + " times."); 
  } 
}  

class UltimateTicTacToe {
  constructor() {
    this.playerOne = new Player("", "X"); 
    this.playerTwo = new Player("", "O"); 
  } 

  displayTitle() {
    clear(); 
    console.log(
      chalk.yellow(
        figlet.textSync('Tic Tac Toe', { horizontalLayout: 'full' })
      )
    ); 
  }

  getPlayerNames() {
    this.playerOne.name = readline.question("Player One, what is your name? "); 
    this.playerTwo.name = readline.question("Player Two, what is your name? "); 
  } 

  playAgain() {
    var userInput = readline.question("Would you like to play again? Y/n "); 
    if (userInput.toLowerCase() == "y") {
      return true; 
    } else {
      return false; 
    } 
  } 

  rollCredits() {
    console.log(
      chalk.yellow(
        figlet.textSync('Thank You', { horizontalLayout: 'full', font: '3-d' })
      )
    ); 
    console.log(
      chalk.yellow(
        figlet.textSync("* ldgarber 2019 *", { horiontalLayout: 'full' }) 
      )
    ); 
  }

  gameLoop() {
    var keepPlaying; 
    do {
      new Game(this.playerOne, this.playerTwo).play(); 
      keepPlaying = this.playAgain(); 
    } while (keepPlaying)

  } 

  announceWins() {
    this.playerOne.announceWins(); 
    this.playerTwo.announceWins(); 
  } 

  play() {
    this.displayTitle(); 
    this.getPlayerNames(); 
    this.gameLoop(); 
    this.announceWins(); 
    this.rollCredits();   
  } 
} 

new UltimateTicTacToe().play(); 
