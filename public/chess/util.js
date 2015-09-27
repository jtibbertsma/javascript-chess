(function () {
  if (typeof Chess === "undefined") {
    Chess = {};
  }

  Chess.Util = {
    defaultPieces: function () {
      return [];
    },

    equalPos: function (pos1, pos2) {
      return pos1[0] === pos2[0] && pos1[1] === pos2[1];
    },

    validPos: function (pos) {
      function validCoord(i) {
        return i < 8 && i >= 0;
      }

      return validCoord(pos[0]) && validCoord(pos[1]);
    },

    posInArray: function (pos, array) {
      for (var i = 0; i < array.length; ++i) {
        if (Chess.Util.equalPos(pos, array[i])) {
          return true;
        }
      }

      return false;
    },

    extendo: function (ChildClass, ParentClass, childProto) {
      var newChildProto = {};
      /* shallow copy parent prototype */
      for (var key in ParentClass.prototype)
        newChildProto[key] = ParentClass.prototype[key];
      /* overwrite with the child's prototype */
      for (var key in childProto)
        newChildProto[key] = childProto[key];
      newChildProto.parentClass = ParentClass;
      ChildClass.prototype = newChildProto;
      ChildClass.prototype.constructor = ChildClass;
    }
  };
})();