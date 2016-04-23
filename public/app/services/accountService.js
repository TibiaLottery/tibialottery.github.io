(function () {
  angular.module('tibialotteryApp').service('AccountService', AccountService);

  AccountService.$inject = ['$http', '$cookies'];

  function AccountService($http, $cookies) {
    var self = this;

    self.getCurrentUserInformation = getCurrentUserInformation;
    self.comparePassword = comparePassword;
    self.changePassword = changePassword;
    self.logout = logout;

    function getCurrentUserInformation(callback) {
      $http({
        url: '/api/v1/account/info',
        method: 'GET'
      }).then(callback);
    }

    function logout(callback) {
      $cookies.remove("rememberMe");
      $http({
        url: '/api/v1/account/logout',
        method: 'GET'
      }).then(callback);
    }

    function comparePassword(pw, callback) {
      $http({
        url: '/api/v1/account/matchPassword',
        method: 'POST',
        data: {password: pw}
      }).then(function (response) {
        callback(response.data.match);
      });
    }

    function changePassword(passwordObject, callback) {
      $http({
        url: '/api/v1/account/changePassword',
        method: 'POST',
        data: {password: passwordObject}
      }).then(callback);
    }
  }
})();