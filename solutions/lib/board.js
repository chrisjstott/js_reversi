var Piece = require("./piece");

function _makeGrid () {
  var grid = [];

  for (var i = 0; i < 8; i++) {
    var row = new Array(8);
    grid.push(row);
  }

  // Add initial 4 pieces for Reversi
  grid[3][3] = new Piece("white");
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[4][4] = new Piece("white");

  return grid;
}

function Board () {
  this.grid = _makeGrid();
}

Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw "Not valid pos!";
  }

  return this.grid[pos[0]][pos[1]];
};

Board.prototype.isFull = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var piece = this.getPiece([i, j]);
      if (!piece) { return false; }
    }
  }

  return true;
};

Board.prototype.isMine = function (color, pos) {
  var piece = this.getPiece(pos);
  return piece && piece.color === color;
};

Board.prototype.isValidPos = function (pos) {
  return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8);
};

Board.prototype.print = function () {
  this.grid.forEach(function (row, i) {
    var rowString = " " + i + " |";

    for (var j = 0; j < 8; j++) {
      rowString += (row[j] ? "." row[j].toString());
    };

    console.log(rowString);
  });
};

module.exports = Board;
