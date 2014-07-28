var Piece = require("./piece");

function _makeGrid () {
}

function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

Board.prototype.getPiece = function (pos) {
};

Board.prototype.hasMove = function (color) {
};

Board.prototype.isFull = function () {
};

Board.prototype.isMine = function (pos, color) {
};

Board.prototype.isOccupied = function (pos) {
};

Board.prototype.isOver = function () {
}

Board.prototype.isValidPos = function (pos) {
};

function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
}

Board.prototype.placePiece = function (pos, color) {
};

Board.prototype.print = function () {
};

Board.prototype.validMove = function (pos, color) {
};

Board.prototype.validMoves = function (color) {
};

module.exports = Board;
