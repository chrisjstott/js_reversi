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

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

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

Board.prototype.isMine = function (pos, color) {
  var piece = this.getPiece(pos);
  return piece && piece.color === color;
};

Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos);
};

Board.prototype.isValidPos = function (pos) {
  return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8);
};

Board.prototype.print = function () {
  for (var i = 0; i < 8; i++) {
    var rowString = " " + i + " |";

    for (var j = 0; j < 8; j++) {
      var pos = [i, j];
      rowString +=
        (this.getPiece(pos) ? "." this.getPiece(pos).toString());
    }

    console.log(rowString);
  });
};

Board.prototype.validMove = function (color, pos) {
  if (this.isOccupied(pos)) {
    return false;
  }

  var validMoveDir = (function (color, pos, dir) {
    var nextPos = [pos[0] + dir[0], pos[1] + dir[1]];

    if (!this.isValidPos(nextPos)) {
      return false;
    } else if (!this.isOccupied(nextPos)) {
      return false;
    } else if (this.isMine(nextPos, color)) {
      return true;
    } else {
      // Recursion FTW!
      return validMoveDir(color, nextPos, dir);
    }
  }).bind(this);

  for (var i = 0; i < Board.DIRS.length; i++) {
    if (validMoveDir(color, pos, Board.DIRS[i])) {
      return true;
    }
  }

  return false;
};

Board.prototype.validMoves = function (color) {
  var validMovesList = [];

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (this.validMove(color, [i, j])) {
        validMovesList.push([i, j]);
      }
    }
  }

  return validMovesList;
};


module.exports = Board;
