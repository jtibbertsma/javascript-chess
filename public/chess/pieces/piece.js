(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  Chess.Pieces = {};

  var Piece = Chess.Pieces.Piece = function (options) {
    this.pos = options.pos;
    this.color = options.color;
    this.setSymbol();

    this._moves = 0;
  };

  Piece.prototype = {
    /* setSymbol
     *
     * Used to set the symbol when initializing a piece
     */
    setSymbol: function () {
      if (this.color === "white") {
        this.symbol = this._symbol;
      } else {
        this.symbol = this._symbol.toLowerCase();
      }
    },

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
    },

    /* add
     *
     * Given a position and a delta, get a new position.
     */
    add: function (pos, delta) {
      return [pos[0] + delta[0], pos[1] + delta[1]];
    },

    /* validPos
     *
     * Return true if the given position is on the board.
     */
    validPos: function (pos) {
      function validCoord(i) {
        return i < 8 && i >= 0;
      }

      return validCoord(pos[0]) && validCoord(pos[1]);
    },

    /* maybeAppend
     *
     * Add a position to a list of valid moves if it's empty of has an enemy piece
     * in it.
     */
    maybeAppend: function (moves, pos) {
      var dest = this.board.pieceAt(pos);
      if (!dest || dest.color === Chess.Util.otherColor(this.color))
        moves.push(pos);
    },

    /* validMoves
     *
     * An unneccessary virtual function. This is here so the unit tests for pieces
     * will fail with more reasonable failures before I've added anything to the
     * prototype.
     */
    validMoves: function () {
      return [];
    }
  };
})();