(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Game = Chess.Game = function (options) {
    this.board = options && options.board;
    this.moves = [];
    this.capturedPieces = {
      black: [],
      white: []
    }
  };

  Game.prototype = {
    /* _move (private)
     *
     * Move a piece without validating.
     */
    _move: function (from, to) {
      var fromSquare = this.board.pieceAt(from),
          toSquare   = this.board.pieceAt(to);

      if (toSquare !== null) {
        this.capturedPieces[toSquare.color].push(toSquare);
      }

      this.moves.push({
        from: from,
        to: to,
        capture: toSquare
      });

      this.board.move(from, to);
    },

    /* move
     *
     * Move a piece to a new position. Before moving, ensure that the move is
     * valid. Handle piece capturing.
     */
    move: function (from, to) {
      if (!this.validMove(from, to)) {
        throw "Invalid move";
      }

      this._move(from, to);
    },

    /* undoLastMove
     *
     * Undo the previous move. Replace a captured piece if necessary. Do nothing if
     * it's the beginning of the game.
     */
    undoLastMove: function () {
      if (this.moves.length === 0) {
        return;
      }

      var move = this.moves.pop();
      this.board.move(move.to, move.from);

      if (move.capture !== null) {
        this.board.placePiece(move.to, move.capture);
        this.capturedPieces[move.capture.color].pop();
      }
    },

    /* inCheck
     *
     * Check if a player is currently in check. This is just a wrapper for
     * Board.inCheck
     */
    inCheck: function (color) {
      return this.board.inCheck(color);
    },

    /* causesCheck
     *
     * Return true if a move will cause check. This method should leave the board
     * in the same state as it finds it.
     */
    causesCheck: function (piece, pos) {
      this._move(piece.pos, pos);
      var inCheck = this.inCheck(piece.color);
      this.undoLastMove();

      return !inCheck;
    },

    /* validMove
     *
     * Return true if a move is valid.
     */
    validMove: function (from, to) {
      var piece = this.board.pieceAt(from);
      return piece &&
             Chess.Util.posInArray(to, piece.validMoves()) &&
             this.causesCheck(piece, to);
    },

    /* allValidMoves
     *
     * Get an array of all legal moves for a given position. If the player is in
     * check, a move is only legal if it gets the player out of check. A player
     * cannot move into check. En passant and castling are taken into account.
     */
    allValidMoves: function (piecePos) {
      var piece = this.board.pieceAt(piecePos);
      if (!piece) {
        return [];
      }

      var validMoves = piece.validMoves()
        .filter(this.causesCheck.bind(this, piece));

      // in the future, handle en passant and castling here ??

      return validMoves;
    },

    /* movablePositions
     *
     * Given a color, return an array of the coordinates of each of that color's
     * pieces that are able to move.
     */
    movablePositions: function (color) {
      return this.board.piecesOfColor(color)
        .map(function (piece) {
          return piece.pos;
        }.bind(this))

        .filter(function (pos) {
          return this.allValidMoves(pos).length > 0;
        }.bind(this));
    },

    /* checkmate
     *
     * If there is no checkmate, return null. If there is a checkmate, return the
     * color of the checkmated player as a string.
     */
    checkmate: function () {
      // This implementation won't work, because it'll return a truthy value
      // if there's a stalemate.
      if (this.movablePositions("white").length === 0) {
        return "white";
      } else if (this.movablePositions("black").length === 0) {
        return "black";
      }

      return null;
    }
  };
})();