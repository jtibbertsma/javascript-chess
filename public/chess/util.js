(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  function oneOnEitherSide(pieces, color, row, _col, Piece) {
    [_col, 8 - 1 - _col].forEach(function (col) {
      pieces.push(new Piece({ pos: [row, col], color: color }));
    });
  }

  function valueInsert(pieces, color, row) {
    oneOnEitherSide(pieces, color, row, 0, Chess.Pieces.Rook);
    oneOnEitherSide(pieces, color, row, 1, Chess.Pieces.Knight);
    oneOnEitherSide(pieces, color, row, 2, Chess.Pieces.Bishop);

    pieces.push(new Chess.Pieces.Queen({ pos: [row, 3], color: color }));
    pieces.push(new Chess.Pieces.King({ pos: [row, 4], color: color }));
  }

  function pawnInsert(pieces, color, row) {
    for (var i = 0; i < 8; ++i) {
      pieces.push(new Chess.Pieces.Pawn({ pos: [row, i], color: color }));
    }
  }

  Chess.Util = {
    /* defaultPieces
     *
     * Create an array containing all the default pieces to put on a chessboard
     * to start a game. Give each piece the correct pos attribute.
     */
    defaultPieces: function () {
      var pieces = [];

      valueInsert(pieces, "black", 0);
      valueInsert(pieces, "white", 7);
      pawnInsert(pieces, "black", 1);
      pawnInsert(pieces, "white", 6);

      return pieces;
    },

    otherColor: function (color) {
      return color === "white" ? "black" : "white";
    },

    equalPos: function (pos1, pos2) {
      return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    },

    posInArray: function (pos, array) {
      for (var i = 0; i < array.length; ++i) {
        if (Chess.Util.equalPos(pos, array[i])) {
          return true;
        }
      }

      return false;
    },

    /* for unit tests */
    coordSort: function (moves) {
      return moves.sort(function (c1, c2) {
        if (c1[0] === c2[0]) {
          if (c1[1] === c2[1]) {
            return 0;
          } else if (c1[1] < c2[1]) {
            return -1;
          } else {
            return 1;
          }
        } else if (c1[0] < c2[0]) {
          return -1;
        } else {
          return 1;
        }
      });
    },

    /* extendo
     *
     * This function implements inheritance for the chess pieces. It takes
     * the name of the child, the name of the parent, and an object
     * containing methods to add to the new prototype. Construct a new
     * object and put it in the Chess.Pieces namespace.
     */
    extendo: function (childName, parentName, childProto) {
      var ParentClass = Chess.Pieces[parentName],
          initialize = childProto.initialize || function () { },
          newChildProto = {};
      var ChildClass = function (options) {
        initialize.call(this, options);
        ParentClass.call(this, options);
      };
      /* shallow copy parent prototype */
      for (var key in ParentClass.prototype)
        newChildProto[key] = ParentClass.prototype[key];
      /* overwrite with the child's prototype */
      for (var key in childProto)
        newChildProto[key] = childProto[key];
      newChildProto.parentClass = ParentClass;
      newChildProto.constructor = ChildClass;
      ChildClass.prototype = newChildProto;
      Chess.Pieces[childName] = ChildClass;
    }
  };
})();