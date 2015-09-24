(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  var GameData = Chess.GameData = function (options) {
    this.board = options && options.board;
    this.moves = [];
    this.capturedWhites = [];
    this.capturedBlacks = [];
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

  GameData.prototype = {
    move: function (pos1, pos2) {
      if (!validPos(pos1) || !validPos(pos2)) {
        throw "Out of bounds position";
      }

      var fromSquare = this.board.pieceAt(pos1),
          toSquare   = this.board.pieceAt(pos2);

      if (toSquare !== null) {
        
      }

      this.moves.push({
        from: pos1,
        to: pos2,
        capture: toSquare
      });
    }
  };
})();