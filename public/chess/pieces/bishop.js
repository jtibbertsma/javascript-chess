(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.SlidingPiece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('Bishop', 'SlidingPiece', {
    moveDirs: function () {
      return [
        [-1,-1], [-1,1], [1,-1], [1,1]
      ];
    },

    _symbol: 'B'
  });
})();