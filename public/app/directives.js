angular.module('ChessDirectives', [])
  .directive('chessBoardView', [
    'playerContext',
    'squareData',
    'pieceData',
    '$document',
    function chessBoardViewDirective(pc, sd, pd, $document) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function boardController($scope) {
          var squares = sd.get(),
              pieces = pd.get(),
              players = pc.setContext('console', 'ai');

          $scope.squares = squares.data();
          $scope.pieces = pieces.data();

          return {
            makeMove: function (idx) {
              squares.makeMove(idx);
              squares.disableInput();
              this.nextTurn();
              pieces.handleMove();
            },

            nextTurn: function () {
              players.nextTurn(this);
            },

            defaultClick: function () {
              if (squares.clickable()) {
                squares.enableInput();
              }
            },

            selectSquare: function (pos) {
              squares.selectSquare(pos);
            },

            undoLastMove: function () {
              players.undoLastMove();
            }
          }
        },

        link: function (scope, _, attrs, ctrl) {
          attrs.$addClass("chess-board");
          $document.on('keydown', undo);
          scope.$on('$destroy', function () {
            $document.off('keydown', undo);
          });
          ctrl.nextTurn();

          function undo(event) {
            if (event.metaKey && event.keyCode === 90) {
              event.preventDefault();
              ctrl.undoLastMove();
            }
          }
        }
      };
    }
  ])

  .directive('boardPiece', ['pieceUrls', 'coordConversions',
    function boardPieceDirective(pieceUrls, coordConversions) {
      var arrToIdx = coordConversions.arrToIdx;
      return {
        require: '^chessBoardView',
        link: function (scope, element, attrs, ctrl) {
          var piece = scope.piece,
              square, selectable;
          getSquare();

          scope.src = pieceUrls.get(piece);
          scope.selectable = false;
          attrs.$addClass('piece');

          scope.enter = enter;
          scope.leave = leave;
          scope.mousedown = mousedown;

          scope.$watchCollection('piece.pos', function (pos) {
            element.css({
              top:  '' + 64 * pos[0] + 'px',
              left: '' + 64 * pos[1] + 'px'
            });
            getSquare();
          });

          function getSquare() {
            square = scope.squares[arrToIdx(piece.pos)];
          }

          function enter() {
            if (square.selectable) {
              scope.selectable = true;
              square.highlighted = true;
            }
          }

          function leave() {
            if (square.selectable) {
              scope.selectable = false;
              square.highlighted = false;
            }
          }

          function mousedown() {
            if (square.selectable) {
              ctrl.defaultClick();
              square.selectable = false;
              scope.selectable = false;
              ctrl.selectSquare(piece.pos);
            } else {
              ctrl.defaultClick();
              enter();
            }
          }
        }
      }
    }
  ])

  .directive('boardSquare', ['isWhite',
    function boardSquareDirective(isWhite) {
      return {
        require: '^chessBoardView',
        link: function (scope, element, attrs, ctrl) {
          var square = scope.square;

          attrs.$addClass("square");
          attrs.$addClass(isWhite(scope.$index) ? "white" : "black");
          scope.selectSquare = click;

          function click() {
            if (square.highlighted) {
              ctrl.makeMove(attrs.boardSquare);
            } else {
              ctrl.defaultClick();
            }
          }
        }
      }
    }
  ]);