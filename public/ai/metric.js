(function () {
  if (typeof AI === "undefined") {
    AI = {};
  }

  /* metric
   *
   * Return the value of a current game position. Currently, the metric is
   * determined by number of pieces on each side followed by the number of
   * squares that a player can move to.
   */
  AI.metric = function (game) {
    /* Check for checkmate first */
    var checkmateColor;
    if (checkmateColor = game.checkmate()) {
      if (checkmateColor === this.color) {
        return -2000;
      } else {
        return 2000;
      }
    }

    /* If the game is still in play, calculate the relative position values. */
    return positionValue(game, this.color)
         - positionValue(game, Chess.Util.otherColor(this.color));
  };

  function positionValue(game, color) {
    var material = materialCount(game, color) * 10;
    return material + moveCount(game, color);
  }

  function materialCount(game, color) {
    var count = 40,
        lost = game.capturedPieces[color];

    for (var i = 0; i < lost.length; i++) {
      count -= AI.value(lost[i]);
    }
    return count;
  }

  function moveCount(game, color) {
    var positions = game.selectablePositions(color),
        count = 0;

    for (var i = 0; i < positions.length; ++i) {
      count += game.allValidMoves(positions[i]).length;
    }
    return count;
  }
})();