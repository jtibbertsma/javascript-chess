(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Board = Chess.Board = function (options) {
    this.pieces = options.pieces;
    this.grid = [];

    this.kings = { black: null, white: null };

    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(null);
      }
      this.grid.push(row);
    }

    for (var i = 0; i < this.pieces.length; ++i) {
      var piece = this.pieces[i]
      this.grid[piece.pos[0]][piece.pos[1]] = piece;

      if (piece.isKing()) {
        this.kings[piece.color] = piece;
      }
    }
  };

  function otherColor(color) {
    return color === "white" ? "black" : "white";
  }

  Board.prototype = {
    /* move
     *
     * Move one piece on the board to another square. Don't do any validations.
     * A piece in the destination square is ignored and overwritten.
     */
    move: function (from, to) {
      if (this.pieceAt(from)) {
        this.placePiece(to, this.pieceAt(from));
      }
    },

    /* pieceAt
     *
     * Get the piece in a given position, or null if there isn't anything there.
     */
    pieceAt: function (pos) {
      return this.grid[pos[0]][pos[1]];
    },

    /* placePiece
     *
     * Put a piece in the given position. Change the internal position of that piece
     * to match the given position. Check if the piece is already on the board, and
     * if it is, then set its old position to null.
     */
    placePiece: function (pos, piece) {
      if (this.pieceAt(piece.pos) === piece) {
        this.grid[piece.pos[0]][piece.pos[1]] = null;
      }

      this.grid[pos[0]][pos[1]] = piece;
      piece.pos = pos;
    },

    /* whitePieces
     *
     * Get all white pieces.
     */
    whitePieces: function () {
      return this.piecesOfColor("white");
    },

    /* blackPieces
     *
     * ditto black
     */
    blackPieces: function () {
      return this.piecesOfColor("black");
    },

    /* piecesOfColor
     *
     * Do the actual work of whitePieces and blackPieces.
     */
    piecesOfColor: function (color) {
      var pieces = [];

      for (var i = 0; i < 8; ++i) {
        for (var j = 0; j < 8; j++) {
          if (this.grid[i][j] && this.grid[i][j].color === color) {
            pieces.push(this.grid[i][j]);
          }
        }
      }

      return pieces;
    },

    /* inCheck
     *
     * Check if a given color is currently in check. A player is in check if their one
     * of their opponents pieces can move to the square occupied by the player's king.
     */
    inCheck: function (color) {
      var king = this.kings[color],
          opponentPieces = this.piecesOfColor(otherColor(color));

      for (var i = 0; i < opponentPieces.length; ++i) {
        if (Chess.Util.posInArray(king.pos, opponentPieces[i].validMoves())) {
          return true;
        }
      }

      return false;
    }
  };
})();