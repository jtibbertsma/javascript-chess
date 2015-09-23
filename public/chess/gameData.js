(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var GameData = Chess.GameData = function () {
    this.board = new Chess.Board();
  };
})();