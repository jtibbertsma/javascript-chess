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
            squares.push({ highlighted: false, selectable: false });
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
              this.resetProperty('highlighted');
            },

            disableInput: function () {
              this._enabled = false;
              this.selectedSquare = null;
              this.resetProperty('highlighted');
              this.resetProperty('selectable');
            },

            clickable: function () {
              return this._enabled;
            },

            setMovable: function (origin) {
              var highlighted = game.validMoves(idxToArr(origin));
              this.setProperty('highlighted', highlighted);
            },

            selectSquare: function (idx) {
              idx = arrToIdx(idx);
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
                this.remove(move.capture);
              }
            },

            add: function (piece) {
              pieces.push(piece);
            },

            remove: function (piece) {
              var idx = pieces.indexOf(piece);
              pieces.splice(idx, 1);
            }
          };
          return currentData;
        }
      };
    }
  ]);