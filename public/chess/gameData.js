(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var GameData = Chess.GameData = function (options) {
    this.board = options && options.board;
    this.moves = [];
    this.capturedWhites = [];
    this.capturedBlacks = [];
  };
})();