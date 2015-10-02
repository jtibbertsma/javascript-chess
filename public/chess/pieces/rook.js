(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.SlidingPiece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('Rook', 'SlidingPiece', {
    moveDirs: function () {
      return [
        [-1,0], [0,1], [1,0], [0,-1]
      ];
    }
  });
})();