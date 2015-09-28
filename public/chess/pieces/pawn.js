(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined" ||
      typeof Chess.Pieces.Piece === "undefined") {
    throw "missing dependency";
  }

  function maybeAdd(moves, pos) {
    if (Chess.Util.validPos(pos))
      moves.push(pos);
  }

  Chess.Util.extendo('Pawn', 'Piece', {
    isPawn: function () {
      return true;
    },

    maybeAddCapture: function (moves, pos) {
      var otherPiece = this.board.pieceAt(pos);
      if (otherPiece  &&
          otherPiece.color === Chess.Util.otherColor(this.color)) {
        moves.push(pos);
      }
    },

    validMoves: function () {
      var dir = this.color === "white" ? -1 : 1,
          row = this.pos[0],
          col = this.pos[1],
          moves = [];

      if (this.board.pieceAt([row + dir, col]) === null) {
        maybeAdd(moves, [row + dir, col]);
      }
      if (this.board.pieceAt([row + dir, col]) === null && !this.moved()) {
        maybeAdd(moves, [row + dir*2, col]);
      }

      this.maybeAddCapture(moves, [row + dir, col - 1]);
      this.maybeAddCapture(moves, [row + dir, col + 1]);

      return moves;
    }
  });
})();