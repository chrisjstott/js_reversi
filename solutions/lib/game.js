var Piece = require("./piece.js");
var Board = require("./board.js");

function Game () {
  this.board = new Board();
};

Game.prototype.runLoop = function () {
  // TODO: Fill this out.
};

module.exports = Game;
