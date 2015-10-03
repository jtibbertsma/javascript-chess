angular.module('ChessPlayerServices', [])
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

  .factory('consolePlayer', ['squareData',
    function consolePlayerFactory(squareData) {
      var squares = squareData.get();
      return {
        create: function (color) {
          return {
            color: color,
            playTurn: function () {
              squares.enableInput(this.color);
            }
          };
        }
      };
    }
  ])

  .factory('aiPlayer', ['$timeout', 'gameData', 'squareData',
    function aiPlayerFactory($timeout, gameData, squareData) {
      var minTime = 750;

      return {
        create: function (color) {
          return {
            ai: new AI.ChessAI(color),

            playTurn: function (ctrl) {
              $timeout(this._playTurn.bind(this, ctrl), 0, true);
            },

            _playTurn: function (ctrl) {
              var a = new Date(),
                  time,
                  move = this.ai.bestMove(gameData.game);
              time = Math.max(minTime - (new Date() - a), 0);

              $timeout(function () {
                squareData.get().selectSquare(move[0]);
                ctrl.makeMove(move[1]);
              }, time);
            }
          };
        }
      };
    }
  ])