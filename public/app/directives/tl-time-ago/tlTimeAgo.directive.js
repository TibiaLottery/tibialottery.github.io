(function() {
  angular.module('tibialotteryApp')
    .directive('tlTimeAgo', tlTimeAgo);

  function tlTimeAgo() {
    var directive = {
      bindToController: true,
      controller: TlTimeAgoController,
      controllerAs: 'tlTimeAgoCtrl',
      restrict: 'E',
      scope: {
        date: '=',
        reverse: '='
      },
      templateUrl: '/app/directives/tl-time-ago/tl-time-ago.html'
    };

    return directive;
  }

  TlTimeAgoController.$inject = ['$scope', '$interval'];

  function TlTimeAgoController($scope, $interval) {
    var self = this;
    var divisors = [1000, 60, 60, 24, 30, 12]; //This array is how much time goes into each unit. 1000 ms in a second, 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day, etc.
    var timeMarkers = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year']; //This array is the short form of whatever unit of time we're outputting. This should always be 1 element longer than the divisor array because of how the loop works.

    self.timeAgo = '';

    $scope.$watch('tlCountdownCtrl.date', function() {
      self.timeAgo = convertToShortTime(self.date);
    });

    $interval(function() {
      self.timeAgo = convertToShortTime(self.date);
    }, 30000);

    function convertToShortTime(input){
      var timeAgo;
      var negative = false;
      if(self.reverse) {
        timeAgo = input - new Date();
      } else {
        timeAgo = new Date() - input;
      }

      if (timeAgo < 0) {
        timeAgo *= -1;
        negative = true;
      }

      var index = 0;
      while(timeAgo > divisors[index]){
        timeAgo /= divisors[index];
        index++;
      }

      timeAgo = Math.floor(timeAgo);
      return (negative ? '-' : '') + timeAgo + ' ' + timeMarkers[index] + (timeAgo !== 1 ? 's' : '') + (!self.reverse ? ' ago' : '');
    }
  }
})();
