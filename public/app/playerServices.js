angular.module('ChessPlayerServices', [])
  .factory('playerContext', [
    'consolePlayer',
    'aiPlayer',
    'gameData',
    'pieceData',
    '$rootScope',
    function contextFactory(consolePlayer, aiPlayer, gameData, pieceData, $rootScope) {
      function Players(whiteType, blackType) {
        this.players = {};
        this.current = 'black';
        this.setPlayer('white', whiteType);
        this.setPlayer('black', blackType);
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
          var color;
          if (color = this.game.checkmate()) {
            $rootScope.$emit(
              'game:gameOver',
              'checkmate',
              color,
              this.players[color].type === 'console'
            );
          } else {
            this.swapPlayers();
            this.players[this.current].player.playTurn(ctrl);
            $rootScope.$emit('game:nextTurn', this.current);
          }
        },

        swapPlayers: function () {
          this.current = Chess.Util.otherColor(this.current);
        },

        undoLastMove: function () {
          if (this.hasConsolePlayer) {
            this.players[this.current].player.abortMove();
            do {
              this.rewind();
            } while (this.players[this.current].type !== 'console')
            $rootScope.$emit('game:nextTurn', this.current);
            return this.current;
          }
          return null;
        },

        rewind: function () {
          var capture = this.game.undoLastMove();
          if (capture) {
            this.pieces.add(capture);
          }
          console.log(this.current);
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
          var game = gameData.game,
              squares = squareData.get();
          return {
            ai: new AI.ChessAI(color),

            playTurn: function (ctrl) {
              var a = new Date();
              this.ai.bestMove(game, function (move) {
                var time = Math.max(minTime - (new Date() - a), 0);
                $timeout(function () {
                  squares.selectSquare(move[0]);
                  ctrl.makeMove(move[1]);
                }, time, true);
              });
            },

            abortMove: function () {
              this.ai.abortMove();
            }
          };
        }
      };
    }
  ])