angular.module('ChessServices', [])
  
  .factory('game', [
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

  .factory('boardView', ['game',
    function boardViewFactory(game) {
      var view = [];

      function isWhite(idx) {
        if (Math.floor(idx / 8) % 2 === 0) {
          idx += 1;
        }

        return idx % 2 === 1;
      }

      for (var i = 0; i < 64; ++i) {
        view.push({
          content: "",
          selected: false,
          destination: false,
          whiteSquare: isWhite(i)
        });
      }

      return view;
    }
  ]);