angular.module('JSChess', [])

  .factory('gameData', [
    function gameDataFactory() {
      var o = {
        reset: function () {
          o.data = new Chess.GameData({
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

  .factory('boardView', ['gameData',
    function boardViewFactory(gameData) {
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
          whiteSquare: isWhite(i),
          whitePiece: false
        });
      }

      return view;
    }
  ])

  .controller('BoardCtrl', ['$scope', 'boardView',
    function BoardCtrl($scope, boardView) {
      $scope.view = boardView;
    }
  ]);