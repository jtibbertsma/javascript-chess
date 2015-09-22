(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Game = Chess.Game = function () {
    this.board = new Chess.Board();
  };
})();