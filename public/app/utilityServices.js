angular.module('ChessUtilityServices', [])
  .factory('coordConversions', 
    function coordConversionsFactory() {
      function arrToIdx(arr) {
        if (typeof arr !== "object") {
          return arr;
        }
        return arr[0] * 8 + arr[1];
      }

      function idxToArr(idx) {
        if (typeof idx === "object") {
          return idx;
        }
        return [Math.floor(idx / 8), idx % 8];
      }

      return {
        idxToArr: idxToArr,
        arrToIdx: arrToIdx
      };
    }
  )

  .factory('isWhite',
    function isWhiteFactory() {
      return function (idx) {
        if (Math.floor(idx / 8) % 2 === 0) {
          idx += 1;
        }
        return idx % 2 === 1;
      };
    }
  )

  .factory('pieceUrls', 
    function pieceUrlsFactory() {
      return {
        get: function (piece) {
          var name;
          if (piece.constructor === Chess.Pieces.Pawn) {
            name = 'pawn';
          } else if (piece.constructor === Chess.Pieces.Knight) {
            name = 'knight';
          } else if (piece.constructor === Chess.Pieces.Bishop) {
            name = 'bishop';
          } else if (piece.constructor === Chess.Pieces.Rook) {
            name = 'rook';
          } else if (piece.constructor === Chess.Pieces.King) {
            name = 'king';
          } else if (piece.constructor === Chess.Pieces.Queen) {
            name = 'queen';
          }

          return '/images/pieces/' + piece.color + '/' + name + '.png';
        }
      }
    }
  );