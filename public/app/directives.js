angular.module('ChessDirectives', [])
  .directive('chessBoardView',
    function chessBoardViewDirective() {
      return {
        templateUrl: '/templates/square.html',
        link: function (scope, element) {
          element.addClass("chess-board");
          scope.squares = [];

          for (var i = 0; i < 64; ++i) {
            scope.squares.push({ piece: null });
          }
        }
      };
    }
  )

  .directive('boardSquare', ['gameData',
    function boardSquareDirective(gameData) {
      function isWhite(idx) {
        if (Math.floor(idx / 8) % 2 === 0) {
          idx += 1;
        }
        return idx % 2 === 1;
      }

      return {
        link: function (scope, element) {
          element.addClass("square");

          if (isWhite(scope.$index)) {
            element.addClass("white");
          } else {
            element.addClass("black");
          }
        }
      }
    }
  ]);