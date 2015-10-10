(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.Piece === "undefined") {
    throw "missing dependency";
  }

  Chess.Util.extendo('Pawn', 'Piece', {
    isPawn: function () {
      return true;
    },

    /* maybeAddCapture
     *
     * Add a position to an array of moves if that position contains an
     * enemy piece.
     */
    maybeAddCapture: function (moves, pos) {
      var otherPiece = this.board.pieceAt(pos);
      if (otherPiece  &&
          otherPiece.color === Chess.Util.otherColor(this.color)) {
        moves.push(pos);
      }
    },

    /* maybeAppend
     *
     * Append a position to an array of positions if it's valid.
     */
    maybeAppend: function (moves, pos) {
      if (this.validPos(pos) && !this.board.pieceAt(pos))
        moves.push(pos);
    },

    validMoves: function () {
      var dir = this.color === "white" ? -1 : 1,
          row = this.pos[0],
          col = this.pos[1],
          moves = [];

      if (this.board.pieceAt([row + dir, col]) === null) {
        this.maybeAppend(moves, [row + dir, col]);
      }
      if (this.board.pieceAt([row + dir, col]) === null && !this.moved()) {
        this.maybeAppend(moves, [row + dir*2, col]);
      }

      this.maybeAddCapture(moves, [row + dir, col - 1]);
      this.maybeAddCapture(moves, [row + dir, col + 1]);

      return moves;
    },

    _symbol: 'P'
  });
})();