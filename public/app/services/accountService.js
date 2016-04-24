(function () {
  angular.module('tibialotteryApp').service('AccountService', AccountService);

  AccountService.$inject = ['$http', '$cookies', 'UrlService'];

  function AccountService($http, $cookies, UrlService) {
    var self = this;

    self.getCurrentUserInformation = getCurrentUserInformation;
    self.comparePassword = comparePassword;
    self.changePassword = changePassword;
    self.logout = logout;

    function getCurrentUserInformation(callback) {
      $http({
        url: UrlService.account.GET.info,
        method: 'GET'
      }).then(callback);
    }

    function logout(callback) {
      $cookies.remove("user");
      $http({
        url: UrlService.account.POST.logout,
        method: 'POST'
      }).then(callback);
    }

    function comparePassword(pw, callback) {
      $http({
        url: UrlService.account.POST.passwordCompare,
        method: 'POST',
        data: {password: pw}
      }).then(function (response) {
        callback(response.data.match);
      });
    }

    function changePassword(passwordObject, callback) {
      $http({
        url: UrlService.account.POST.changePassword,
        method: 'POST',
        data: {password: passwordObject}
      }).then(callback);
    }
  }
})();