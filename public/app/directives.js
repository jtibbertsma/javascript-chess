angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['gameData',
    function chessBoardViewDirective(gameData) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function boardController($scope) {
          function arrToIdx(i, j) {
            return i * 8 + j;
          }

          function idxToArr(idx) {
            return [Math.floor(idx / 8), idx % 8];
          }

          $scope.pieces = gameData.game.board.allPieces();
          $scope.player = "white";
          $scope.squares = [];

          for (var i = 0; i < 64; ++i) {
            $scope.squares.push({
              movable: false,
              selectable: false
            });
          }

          return {
            game: gameData.game,
            squareSize: 64,
            selectedSquare: null,
            splicePiece: function (capture) {
              var idx = $scope.pieces.indexOf(capture);
              $scope.pieces.splice(idx, 1);
            },

            setProperty: function (prop, collection) {
              this.resetProperty(prop);
              collection.forEach(function (pos) {
                $scope.squares[arrToIdx(pos[0], pos[1])][prop] = true;
              });
            },

            swapPlayer: function () {
              $scope.player = Chess.Util.otherColor($scope.player);
            },

            resetProperty: function (prop) {
              $scope.squares.forEach(function (square) {
                square[prop] = false;
              });
            },

            setSelectable: function () {
              var selectable = this.game.selectablePositions($scope.player);
              this.setProperty('selectable', selectable);
            },

            selectSquare: function (idx) {
              this.setSelectable();
              $scope.squares[idx].selectable = false;
              this.selectedSquare = idxToArr(idx);

              var movable = this.game.allValidMoves(idxToArr(idx));
              this.setProperty('movable', movable);
            },

            makeMove: function (idx) {
              var dest = idxToArr(idx),
                  capture = this.game.board.pieceAt(dest);

              this.game.move(this.selectedSquare, dest);
              this.selectedSquare = null;
              this.resetProperty('movable');
              this.swapPlayer();
              this.setSelectable();

              if (capture) {
                this.splicePiece(capture);
              }
            },
          }
        },

        link: function (scope, $element, attrs, ctrl) {
          attrs.$addClass("chess-board");
          ctrl.setSelectable();
        }
      };
    }
  ])

  .directive('boardPiece', ['pieceUrls',
    function boardPieceDirective(pieceUrls) {
      return {
        require: '^chessBoardView',
        link: function (scope, element, attrs, ctrl) {
          var piece = scope.piece;

          attrs.$set('src', pieceUrls.get(scope.piece));
          attrs.$addClass('piece');

          scope.$watchCollection('piece.pos', function () {
            element.css('top', '' + ctrl.squareSize * piece.pos[0] + 'px');
            element.css('left', '' + ctrl.squareSize * piece.pos[1] + 'px');
          });
        }
      }
    }
  ])

  .directive('boardSquare',
    function boardSquareDirective() {
      return {
        require: '^chessBoardView',
        link: function (scope, element, attrs, ctrl) {
          var square = scope.square;

          attrs.$addClass("square");
          attrs.$addClass(isWhite(scope.$index) ? "white" : "black");
          scope.selectSquare = onClick;

          function isWhite(idx) {
            if (Math.floor(idx / 8) % 2 === 0) {
              idx += 1;
            }
            return idx % 2 === 1;
          }

          function onClick() {
            if (ctrl.selectedSquare !== null && square.movable) {
              ctrl.makeMove(attrs.boardSquare);
            } else if (square.selectable) {
              ctrl.selectSquare(attrs.boardSquare);
            } else {
              ctrl.setSelectable();
              ctrl.resetProperty('movable');
            }
          }
        }
      }
    }
  );