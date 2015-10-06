angular.module('ChessUIDirectives', [])
  .directive('chatBoxView', [
    function chatBoxViewDirective() {
      return {
        templateUrl: '/templates/chatBoxContent.html',
        scope: true,
        controller: ['$element', function (element) {
          this.scroll = function () {
            var messageDiv = element[0].children[0];
            messageDiv.scrollTop = messageDiv.scrollHeight;
          };
        }],

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
        require: '^chatBoxView',
        link: function (scope, element, attrs, ctrl) {
          scope.message = { content: '' };
          element.on('keydown', keydown);

          function keydown(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              scope.messages.push(scope.message);
              scope.message = { content: '' };
              scope.$apply();
              ctrl.scroll();
            }
          }
        }
      }
    }
  ])