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
    function squareDataFactory(gameData, coordConversions) {
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
            _enabled: true,
            selectedSquare: null,

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

            enableInput: function (color) {
              this._enabled = true;
              if (color) {
                this.selectable = game.selectablePositions(color);
              }
              this.setProperty('selectable', this.selectable);
              this.resetProperty('movable');
            },

            disableInput: function () {
              this._enabled = false;
              this.selectedSquare = null;
              this.resetProperty('movable');
              this.resetProperty('selectable');
            },

            clickable: function () {
              return this._enabled;
            },

            setMovable: function (origin) {
              var movable = game.allValidMoves(idxToArr(origin));
              this.setProperty('movable', movable);
            },

            selectSquare: function (idx) {
              //this.setSelectable();
              this.selectedSquare = idxToArr(idx);
              if (this._enabled) {
                squares[idx].selectable = false;
                this.setMovable(idx);
              }
            },

            makeMove: function (idx) {
              var dest = idxToArr(idx);
              game.move(this.selectedSquare, dest);
            }
          };
          return currentData;
        }
      }
    }
  ])

  .factory('pieceData', ['gameData',
    function pieceDataFactory(gameData) {
      var currentData;

      return {
        get: function () {
          if (currentData)
            return currentData;
          return this.create();
        },

        create: function () {
          var game = gameData.game,
              pieces = game.board.allPieces();

          currentData = {
            data: function () {
              return pieces;
            },

            handleMove: function () {
              var move = game.lastMove();
              if (move && move.capture) {
                var idx = pieces.indexOf(move.capture);
                pieces.splice(idx, 1);
              }
            }
          };
          return currentData;
        }
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