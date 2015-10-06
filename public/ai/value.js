(function () {
  if (typeof AI === "undefined") {
    AI = {};
  }

  AI.value = function (piece) {
    if (piece.constructor === Chess.Pieces.Pawn) {
      return 1;
    } else if (piece.constructor === Chess.Pieces.Bishop) {
      return 3;
    } else if (piece.constructor === Chess.Pieces.Rook) {
      return 5;
    } else if (piece.constructor === Chess.Pieces.Knight) {
      return 3;
    } else if (piece.constructor === Chess.Pieces.Queen) {
      return 10;
    }
    throw "Bad piece";
  };
})();