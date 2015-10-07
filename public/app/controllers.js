angular.module('ChessControllers', [])
  .controller('NotificationCtrl', ['$scope', '$rootScope', 'gameData',
    function NotificationCtrl($scope, $rootScope, gameData) {
      $scope.notifications = [{ message: '', important: false }];
      var fn1 = $rootScope.$on('game:nextTurn', notifyPlayer);
      var fn2 = $rootScope.$on('game:gameOver', gameOver);
      $scope.$on('$destroy', fn1);
      $scope.$on('$destroy', fn2);
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

      function gameOver(event, type, color, playerLost) {
        if (type === "checkmate") {
          notifyCheckmate(color, playerLost);
        } // handle stalemate
      }

      function notifyCheckmate(color, playerLost) {
        $scope.notifications = [];
        $scope.notifications.push({ message: color + ' is mated', important: false });
        if (playerLost) {
          $scope.notifications.push({ message: "You just got pwned!!", important: true });
        } else {
          $scope.notifications.push({ message: "Wow! You actually won!", important: false });
        }
      }
    }
  ])

  .controller('LabelCtrl', ['$scope',
    function LabelCtrl($scope) {
      $scope.underBoardLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      $scope.rightSideNumbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
    }
  ]);