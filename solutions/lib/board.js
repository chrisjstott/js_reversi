var Piece = require("./piece.js");

function _makeGrid () {
  var grid = []
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
};

function Board () {
  this.grid = _makeGrid();
};

Board.prototype.full = function () {
  var pieces = [];

  for (var i = 0; i < 8; i++){
    for (var j = 0; j < 8; j++){
      var piece = this.grid[i][j];
      if (piece) {
        pieces.push(piece);
      }
    }
  }

  return (pieces.length === 64);
};

Board.prototype.each = function (callback){
  this.grid.forEach(function (row, i) {
    for (var j = 0; j < 8; j++) {
      callback(row[j], [i, j]);
    }
  });
};

Board.prototype.print = function () {
  this.grid.forEach(function (row, i) {
    var rowString = " "+i+" |";

    for (var j = 0; j < 8; j++) {
      if (typeof row[j] === 'undefined') {
        rowString += " _ ";
      } else {
        rowString += " " + row[j].toString() + " ";
      }
    };

    console.log(rowString);
  });
};

Board.prototype.getPiece = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

Board.prototype.isMine = function (color, pos) {
  if ((typeof this.getPiece(pos)) !== 'undefined') {
    return (this.getPiece(pos).color === color);
  }

  return false;
};

Board.prototype.offBoard = function (pos) {
  return (pos[0] > 7 || pos[0] < 0 || pos[1] > 7 || pos[1] < 0);
};

module.exports = Board;
