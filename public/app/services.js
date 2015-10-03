angular.module('ChessServices', [])
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

  .factory('playerContext', ['consolePlayer', 'aiPlayer',
    function playerContextFactory(consolePlayer, aiPlayer) {
      function Players(white, black) {
        this.players = {};
        this.current = 'black';
        this.setPlayer('white', white);
        this.setPlayer('black', black);
      }

      Players.prototype = {
        setPlayer: function (color, type) {
          switch (type) {
            case 'console':
              this.players[color] = consolePlayer.create(color);
              break;
            case 'ai':
              this.players[color] = aiPlayer.create(color);
              break;
          }
        },

        nextTurn: function (ctrl) {
          this.swapPlayers();
          this.players[this.current].playTurn(ctrl);
        },

        swapPlayers: function () {
          this.current = Chess.Util.otherColor(this.current);
        }
      };

      return {
        setContext: function (white, black) {
          return new Players(white, black);
        }
      };
    }
  ])

  .factory('consolePlayer',
    function consolePlayerFactory() {
      return {
        create: function (color) {
          return {
            color: color,
            playTurn: function (ctrl) {
              ctrl.setSelectable(this.color);
            }
          };
        }
      };
    }
  )

  .factory('aiPlayer', ['$timeout', 'gameData',
    function aiPlayerFactory($timeout, gameData) {
      var minTime = 500;

      return {
        create: function (color) {
          return {
            ai: new Chess.AI(color),

            playTurn: function (ctrl) {
              $timeout(this._playTurn.bind(this, ctrl), 0), true;
            },

            playTurn: function (ctrl) {
              var a = new Date(),
                  time,
                  move = this.ai.bestMove(gameData.game);
              time = Math.max(minTime - (new Date() - a), 0);

              $timeout(function () {
                ctrl.selectedSquare = move[0];
                ctrl.makeMove(move[1]);
              }, time);
            }
          };
        }
      };
    }
  ])

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