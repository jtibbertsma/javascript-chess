(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.Piece === "undefined") {
    throw "missing dependency";
  }

  var Pawn = Chess.Pieces.Pawn = function (options) {
    this.parentClass(options);
  };

  Chess.Util.extendo(Pawn, Chess.Pieces.Piece, {
    validMoves: function () {
      return [];
    }
  });
})();