class NormalGame {
  constructor(playerOne, playerTwo) { 
    this.board = new Board(); 
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
    this.board.set(move, this.currentPlayer.symbol); 
  } 

  validMove(move) {
    move = parseInt(move.trim()); 
    if ((move == null) || isNaN(move)) {
      console.log("Null or NaN"); 
      return false 
    } else if (move > 9 || move < 1) {
      console.log("Not in range 1-9"); 
      return false 
    } else if (this.board.occupied(move)) {
      console.log("Game board is occupied at position"); 
      return false; 
    } 
    return true
  } 
}



