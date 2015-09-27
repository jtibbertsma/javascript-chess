(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  Chess.Pieces = {};

  var Piece = Chess.Pieces.Piece = function (options) {
    this.pos = options.pos;
    this.color = options.color;

    this._moves = 0;
  };

  Piece.prototype = {
    /* virtual functions
     *
     * We want to be able to check if a piece is a king or pawn, so that
     * we can check for positions such as en passant, possible castles, etc.
     */
    isKing: function () {
      return false;
    },

    isPawn: function () {
      return false;
    },

    /* move
     *
     * Move the piece to a new position. From the piece's perspective, this
     * means changing the piece's pos property.
     */
    move: function (pos) {
      this._moves += 1;
      this.pos = pos;
    },

    /* unMove
     *
     * Used by Game.undoLastMove so that a piece can keep track of whether it's
     * moved or not.
     */
    unMove: function () {
      // Why decrement _moves by 2, you ask? In Game, the piece will be moved,
      // and then when the move is undone, the piece will be moved again, back
      // to its original position. So we need to decrement by 2 to return the
      // piece to it's original state, allowing us to track if the piece has
      // been moved.
      this._moves -= 2;
    },

    /* moved
     *
     * Return true if the piece has been moved.
     */
    moved: function () {
      return this._moves !== 0;
    }
  };
})();