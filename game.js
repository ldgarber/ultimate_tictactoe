class Game {
  constructor(playerOne, playerTwo, board) {
    this.board = board; 
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

} 
