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

  .factory('playerContext', ['consolePlayer',
    function playerContextFactory(consolePlayer) {
      return {
        setContext: function (white, black) {
          return new Players(white, black);
        }
      }

      function Players(white, black) {
        this.players = {};
        this.setPlayer('white', white);
        this.setPlayer('black', black);
      }

      Players.prototype = {
        setPlayer: function (prop, type) {
          switch (type) {
            case 'console':
              this.players[prop] = consolePlayer.create();
              break;
          }
        }
      };
    }
  ])

  .factory('consolePlayer', )

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