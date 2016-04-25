(function() {
  angular.module('tibialotteryApp')
    .directive('tlCountdown', tlCountdown);

  function tlCountdown() {
    var directive = {
      bindToController: true,
      controller: TlCountdownController,
      controllerAs: 'tlCountdownCtrl',
      restrict: 'E',
      scope: {
        date: '='
      },
      templateUrl: '/build/app/directives/tl-countdown/tl-countdown.html'
    };

    return directive;
  }

  TlCountdownController.$inject = ['$scope', '$interval'];

  function TlCountdownController($scope, $interval) {
    var self = this;

    self.countdownTimes = {};
    self.extraClass = '';

    $scope.$watch('tlCountdownCtrl.date', function() {
      updateCountdownTimes();
    });

    $interval(function() {
      updateCountdownTimes();
    }, 1000);

    function updateCountdownTimes() {
      var difference = (self.date - new Date()) / 1000;

      if (difference < 1) {
        self.countdownTimes = null;
      }

      self.countdownTimes = {};

      var secondsInAYear = 3.154e+7;
      difference = addTimeToInterval(difference, secondsInAYear, 'year');

      var secondsInAMonth = 2.628e+6;
      difference = addTimeToInterval(difference, secondsInAMonth, 'month');

      var secondsInAWeek = 604800;
      difference = addTimeToInterval(difference, secondsInAWeek, 'week');

      var secondsInADay = 86400;
      difference = addTimeToInterval(difference, secondsInADay, 'day');

      var secondsInAnHour = 3600;
      difference = addTimeToInterval(difference, secondsInAnHour, 'hour');

      var secondsInAMinute = 60;
      difference = addTimeToInterval(difference, secondsInAMinute, 'minute');

      var secondsInASecond = 1;
      addTimeToInterval(difference, secondsInASecond, 'second');

      if(unitNotPresent('year') && unitNotPresent('month')) {
        self.extraClass = 'big';

        if(unitNotPresent('week') && unitNotPresent('day')) {
          self.extraClass = 'biggest';
        }
      }
    }

    function addTimeToInterval(difference, secondsInUnit, unitSingular) {
      if (difference > secondsInUnit) {
        var unitTime = Math.floor(difference / secondsInUnit);
        self.countdownTimes[unitSingular + (unitTime > 1 ? 's' : '')] = unitTime;

        difference -= secondsInUnit * unitTime;
      }

      return difference;
    }

    function unitNotPresent(unit) {
      return self.countdownTimes[unit] === undefined && self.countdownTimes[unit + 's'] === undefined;
    }
  }
})();