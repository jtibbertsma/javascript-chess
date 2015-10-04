angular.module('ChessPlayerServices', [])
  .factory('playerContext', ['consolePlayer', 'aiPlayer', 'gameData', 'pieceData',
    function playerContextFactory(consolePlayer, aiPlayer, gameData, pieceData) {
      function Players(white, black) {
        this.players = {};
        this.current = 'black';
        this.setPlayer('white', white);
        this.setPlayer('black', black);
      }

      Players.prototype = {
        game: gameData.game,
        pieces: pieceData.get(),
        setPlayer: function (color, type) {
          switch (type) {
            case 'console':
              this.players[color] = {
                player: consolePlayer.create(color),
              }
              this.hasConsolePlayer = true;
              break;
            case 'ai':
              this.players[color] = {
                player: aiPlayer.create(color)
              }
              break;
          }
          this.players[color].type = type;
        },

        nextTurn: function (ctrl) {
          this.swapPlayers();
          this.players[this.current].player.playTurn(ctrl);
        },

        swapPlayers: function () {
          this.current = Chess.Util.otherColor(this.current);
        },

        undoLastMove: function () {
          if (this.hasConsolePlayer) {
            this.players[this.current].player.abortMove();
            if (this.players[this.current].type === 'console') {
              this.rewind();
            }
            if (this.players[this.current].type !== 'console') {
              this.rewind();
            }
            return this.current;
          }
          return null;
        },

        rewind: function () {
          var capture = this.game.undoLastMove();
          if (capture) {
            this.pieces.add(capture);
          }
          this.swapPlayers();
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
            },
            abortMove: function () { }
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

              this.promise = $timeout(function () {
                squareData.get().selectSquare(move[0]);
                ctrl.makeMove(move[1]);
                this.promise = null;
              }, time);
            },

            abortMove: function () {
              if (this.promise) {
                $timeout.cancel(this.promise);
                this.promise = null;
              }
            }
          };
        }
      };
    }
  ])