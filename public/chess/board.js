(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Board = Chess.Board = function (options) {
    var pieces = options.pieces;
    this.grid = [];

    this.kings = { black: null, white: null };

    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(null);
      }
      this.grid.push(row);
    }

    for (var i = 0; i < pieces.length; ++i) {
      var piece = pieces[i]
      this.grid[piece.pos[0]][piece.pos[1]] = piece;
      piece.board = this;

      if (piece.isKing()) {
        this.kings[piece.color] = piece;
      }
    }
  };

  Board.prototype = {
    /* move
     *
     * Move one piece on the board to another square. Don't do any validations.
     * A piece in the destination square is ignored and overwritten.
     */
    move: function (from, to) {
      var piece = this.pieceAt(from);

      if (piece) {
        this.placePiece(to, piece);
        piece.move(to);
      }
    },

    /* pieceAt
     *
     * Get the piece in a given position, or null if there isn't anything there.
     */
    pieceAt: function (pos) {
      return this.grid[pos[0]] && this.grid[pos[0]][pos[1]];
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
      piece.board = this;
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
     * Get all pieces of a particular color, used by whitePieces and blackPieces.
     */
    piecesOfColor: function (color) {
      return this.getPieces(function (piece) { return piece.color === color; });
    },

    /* allPieces
     *
     * Get all pieces on the board.
     */
    allPieces: function () {
      return this.getPieces(function () { return true; });
    },

    /* getPieces
     *
     * Get all pieces that have a given property. The prop argument is a function
     * that gets passed a piece, and should return true if the piece should be
     * included.
     */
    getPieces: function (prop) {
      var pieces = [];

      for (var i = 0; i < 8; ++i) {
        for (var j = 0; j < 8; j++) {
          if (this.grid[i][j] && prop(this.grid[i][j])) {
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
          opponentPieces = this.piecesOfColor(Chess.Util.otherColor(color));

      for (var i = 0; i < opponentPieces.length; ++i) {
        if (Chess.Util.posInArray(king.pos, opponentPieces[i].validMoves())) {
          return true;
        }
      }

      return false;
    },

    /* fen
     *
     * Get the board portion of the game fen representation.
     */
    fen: function () {
      var emptyCounter = 0,
          rows = [];

      for (var i = 0; i < 8; ++i) {
        var row = '';
        emptyCounter = 0;
        for (var j = 0; j < 8; ++j) {
          if (this.grid[i][j] === null) {
            ++emptyCounter;
          } else {
            if (emptyCounter) {
              row += emptyCounter;
            }
            emptyCounter = 0;
            row += this.grid[i][j].symbol;
          }
        }
        if (emptyCounter) {
          row += emptyCounter;
        }
        rows.push(row);
      }

      return rows.join('/');
    }
  };
})();