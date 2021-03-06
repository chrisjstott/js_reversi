var Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  return [Array(8),Array(8),Array(8),
    Array(3).concat([new Piece('white'), new Piece('black')]).concat(Array(3)),
    Array(3).concat([new Piece('black'), new Piece('white')]).concat(Array(3)),
    Array(8),Array(8),Array(8)];
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if (!this.isValidPos(pos)){
    throw new Error("Not on the board!");
  } else {
    return this.grid[y][x];
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  var piece = this.getPiece(pos);
  return piece && color === piece.color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos);
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  var x = pos[0];
  var y = pos[1];
  return (x <= 7 && x >= 0 && y <= 7 && y >= 0);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  var newPos = _addPos(pos,dir);
  if (!board.validPos(newPos)) {
    return null;
  } else if(!board.isOccupied(newPos)) {
    return null;
  } else if (board.isMine(newPos, color)) {
    if(piecesToFlip.length === 0) {
      return null;
    } else {
      return piecesToFlip;
    }
  } else {
    piecesToFlip.push(board.getPiece(newPos));
    _positionsToFlip(board, newPos, color, dir, piecesToFlip);
  }
}

function _addPos(pos,dir) {
  return [pos[0]+dir[0], pos[1]+dir[1]];
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if(!this.validPosition) {
    return false;
  } else if(this.isOccupied(pos)) {
    return false;
  } else {
    for(var i = 0; i < Board.DIRS.length; i++) {
      if(_positionsToFlip(this, pos, color, Board.DIRS[i], []) !== null) {
        return true;
      }
    }
    return false;
  }
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
