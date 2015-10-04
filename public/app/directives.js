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
              var color = players.undoLastMove();
              if (color) {
                squares.enableInput(color);
              }
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
            /* catch cmd-z */
            if (event.metaKey && event.keyCode === 90) {
              event.preventDefault();
              ctrl.undoLastMove();
              scope.$apply();
            }
          }
        }
      };
    }
  ])

  .directive('chessPiece', ['pieceUrls', 'coordConversions',
    function chessPieceDirective(pieceUrls, coordConversions) {
      var arrToIdx = coordConversions.arrToIdx;
      return {
        require: '^chessBoardView',
        link: function (scope, element, attrs, ctrl) {
          var piece = scope.piece,
              square;
          getSquare();

          scope.src = pieceUrls.get(piece);
          scope.selectable = false;
          attrs.$addClass('piece');

          scope.mouseenter = mouseenter;
          scope.mouseleave = mouseleave;
          scope.mousedown = mousedown;

          scope.$watchCollection('piece.pos', function (pos) {
            element.css({
              top:  '' + 64 * pos[0] + 'px',
              left: '' + 64 * pos[1] + 'px'
            });
            getSquare();
          });

          function mouseenter() {
            if (square.highlighted) {
              scope.selectable = true;
            } else if (square.selectable) {
              scope.selectable = true;
              square.highlighted = true;
            }
          }

          function mouseleave() {
            if (square.selectable) {
              square.highlighted = false;
            }
            scope.selectable = false;
          }

          function mousedown() {
            /* this piece is getting captured */
            if (!square.selectable && square.highlighted) {
              ctrl.makeMove(piece.pos);
            /* this piece can move */
            } else if (square.selectable) {
              ctrl.defaultClick();
              square.selectable = false;
              scope.selectable = false;
              ctrl.selectSquare(piece.pos);
            /* reset the board state */
            } else {
              ctrl.defaultClick();
              mouseenter();
            }
          }

          function getSquare() {
            square = scope.squares[arrToIdx(piece.pos)];
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