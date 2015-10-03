angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['gameData', 'playerContext', 'squareData',
    function chessBoardViewDirective(gameData, players, squareData) {
      return {
        templateUrl: '/templates/boardContent.html',
        controller: function boardController($scope) {
          var squares = squareData.get();

          $scope.squares = squares.data();
          $scope.pieces = gameData.game.board.allPieces();

          return {
            game: gameData.game,
            players: players.setContext('console', 'ai'),
            selectedSquare: null,

            splicePiece: function (capture) {
              var idx = $scope.pieces.indexOf(capture);
              $scope.pieces.splice(idx, 1);
            },

            makeMove: function (idx) {
              var dest = idxToArr(idx),
                  capture = this.game.board.pieceAt(dest);

              // this.game.move(this.selectedSquare, dest);
              // this.selectedSquare = null;
              // this.resetProperty('selectable');
              // this.resetProperty('movable');
              // this.nextTurn();



              if (capture) {
                this.splicePiece(capture);
              }
            },

            nextTurn: function () {
              this.players.nextTurn(this);
            }
          }

          function arrToIdx(arr) {
            if (typeof arr !== "object") {
              return arr;
            }
            return arr[0] * 8 + arr[1];
          }

          function idxToArr(idx) {
            if (typeof idx === "object") {
              return idx;
            }
            return [Math.floor(idx / 8), idx % 8];
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