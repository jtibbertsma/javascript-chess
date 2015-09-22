(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var Board = Chess.Board = function () {
    this.pieces = [];
    this.grid = [];

    for (var i = 0; i < 8; ++i) {
      var row = [];
      for (var j = 0; j < 8; ++j) {
        row.push(null);
      }
      this.grid.push(row);
    }
  };
})();