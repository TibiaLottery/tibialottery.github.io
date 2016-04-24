(function () {
  angular.module('tibialotteryApp').service('LotteryService', LotteryService);

  LotteryService.$inject = ['$http', 'UrlService'];

  function LotteryService($http, UrlService) {
    var self = this;

    self.getLotteriesForCurrentUser = getLotteriesForCurrentUser;
    self.getLotteryById = getLotteryById;

    function getLotteriesForCurrentUser(callback) {
      $http({
        url: UrlService.lottery.GET.byAccount,
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