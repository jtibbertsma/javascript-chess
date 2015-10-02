(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.SteppingPiece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('King', 'SteppingPiece', {
    isKing: function () {
      return true;
    },

    moveDirs: function () {
      return [
        [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]
      ]
    }
  });
})();