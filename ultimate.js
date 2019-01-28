const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 


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



class Game {
  constructor(playerOne, playerTwo) {
    var board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]]; 
    this.board = [[board, board, board],[board, board, board], [board, board, board]]; 
    this.active = null;  
    this.verticalDivider = chalk.red("  |  "); 
    this.horizontalDivider = chalk.red("---------------------------------------"); 
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

  initActiveGame() {
    console.log(this.currentPlayer.name + ", you get to choose which game to start off in. ")
    var row = readline.question("Which row would you like to play in? (1-3)")
    var column = readline.question("Which column would you like to play in? (1-3)")
    //need validation here!! 
    this.active = [row - 1, column - 1]; 
  }

  play() {
    this.initActiveGame(); 
    while (!this.gameOver()){
      this.takeTurn()

      //switch current player
      this.toggleCurrentPlayer(); 
    }
  } 

  takeTurn() {
    var player = this.currentPlayer; 
    console.log("Your turn, " + player.name); 
    this.print(); 
    var move; 
    do { 
      var move = player.getMove();    
    } while (!this.validMove(move)) 
    this.playMove(move); 
  } 

  //todo 
  playMove(move) {
    return true; 
  } 

  //todo
  validMove(move) {
    return true; 
  } 

  //todo
  gameOver() {
    return false; 
  } 

  print() {
    for (var i = 0; i < 3; i++) {
      this.printRowOfGames(i); 
      if (i != 2) { console.log(this.horizontalDivider) }
    } 
  } 

  printRowOfGames(gameRow) {
    var activeRow; 
    if (gameRow == this.active[0]) {activeRow = true;} 
    for (var i = 0; i < 3; i++) {
      console.log(this.getFullLine(i, this.board[gameRow], activeRow)); 
      if (i != 2) {
        this.printHorizontalDividerRow(activeRow); 
      }
    } 
  }

  getFullLine(line, game, activeRow=false) {
    var activeColumn; 
    if (activeRow) { activeColumn = this.active[1]; } 
    var str = " "; 
    for (var i = 0; i < 3; i++) {
      if (i == activeColumn) { 
        str += this.getLine(line, game[i], true); 
      } else { 
        str += this.getLine(line, game[i], false); 
      }
      if (i != 2) { str += this.verticalDivider }; 
    } 
    return str;
  } 

  //get one line of one  board (line 0-2)
  getLine(line, board, selected=false) {
    var str = "";  
    for (var index = 0; index < 3; index++) {
      str += (board[line][index]); 
      if (index != 2) {
        str += " | "; 
      } 
    }
    return (selected) ? chalk.blue(str) : str; 
  } 

  printHorizontalDividerRow(activeRow=false) {
    if (!activeRow) {
      console.log(" ---------" + this.verticalDivider + "---------" + this.verticalDivider + "--------- ");  
    } else {
      var str = " "; 
      for (var i = 0; i < 3; i++) {
        if (i == this.active[1]) {
          str += chalk.blue("---------"); 
        } else {
          str += "---------"; 
        } 
        if (i != 2) {
          str += this.verticalDivider; 
        } 
      } 
      console.log(str); 
    } 
  } 
};
 
 

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
