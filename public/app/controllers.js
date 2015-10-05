angular.module('ChessControllers', [])
  .controller('NotificationCtrl', ['$scope', '$rootScope', 'gameData',
    function NotificationCtrl($scope, $rootScope, gameData) {
      $scope.notifications = [{ message: '', important: false }];
      var fn1 = $rootScope.$on('game:nextTurn', notifyPlayer);
      $scope.$on('$destroy', fn1);
      var game = gameData.game;

      function notifyPlayer(event, color) {
        handleNextPlayer(color);
        checkForCheck(color);
      }

      function handleNextPlayer(color) {
        doNotify(color + ' to play', 0, false);
      }

      function checkForCheck(color) {
        if (game.inCheck(color)) {
          doNotify(color + ' is in check!', 1, true);
        } else if ($scope.notifications.length === 2) {
          $scope.notifications.splice(1,1);
        }
      }

      function doNotify(message, index, important) {
        var notif = { message: message, important: important };
        if ($scope.notifications.length === index) {
          $scope.notifications.push(notif);
        } else {
          $scope.notifications[index] = notif;
        }
      }
    }
  ]);