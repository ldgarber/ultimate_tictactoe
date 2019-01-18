const chalk = require('chalk'); 
const clear = require('clear'); 
const figlet = require('figlet'); 
const readline = require('readline-sync'); 

board = [["X", " ", " "],[" ", "O", " "],["O", " ", "X"]]; 
board2 = [[" ", "O", " "], ["X", " ", "O"], ["X"," "," "]]; 

game = [[board, board, board2],[board, board2, board], [board2, board, board2]]

//get one line of a board (line 0-2)
getLine = (line, board) => {
  var str = ""; 
  for (var index = 0; index < 3; index++) {
    str += (board[line][index]); 
    if (index != 2) {
      str += " | "; 
    } 
  }
  return str; 
} 

//get full line for top 3 games
getFullLine = (line, game) => {
  var str = " "; 
  str += (getLine(line, game[0]) + verticalDivider);
  str += (getLine(line, game[1]) + verticalDivider); 
  str += (getLine(line, game[2])); 
  return str; 
} 

printLineOfGames = (gameRow) => {
  console.log(getFullLine(0, game[gameRow])); 
  console.log(" ---------" + verticalDivider + "---------" + verticalDivider + "--------- "); 
  console.log(getFullLine(1, game[gameRow])); 
  console.log(" ---------" + verticalDivider + "---------" + verticalDivider + "--------- "); 
  console.log(getFullLine(2, game[gameRow]));  
} 

//big board divider
verticalDivider = chalk.red("  |  "); 

//big horizontal divider
horizontalDivider = chalk.red("---------------------------------------"); 

printGame = (game) => {
  printLineOfGames(0); 
  console.log(horizontalDivider); 

  printLineOfGames(1); 
  console.log(horizontalDivider); 

  printLineOfGames(2); 

} 

printGame(game); 
