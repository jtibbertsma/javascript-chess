(function () {
  function stringify(pos) {
    return "" + pos[0] + pos[1];
  }

  Mocks = {};

  var board = Mocks.board = {
    move: function (pos1, pos2) {
      board.pieces[stringify(pos2)] = board.pieces[stringify(pos1)];
      board.pieces[stringify(pos1)] = null;
    },

    pieceAt: function (pos) {
      return board.pieces[stringify(pos)];
    },

    placePiece: function (pos, piece) {
      board.pieces[stringify(pos)] = piece;
    },

    inCheck: function (color) {
      return color === "white" && board.pieceAt([1,3]) === null;
    },

    __reset__: function () {
      board.pieces = {
        '00': {
          color: "white",
          validMoves: function () {
            return [[0,0], [1,1], [2,2], [3,3], [4,4]];
          }
        },
        13: {
          color: "white",
          validMoves: function () {
            return [[1,4]];
          }
        },
        44: {
          color: "black"
        },
        22: null,
        14: null,
        11: null,
        55: null
      }
    },

    deleted: null,

  };
})();