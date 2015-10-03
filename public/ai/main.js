(function () {
  if (typeof Chess === 'undefined') {
    Chess = {};
  }

  var AI = Chess.AI = function (color) {
    this.color = color;
  };

  AI.prototype = {
    bestMove: function (game) {
      var movables = game.selectablePositions(this.color),
          from = movables[Math.floor(Math.random() * movables.length)],
          possibleMoves = game.allValidMoves(from),
          to = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      return [from, to];
    }
  };
})();