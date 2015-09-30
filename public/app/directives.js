angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['gameData',
    function chessBoardViewDirective(gameData) {
      function idxToArr(i, j) {
        return i * 8 + j;
      }

      return {
        templateUrl: '/templates/square.html',
        link: function (scope, element, attrs) {
          attrs.$addClass("chess-board");
          scope.squares = [];
          scope.player = "white";

          for (var i = 0; i < 64; ++i) {
            scope.squares.push({
              piece: null,
              selectable: false
            });
          }

          scope.setSelectable = function () {
            gameData.game.movablePositions(scope.player).forEach(function (pos) {
              scope.squares[idxToArr(pos[0], pos[1])].selectable = true;
            });
          }

          scope.setSelectable();
        }
      };
    }
  ])

  .directive('boardSquare', ['gameData',
    function boardSquareDirective(gameData) {
      function isWhite(idx) {
        if (Math.floor(idx / 8) % 2 === 0) {
          idx += 1;
        }
        return idx % 2 === 1;
      }

      return {
        link: function (scope, element, attrs) {
          attrs.$addClass("square");
          attrs.$addClass(isWhite(scope.$index) ? "white" : "black")

          // if (scope.square.selectable) {
          //   attrs.$addClass("selectable");
          // }
        }
      }
    }
  ]);