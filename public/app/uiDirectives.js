angular.module('ChessUIDirectives', [])
  .directive('chatBoxView', [
    function chatBoxViewDirective() {
      return {
        templateUrl: '/templates/chatBoxContent.html',
        scope: true,
        link: function (scope, element, attrs) {
          scope.messages = [];
        }
      };
    }
  ]);