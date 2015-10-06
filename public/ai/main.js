(function () {
  if (!AI.metric) {
    throw "Include metric.js before main.js"
  }

  var ChessAI = AI.ChessAI = function (color) {
    this.color = color;
  };

  ChessAI.prototype = {
    bestMove: function (game) {
      var movables = game.selectablePositions(this.color),
          from = movables[Math.floor(Math.random() * movables.length)],
          possibleMoves = game.allValidMoves(from),
          to = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      return [from, to];
    },

    metric: AI.metric
  };
})();