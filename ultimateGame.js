class UltimateGame {
  constructor(playerOne, playerTwo) {
    this.board = [[new Board, new Board, new Board],
                  [new Board, new Board, new Board], 
                  [new Board, new Board, new Board]]; 
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

  toCell(index) {
    //1-9 value to 2d cell
    var cells = [[0, 0], [0, 1], [0, 2], 
                [1, 0], [1, 1], [1, 2], 
                [2, 0], [2, 1], [2, 2]]; 
    return cells[index - 1]; 
  } 

  initActiveGame() {
    console.log(this.currentPlayer.name + ", you get to choose which game to play in. ")

    //need something here to display after user tries to play in invalid game
    do {
      var row, column; 
      do {
        row = readline.question("Which row would you like to play in? (1-3)"); 
      } while (!this.validGameInput(row)) 
      do {
        column = readline.question("Which column would you like to play in? (1-3)")
      } while (!this.validGameInput(column))
    } while (this.occupied([row - 1, column - 1])); 

    this.active = [row - 1, column - 1]; 
  }

  setActiveBoard(move) { 
    this.active = this.toCell(move); 
    if (this.getCurrentBoard().isGameOver()) {
      console.log("This board is complete"); 
      this.active = null; 
    }   
  } 

  occupied(cell) {
    var board = this.board[cell[0]][cell[1]]; 
    let occupied = board.isGameOver(); 
    if (occupied) { 
      console.log("This game is complete, pick again."); 
    } 
    return occupied; 
  } 

  validGameInput(move) {
    move = parseInt(move.trim()); 
    if ((move == null) || isNaN(move)) {
      console.log("Null or NaN"); 
      return false 
    } else if (move > 3 || move < 1) {
      console.log("Not in range 1-3"); 
      return false 
    }     
    return true
  } 

  play() {
    while (!this.gameOver()){
      this.takeTurn()

      //switch current player
      this.toggleCurrentPlayer(); 
    }
  } 

  takeTurn() {
    var player = this.currentPlayer; 

    if (this.active == null) {
      this.initActiveGame(); 
    } 
    
    console.log("Your turn, " + player.name); 
    this.print(); 
    var move; 
    do { 
      var move = player.getMove();    
    } while (!this.validMove(move)) 
    this.playMove(move); 
    this.print(); 
    this.setActiveBoard(move); 
  } 

  getCurrentBoard() {
    if (this.active == null) { return null }; 
    return this.board[this.active[0]][this.active[1]];
  } 

  playMove(move) {
    this.getCurrentBoard().set(move, this.currentPlayer.symbol); 
  } 

  validMove(move) {
    move = parseInt(move.trim()); 
    if ((move == null) || isNaN(move)) {
      console.log("Null or NaN"); 
      return false 
    } else if (move > 9 || move < 1) {
      console.log("Not in range 1-9"); 
      return false 
    } else if (this.getCurrentBoard().occupied(move)) {
      console.log("Game board is occupied at position"); 
      return false; 
    } 
    return true
  } 

  isUltimateWin() {
    var board = this.board; 
    var combinations = [ 
      [board[0][0], board[1][0], board[2][0]], 
      [board[0][1], board[1][1], board[2][1]], 
      [board[0][2], board[1][2], board[2][2]], 
      [board[0][0], board[0][1], board[0][2]], 
      [board[1][0], board[1][1], board[1][2]], 
      [board[2][0], board[2][1], board[2][2]], 
      [board[0][0], board[1][1], board[2][2]], 
      [board[0][2], board[1][1], board[2][0]], 
    ]; 

    return this.checkUltimateCombinations(combinations); 
  } 
  
  checkUltimateCombinations(combinations) {
    for (var i = 0; i < combinations.length; i++) {
      if (this.checkUltimateCombination(combinations[i])) {
        return true
      } 
    }; 
    return false; 
  } 

  checkUltimateCombination(combo) {
    if (combo[0].winner == null) {
      return false
    } 
    if (combo[0].winner == combo[1].winner && combo[1].winner == combo[2].winner) {
      return true; 
    } 
    return false; 
  } 

  gameOver() {
    if (this.isUltimateWin()) {
      this.toggleCurrentPlayer(); 
      this.currentPlayer.incrementWins(); 
      console.log("Congrats, " + this.currentPlayer.name + "!! You win. "); 
      return true; 
    } else if (this.isUltimateTie()) {
      console.log("It's a tie!"); 
      return true; 
    } else {
      return false; 
    }
  } 

  isUltimateTie() {
    for (let board of this.board.flat()) {
      if (!board.isGameOver()){
        return false;
      } 
    } 
    return true; 
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
      str += (board.board[line][index]); 
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
 
 