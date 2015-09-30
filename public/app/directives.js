angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['gameData',
    function chessBoardViewDirective(gameData) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function ($scope) {
          function arrToIdx(i, j) {
            return i * 8 + j;
          }

          return {
            game: gameData.game,
            resetProperty: function (prop) {
              $scope.squares.forEach(function (square) {
                square[prop] = false;
              });
            },

            setSelectable: function () {
              this.resetProperty('selectable');
              this.game.movablePositions($scope.player).forEach(function (pos) {
                $scope.squares[arrToIdx(pos[0], pos[1])].selectable = true;
              });
            }
          }
        },

        link: function ($scope, $element, $attrs, ctrl) {
          $attrs.$addClass("chess-board");
          $scope.squares = [];
          $scope.pieces = ctrl.game.board.allPieces();
          $scope.player = "white";

          for (var i = 0; i < 64; ++i) {
            $scope.squares.push({
              piece: null
            });
          }

          ctrl.setSelectable();
        }
      };
    }
  ])

  .directive('boardPiece', ['pieceUrls',
    function boardPieceDirective(pieceUrls) {
      return {
        require: '^chessBoardView',
        link: function ($scope, $element, $attrs) {
          var pos = $scope.piece.pos;

          $attrs.$set('src', pieceUrls.get($scope.piece));
          $attrs.$addClass('piece');

          $attrs.$set('style', "top:" + 50 * pos[0] + 'px;left:' + 50 * pos[1] + 'px;');
        }
      }
    }
  ])

  .directive('boardSquare',
    function boardSquareDirective() {
      return {
        require: '^chessBoardView',
        link: function ($scope, $element, $attrs, ctrl) {
          function isWhite(idx) {
            if (Math.floor(idx / 8) % 2 === 0) {
              idx += 1;
            }
            return idx % 2 === 1;
          }

          $attrs.$addClass("square");
          $attrs.$addClass(isWhite($scope.$index) ? "white" : "black")

          // if ($scope.square.selectable) {
          //   $attrs.$addClass("selectable");
          // }
        }
      }
    }
  );