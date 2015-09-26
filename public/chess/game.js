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

  function validPos(pos) {
    return pos[0] >= 0 && pos[1] >= 0 &&
           pos[0] <= 7 && pos[1] <= 7;
  }

  Game.prototype = {
    /* _move (private)
     *
     * Move a piece without validating.
     */
    _move: function (pos1, pos2) {
      var fromSquare = this.board.pieceAt(pos1),
          toSquare   = this.board.pieceAt(pos2);

      if (toSquare !== null) {
        this.capturedPieces[toSquare.color].push(toSquare);
      }

      this.moves.push({
        from: pos1,
        to: pos2,
        capture: toSquare
      });

      this.board.move(pos1, pos2);
    },

    /* move
     *
     * Move a piece to a new position. Before moving, ensure that the move is
     * valid. Handle piece capturing.
     */
    move: function (pos1, pos2) {
      if (!validPos(pos1) || !validPos(pos2)) {
        throw "Out of bounds position";
      }

      // This checks if the piece can't move to that spot, and also checks
      // if the move would leave us in check.
      if (!this.validMove(pos1, pos2)) {
        throw "Invalid move";
      }

      this._move(pos1, pos2);
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

      // in the future, handle en passant and castling here

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