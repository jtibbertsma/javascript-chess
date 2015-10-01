angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['gameData',
    function chessBoardViewDirective(gameData) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function ($scope) {
          function arrToIdx(i, j) {
            return i * 8 + j;
          }

          function idxToArr(idx) {
            return [Math.floor(idx / 8), idx % 8];
          }

          $scope.squares = [];
          $scope.player = "white";

          for (var i = 0; i < 64; ++i) {
            $scope.squares.push({
              piece: null
            });
          }

          return {
            game: gameData.game,
            squareSize: 64,
            selectedSquare: null,
            setProperty: function (prop) {
              this.resetProperty(prop);

            },

            resetProperty: function (prop) {
              $scope.squares.forEach(function (square) {
                square[prop] = false;
              });
            },

            setSelectable: function () {
              this.resetProperty('selectable');
              this.game.selectablePositions($scope.player).forEach(function (pos) {
                $scope.squares[arrToIdx(pos[0], pos[1])].selectable = true;
              });
            },

            selectSquare: function (idx) {
              this.resetProperty('movable');
              this.game.allValidMoves(idxToArr(idx)).forEach(function (pos) {
                $scope.squares[arrToIdx(pos[0], pos[1])].moveable = true;
              });
            }
          }
        },

        link: function ($scope, $element, $attrs, ctrl) {
          $attrs.$addClass("chess-board");
          $scope.pieces = ctrl.game.board.allPieces();
          ctrl.setSelectable();
        }
      };
    }
  ])

  .directive('boardPiece', ['pieceUrls',
    function boardPieceDirective(pieceUrls) {
      return {
        require: '^chessBoardView',
        link: function ($scope, $element, $attrs, ctrl) {
          var pos = $scope.piece.pos;

          $attrs.$set('src', pieceUrls.get($scope.piece));
          $attrs.$addClass('piece');

          $element.css('top', '' + ctrl.squareSize * pos[0] + 'px');
          $element.css('left', '' + ctrl.squareSize * pos[1] + 'px');
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

          var square = $scope.square;

          $attrs.$addClass("square");
          $attrs.$addClass(isWhite($scope.$index) ? "white" : "black");

          if (square.selectable) {
            $attrs.$addClass("selectable");
          }

          $element.bind('click', function () {
            if (ctrl.selectedSquare !== null && square.selected) {
              console.log("First");
            } else if (square.selectable) {
              ctrl.selectSquare($attrs.boardSquare);
            } else {
              console.log("Third");
            }
          });
        }
      }
    }
  );