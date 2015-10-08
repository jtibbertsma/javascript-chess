(function () {
  if (!AI.metric) {
    throw "Include metric.js before main.js"
  }

  var ChessAI = AI.ChessAI = function (color) {
    this.color = color;
  };

  ChessAI.prototype = {
    bestMove: function (game) {
      return this.minimax(2, game, this.color).move;
      // return this.randomMove(game);
    },

    metric: AI.metric,

    /* minimax
     *
     * A recursive implementation of the minimax algorithm. If this method
     * returns a moveObj with a null move, that means there are no moves, the
     * game is over. This probably shouldn't be called in that case.
     */
    minimax: function (depth, game, color) {
      var maxObj = { max: -10000, move: null };

      if (depth === 0) {
        maxObj.max = this.metric(game);
      } else {
        var selectable = game.selectablePositions(color);
        for (var i = 0; i < selectable.length; i++) {
          var from = selectable[i],
              movable = game.allValidMoves(from);
          for (var j = 0; j < movable.length; j++) {
            var to = movable[j];
            game.move(from, to);
            var possibleMax = this.minimax(depth - 1, game, Chess.Util.otherColor(color));
            game.undoLastMove();
            if (-possibleMax.max > maxObj.max) {
              maxObj.max = -possibleMax.max;
              maxObj.move = [from, to];
            }
          }
        }
      }

      return maxObj;
    },

    /* randomMove
     *
     * Randomly choose a valid move.
     */
    randomMove: function (game) {
      var selectable = game.selectablePositions(this.color),
          from = selectable[Math.floor(Math.random() * selectable.length)],
          valid = game.allValidMoves(from),
          to = valid[Math.floor(Math.random() * valid.length)];

      return [from, to];
    }
  };
})();