var readline = require("readline");
var Piece = require("./piece.js");
var Board = require("./board.js");

function Game () {
  this.board = new Board();
  this.turn = "black";
};

Game.prototype._flipTurn = function () {
  this.turn = (this.turn == "black") ? "white" : "black";
};

// Dreaded global state!
var rlInterface;
Game.prototype.play = function () {
  rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  this.runLoop(function () {
    rlInterface.close();
    rlInterface = null;
  });
};

Game.prototype.playTurn = function (callback) {
  this.board.print();
  rlInterface.question(
    this.color + ", where do you want to move?",
    handleResponse.bind(this)
  );

  function handleResponse (answer) {
    var pos = JSON.parse(answer);
    if (!this.board.validMove(pos, this.turn) {
      console.log("Invalid move!");
      this.playTurn();
      return;
    }

    this.placePiece(pos, this.turn);
    this._flipTurn();
    callback();
  });
};

Game.prototype.runLoop = function (overCallback) {
  if (this.board.isOver()) {
    console.log("The game is over!");
    overCallback();
  } else if (!this.board.hasMove(this.turn)) {
    console.log(this.turn + " has no move!");
    this._flipTurn();
    this.runLoop();
  } else {
    this.playMove(this.runLoop.bind(this));
  }
};

module.exports = Game;
