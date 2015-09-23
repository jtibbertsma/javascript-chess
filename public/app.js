angular.module('JSChess', [])

  .factory('chessGame', [
    function chessGameFactory() {
      return {
        game: new Chess.Game()
      }
    }
  ])

  .factory('chessView', ['chessGame',
    function chessViewFactory(chessGame) {
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

  .controller('BoardCtrl', ['$scope', 'chessView',
    function BoardCtrl($scope, chessView) {
      $scope.view = chessView;
    }
  ]);