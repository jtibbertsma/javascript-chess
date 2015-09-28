angular.module('ChessDirectives', [])
  .directive('chessBoardView', ['boardData',
    function chessBoardViewDirective(boardData) {
      function link(scope, element, attrs) {

      }

      return {
        link: link
      };
    }
  ]);