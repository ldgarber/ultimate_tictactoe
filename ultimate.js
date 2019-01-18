const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 

board = [["X", " ", " "],[" ", "O", " "],["O", " ", "X"]]; 
board2 = [[" ", "O", " "], ["X", " ", "O"], ["X"," "," "]]; 

game = [[board, board, board2],[board, board2, board], [board2, board, board2]];
const active = [2, 1]; 
 

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
getFullLine = (line, game, activeRow=false) => {
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
  if (gameRow == active[0]) {activeRow = true;} 
  for (var i = 0; i < 3; i++) {
    console.log(getFullLine(i, game[gameRow], activeRow)); 
    if (i != 2) {
      console.log(" ---------" + verticalDivider + "---------" + verticalDivider + "--------- "); 
    }
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

printGame(game); 
