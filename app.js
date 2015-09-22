angular.module('JSChess', [])

  .factory('chessView', [function () {
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
        whiteSquare: isWhite(i),
        whitePiece: false
      });
    }

    return view;
  }])

  .controller('BoardCtrl', ['$scope', 'chessView', function ($scope, chessView) {
    $scope.view = chessView;
  }]);