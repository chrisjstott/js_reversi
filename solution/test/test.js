var assert = require("assert");
var Board = require("../lib/board.js");
var Piece = require("../lib/piece.js");
var Game = require("../lib/game.js");

describe("Piece", function () {
  var darkPiece,
      lightPiece;

  beforeEach(function () {
    darkPiece = new Piece("black");
    lightPiece = new Piece("white");
  });

  describe("#color", function () {
    it("should have the color assigned to it", function () {
      assert.equal(darkPiece.color, "black");
      assert.equal(lightPiece.color, "white");
    });
  });

  describe("#flip", function () {
    it("should switch colors when flipped", function () {
      darkPiece.flip();
      assert.equal(darkPiece.color, "white");
      lightPiece.flip();
      assert.equal(lightPiece.color, "black");
    });
  });

  describe('#toString', function () {
    it('should return a letter representing the color', function() {
      assert.equal(lightPiece.toString(), 'W');
      assert.equal(darkPiece.toString(), 'B');
    });
  });
});

describe("Board", function () {
  var testBoard;

  beforeEach(function () {
    testBoard = new Board();
  });

  describe("#grid", function () {
    it("should be 8x8", function () {
      assert.equal(testBoard.grid.length, 8);
      for(var i = 0; i < 8; i ++){
        assert.equal(testBoard.grid[i].length, 8);
      }
    });

    it("should begin with 4 pieces in the center", function () {
      assert.equal(testBoard.grid[3][3].color, "white");
      assert.equal(testBoard.grid[3][4].color, "black");
      assert.equal(testBoard.grid[4][3].color, "black");
      assert.equal(testBoard.grid[4][4].color, "white");
    });

    it("should start out empty except for the 4 center pieces", function () {
      testBoard.grid.forEach(function (row, i) {
        row.forEach(function (spot, j) {
          if ((i !== 3 && i !== 4) && (j !== 3 && j !== 4)) {
            assert.equal(spot, undefined);
          }
        });
      });
    });
  });

  describe('#getPiece', function () {
    // TODO
    it('should return a piece for an occupied position', function () {
      assert(testBoard.getPiece([3, 4]) instanceof Piece, true);
    });
  });

  describe('#hasMove', function () {
    // TODO
  });

  describe("#isFull", function () {
    it("should not begin full", function () {
      var anotherBoard = new Board();
      assert.equal(anotherBoard.isFull(), false);
    });

    it("should be full if no spots are empty", function () {
      // Fill the board for the test
      for (var i = 0; i < 8; i ++) {
        for (var j = 0; j < 8; j ++) {
          testBoard.grid[i][j] = new Piece("white");
        }
      }

      // Test fullness
      assert.equal(testBoard.isFull(), true);
    });
  });

  describe('#isMine', function() {
    // TODO
  });

  describe('#isOver', function () {
    // TODO
  });

  describe('#isValidPos', function () {
    // TODO
  });

  describe.only("#placePiece", function () {
    var testBoard;
    beforeEach(function () {
      testBoard = new Board();
    });

    it("should allow a player to make a valid move", function(){
      testBoard.placePiece([2, 3], "black");
      assert.equal(testBoard.grid[2][3].color, "black");
    });

    it("should flip captured pieces", function(){
      testBoard.placePiece([2, 3], "black");
      assert.equal(testBoard.grid[3][3].color, "black");
    });

    it("should not allow a piece on top of another piece", function () {
      function makeBadMove () {
        testBoard.placePiece([3, 2], "white");
      }

      assert.throws(makeBadMove, Error, "Invalid Move");
    });

    it("should not allow a move that doesn't capture", function () {
      function makeBadMove () {
        testBoard.placePiece([2, 3], "white");
      }

      assert.throws(makeBadMove, Error, "Invalid Move");
    });

    it("should not allow moves that isolate pieces", function () {
      function makeOtherBadMove () {
        testGame.placePiece([0, 0], "white");
      }

      assert.throws(makeOtherBadMove, Error, "Invalid Move");
    });
  });

  describe('#validMove', function () {
    // TODO
  });

  describe('#validMoves', function () {
    // TODO
  });
});

describe("Game", function () {
  describe('#board', function () {
    // TODO
  });

  describe("players taking turns", function () {
    var anotherGame = new Game();

    it("should require black to take first turn", function () {
      assert.equal(anotherGame.currentPlayer, "black");
    });

    it("should switch players after one takes a turn", function () {
      anotherGame.placePiece([[2, 3], "black"]);
      assert.equal(anotherGame.currentPlayer, "white");
    });
  });
});
