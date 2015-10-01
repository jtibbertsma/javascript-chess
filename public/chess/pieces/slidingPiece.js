(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.Piece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('SlidingPiece', 'Piece', {
    // validMoves: function () {
    //   var dirs = this.moveDirs(),
    //       moves = [];

    //   for (var i = 0; i < dirs.length; ++i) {
        
    //   }
    // }
  });
})();