(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  Chess.Pieces = {};

  var Piece = Chess.Pieces.Piece = function (options) {
    this.pos = options.pos;
    this.color = options.color;
  };

  Piece.prototype = {
    /* virtual functions
     *
     * We want to be able to check if a piece is a rook, king, or pawn, so that
     * we can check for positions such as en passant, possible castles, etc.
     */
    isKing: function () {
      return false;
    },

    isRook: function () {
      return false;
    },

    isPawn: function () {
      return false;
    }
  };
})();