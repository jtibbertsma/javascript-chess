(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.SteppingPiece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('Knight', 'SteppingPiece', {
    moveDirs: function () {
      return [
        [-2,-1], [-1,-2], [-1,2], [2,-1], [2,1], [1,2], [1,-2], [-2,1]
      ];
    },

    _symbol: 'N'
  });
})();