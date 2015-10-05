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
  ])

  .directive('getMessage', [
    function getMessageDirective() {
      return {
        scope: true,
        link: function (scope, element, attrs) {
          scope.message = { content: '' };
          element.on('keydown', keydown);

          function keydown(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              scope.messages.push(scope.message);
              scope.message = { content: '' };
              scope.$apply();
            }
          }
        }
      }
    }
  ])