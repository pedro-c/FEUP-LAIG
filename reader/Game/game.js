function Game(scene){

  this.gameBoard = new Board(scene,8,4);
  this.gameHistory = new GameHistory(scene);

  this.playing = 'player1'; //Para saber que jogador faz a jogada
  this.firstBot = false;
  this.secondBot = false;
  this.firstPlayerPoints=0;
  this.secondPlayerPoints=0;
  this.readyToMakeAMove=0;
  this.currentValidMoves=[];
  this.firstCell=new Point2D(-1,-1);
  this.secondCell=new Point2D(-1,-1);
  this.switchTurn = false;

}

Game.prototype.initGame = function(){

};

Game.prototype.movePiece=function(){

  if(this.readyToMakeAMove){
    var validMove = this.gameBoard.movePiece(this.currentValidMoves,this.playing);
    if(validMove){
      this.firstPlayerPoints=this.gameBoard.playerOnePoints;
      this.secondPlayerPoints=this.gameBoard.playerTwoPoints;

      console.log("player one points:");
      console.log(this.firstPlayerPoints);
      console.log("player two points:");
      console.log(this.secondPlayerPoints);
      if(this.playing==='player2')
      {
        this.playing='player1';
      }
      else if(this.playing==='player1')
      {
        this.playing='player2';
      }
    }
    this.readyToMakeAMove=0;
  }

};


Game.prototype.display = function(){
  this.gameBoard.display();
};

Game.prototype.update = function(currTime){

  this.gameBoard.update(currTime-this.lastTime);

  var selectedCell = this.gameBoard.verifyMovementBoard(this.playing);

  if(selectedCell == 1){
    console.log(this.playing);
    this.readyToMakeAMove=0;

    var tempBoard = this.gameBoard.getBoard();
    var request = 'validMoves([' + tempBoard + '],' + this.gameBoard.board[this.gameBoard.currY][this.gameBoard.currX].type + ',' + this.gameBoard.currX + ',' + this.gameBoard.currY + ',' + this.playing + ')';
    getPrologRequest(request, this.updateValidMoves.bind(this));

  }else if(selectedCell == 2){
    this.readyToMakeAMove=1;
    this.movePiece();

    //retira comentario para animar a camera
    //this.switchTurn=true;
  }


};

Game.prototype.updateValidMoves = function(moves){
  this.currentValidMoves = JSON.parse(moves.target.response);
  for(var i=0; i<this.currentValidMoves.length;i++){
    this.gameBoard.board[this.currentValidMoves[i][3]][this.currentValidMoves[i][2]].setSelected();
  }

};