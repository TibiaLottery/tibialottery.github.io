(function() {
  angular.module('tibialotteryApp')
    .directive('tlNewsEntry', tlNewsEntry);

  function tlNewsEntry() {
    var directive = {
      bindToController: true,
      controller: tlNewsEntryController,
      controllerAs: 'tlNewsEntryCtrl',
      restrict: 'E',
      scope: {
        data: '='
      },
      templateUrl: '/build/app/directives/tl-news-entry/tl-news-entry.html'
    };

    return directive;
  }

  tlNewsEntryController.$inject = ['$scope', '$sce'];

  function tlNewsEntryController($scope, $sce) {
    var self = this;
    self.date = '';

    $scope.$watch('tlNewsEntryCtrl.data', function() {
      self.data.Contents = $sce.trustAsHtml(self.data.Contents);

      var date = parseInt(self.data['Date Posted']);
      if (date && !isNaN(date)) {
        self.date = moment(date * 1000).format("MMMM Do YYYY");
      } else {
        self.date = '';
      }
    });
  }
})();