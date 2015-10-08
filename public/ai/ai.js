(function () {
  if (!AI.metric) {
    throw "Include metric.js before ai.js"
  }

  var ChessAI = AI.ChessAI = function (color) {
    this.color = color;
  };

  ChessAI.prototype = {
    bestMove: function (game, callback) {
      this.minimax(game, 2, 1, function (moveObj) {
        callback(moveObj.move);
      });
    },

    metric: AI.metric,

    /* minimax
     *
     * A recursive implementation of the minimax algorithm. If this method
     * finds a moveObj with a null move, that means there are no moves, the
     * game is over. This probably shouldn't be called in that case.
     */
    minimax: function (game, depth, sign, callback) {
      if (depth === 0) {
        /* base case */
        var max = sign * this.metric(game);
        callback({ max: max, move: null });
      } else {
        /* recursive case */
        var selectable = game.selectablePositions(this.color),
            i = -1, j = -1, movable = [],
            maxObj = { max: -10000, move: null },
            runNextIteration = runNextIterationFunc.bind(this);
        setupNextIteration();
        runNextIteration();
      }

      // Set the indices for the next iteration of the search. If we're out of
      // nodes to search, give the max to the callback. Return false if finished.
      function setupNextIteration() {
        if (++j === movable.length) {
          if (++i === selectable.length) {
            callback(maxObj);
            return false;;
          }
          j = 0;
          movable = game.allValidMoves(selectable[i]);
        }
        return true;
      }

      // Do the recursive search of deeper nodes.
      function runNextIterationFunc() {
        setTimeout(function () {
          var from = selectable[i], to = movable[j];
          game.move(from, to);
          this.color = Chess.Util.otherColor(this.color);
          this.minimax(game, depth - 1, -sign, function (moveObj) {
            if (-moveObj.max > maxObj.max) {
              maxObj = { max: -moveObj.max, move: [from, to] };
            }
            game.undoLastMove();
            this.color = Chess.Util.otherColor(this.color);
            if (setupNextIteration())
              runNextIteration();
          }.bind(this));
        }.bind(this), 0);
      }
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
    },

    /* abortMove
     *
     * Cancel an async move search
     */
    abortMove: function () {
      
    }
  };
})();