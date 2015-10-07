(function () {
  var color = "white";

  Mocks = {};

  Mocks.checkmateGame = {
    checkmate: function () {
      color = Chess.Util.otherColor(color);
      return color;
    }
  };
})();