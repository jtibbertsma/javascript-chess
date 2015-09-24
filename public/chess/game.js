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

  function equalPos(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }

  function posInArray(pos, array) {
    for (var i = 0; i < array.length; ++i) {
      if (equalPos(pos, array[i])) {
        return true;
      }
    }

    return false;
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

      // if (!posInArray(pos2, this.validMoves(pos1))) {
      //   throw "Invalid move";
      // }

      this._move(pos1, pos2);
    },

    /* undoLastMove
     *
     * Undo the previous move. Replace a captured piece if necessary. Do nothing if
     * it's the beginning of the game.
     */
    undoLastMove: function () {
      // if (this.moves.length === 0) {
      //   return;
      // }

      // var move = this.moves.pop();
      // if (move.capture)
    }
  };
})();