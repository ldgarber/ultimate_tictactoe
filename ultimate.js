const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 


class Game {
  constructor() {
    var board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]]; 
    this.board = [[board, board, board],[board, board, board], [board, board, board]]; 
    this.active = null;  
    this.verticalDivider = chalk.red("  |  "); 
    this.horizontalDivider = chalk.red("---------------------------------------"); 
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
 
/* 
//get one line of one  board (line 0-2)
getLine = (line, board, selected=false) => {
  var str = "";  
  for (var index = 0; index < 3; index++) {
    str += (board[line][index]); 
    if (index != 2) {
      str += " | "; 
    } 
  }
  return (selected) ? chalk.blue(str) : str; 
} 

//get full line of 3 boards in a row
getFullLine = (line, game, activeRow=false, active) => {
  var activeColumn; 
  if (activeRow) { activeColumn = active[1]; } 
  var str = " "; 
  for (var i = 0; i < 3; i++) {
    if (i == activeColumn) { 
      str += getLine(line, game[i], true); 
    } else { 
      str += getLine(line, game[i], false); 
    }
    if (i != 2) { str += verticalDivider }; 
  } 
  return str; 
} 

printRowOfGames = (game, gameRow) => {
  var activeRow; 
  if (gameRow == game.active[0]) {activeRow = true;} 
  for (var i = 0; i < 3; i++) {
    console.log(getFullLine(i, game.board[gameRow], activeRow, game.active)); 
    if (i != 2) {
      printHorizontalDividerRow(activeRow); 
    }
  } 
} 
 
printHorizontalDividerRow = (activeRow=false) => {
  if (!activeRow) {
    console.log(" ---------" + verticalDivider + "---------" + verticalDivider + "--------- ");  
  } else {
    var str = " "; 
    for (var i = 0; i < 3; i++) {
      if (i == game.active[1]) {
        str += chalk.blue("---------"); 
      } else {
        str += "---------"; 
      } 
      if (i != 2) {
        str += verticalDivider; 
      } 
    } 
    console.log(str); 
  } 
}  

verticalDivider = chalk.red("  |  "); 

//big horizontal divider
horizontalDivider = chalk.red("---------------------------------------");  

printGame = (game) => {
  for (var i = 0; i < 3; i++) {
    printRowOfGames(game, i); 
    if (i != 2) { console.log(horizontalDivider) }
  } 
} 

*/ 

initGame = (game) => {
  var row = readline.question("Which row would you like to play in? (1-3)")
  var column = readline.question("Which column would you like to play in? (1-3)")
  game.active = [row - 1, column - 1]; 
} 

start = () => {
  var game = new Game(); 
  initGame(game); 
  game.print(); 
} 

start(); 

