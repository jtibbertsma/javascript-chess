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

  .directive('boardPiece', ['pieceUrls', 'coordConversions',
    function boardPieceDirective(pieceUrls, coordConversions) {
      var arrToIdx = coordConversions.arrToIdx;
      return {
        link: function (scope, element, attrs) {
          var piece = scope.piece,
              square, selectable;
          getSquare();

          scope.src = pieceUrls.get(piece);
          attrs.$addClass('piece');

          scope.enter = enter;
          scope.leave = leave;

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
            console.log("enter");
          }

          function leave() {
            console.log("leave");
          }
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

            if (ctrl.selectedSquare !== null && square.highlighted) {
              ctrl.makeMove(attrs.boardSquare);
            } else {
              squares.enableInput();
            }
          }
        }
      }
    }
  ]);