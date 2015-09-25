(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Board = Chess.Board = function (options) {
    this.pieces = options.pieces;
    this.grid = [];

    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(null);
      }
      this.grid.push(row);
    }

    for (var i = 0; i < this.pieces.length; ++i) {

    }
  };

  Board.prototype = {
    /* move
     *
     * Move one piece on the board to another square. Don't do any validations.
     * A piece in the destination square is ignored and overwritten.
     */
    move: function () {

    },

    /* pieceAt
     *
     * Get the piece in a given position, or null if there isn't anything there.
     */
    pieceAt: function (pos) {
      return null;
    },

    /* placePiece
     *
     * Put a piece in the given position. Change the internal position of that piece
     * to match the given position. Check if the piece is already on the board, and
     * if it is, then set its old position to null.
     */
    placePiece: function (pos, piece) {

    },

    /* whitePieces
     *
     * Get all white pieces.
     */
    whitePieces: function () {
      return [];
    },

    /* blackPieces
     *
     * ditto black
     */
    blackPieces: function () {
      return [];
    },

    /* inCheck
     *
     * Check if a given color is currently in check. A player is in check if their one
     * of their opponents pieces can move to the square occupied by the player's king.
     */
    inCheck: function (color) {
      return false;
    }
  };
})();