(function () {
  angular.module('tibialotteryApp').service('LotteryService', LotteryService);

  LotteryService.$inject = ['$http'];

  function LotteryService($http) {
    var self = this;

    self.getLotteriesForCurrentUser = getLotteriesForCurrentUser;
    self.getLotteryById = getLotteryById;

    function getLotteriesForCurrentUser(callback) {
      $http({
        url: '/api/v1/lottery/getByAccount',
        method: 'GET'
      }).then(callback);
    }

    function getLotteryById(id) {
      return $http({
        url: '/api/v1/lottery/getById?id=' + id,
        method: 'GET'
      });
    }
  }
})();