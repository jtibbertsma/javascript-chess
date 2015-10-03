(function () {
  if (typeof Chess === 'undefined') {
    Chess = {};
  }

  var AI = Chess.AI = function (color) {
    this.color = color;
    this.tmp = -1;
  };

  AI.prototype = {
    bestMove: function (game) {
      var i = ++this.tmp;
      return [[1,i], [3,i]];
    }
  };
})();