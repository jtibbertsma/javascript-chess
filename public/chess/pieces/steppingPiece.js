(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.Piece === "undefined") {
    throw "missing dependency";
  }

  var SteppingPiece = Chess.Pieces.SteppingPiece = function () {

  };
})();