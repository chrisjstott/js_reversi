var runGame = function () {
  var Game = require("./game.js");
  myGame = new Game();
  myGame.runLoop();
};

runGame();
