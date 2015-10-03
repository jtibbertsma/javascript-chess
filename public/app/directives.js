angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['playerContext', 'squareData', 'pieceData',
    function chessBoardViewDirective(playerContext, squareData, pieceData) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function boardController($scope) {
          var squares = squareData.get(),
              pieces = pieceData.get(),
              players = playerContext.setContext('console', 'ai');

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
            }
          }
        },

        link: function (scope, $element, attrs, ctrl) {
          attrs.$addClass("chess-board");
          ctrl.nextTurn();
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
            element.css('top', '' + 64 * piece.pos[0] + 'px');
            element.css('left', '' + 64 * piece.pos[1] + 'px');
          });
        }
      }
    }
  ])

  .directive('boardSquare', ['squareData',
    function boardSquareDirective(squareData) {
      var squares = squareData.get();
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
            if (!squares.clickable())
              return;

            if (ctrl.selectedSquare !== null && square.movable) {
              ctrl.makeMove(attrs.boardSquare);
            } else if (square.selectable) {
              squares.selectSquare(attrs.boardSquare);
            } else {
              squares.enableInput();
            }
          }
        }
      }
    }
  ]);