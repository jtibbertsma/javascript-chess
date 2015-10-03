angular.module('ChessDataServices', [])
  .factory('gameData', [
    function gameFactory() {
      var o = {
        reset: function () {
          o.game = new Chess.Game({
            board: new Chess.Board({
              pieces: Chess.Util.defaultPieces()
            })
          });
        }
      };

      o.reset();
      return o;
    }
  ])

  .factory('squareData', ['gameData', 'coordConversions',
    function squareDataFactory(gameData) {
      var currentData,
          idxToArr = coordConversions.idxToArr,
          arrToIdx = coordConversions.arrToIdx;

      return {
        get: function () {
          if (currentData)
            return currentData;
          return this.create();
        },

        create: function () {
          var squares = [],
              game = gameData.game;
          for (var i = 0; i < 64; ++i) {
            squares.push({ movable: false, selectable: false });
          }

          currentData = {
            data: function () {
              return squares;
            },

            setProperty: function (prop, collection) {
              this.resetProperty(prop);
              collection.forEach(function (pos) {
                squares[arrToIdx(pos)][prop] = true;
              });
            },

            resetProperty: function (prop) {
              squares.forEach(function (square) {
                square[prop] = false;
              });
            },

            setSelectable: function (color) {
              if (color) {
                this.selectable = this.game.selectablePositions(color);
              }
              this.setProperty('selectable', this.selectable);
              this.resetProperty('movable');
            },

            setMovable: function (origin) {
              var movable = this.game.allValidMoves(idxToArr(origin));
              this.setProperty('movable', movable);
            },

            selectSquare: function (idx) {
              this.setSelectable();
              squares[idx].selectable = false;
              this.selectedSquare = idxToArr(idx);
              this.setMovable(idx);
            }
          };
          return currentData;
      };
    }
  ])

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