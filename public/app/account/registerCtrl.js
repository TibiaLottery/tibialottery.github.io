(function () {
  'use strict';

  angular.module('tibialotteryApp')
    .controller('RegisterController', registerController);

  registerController.$inject = ['$scope', '$http', '$sce', '$state', 'AccountService'];

  function registerController($scope, $http, $sce, $state, AccountService) {
    var self = this;

    self.submitting = false;
    self.register = register;
    self.reset = reset;

    AccountService.getCurrentUserInformation(function (response) {
      response = response.data;

      if (response.success) {
        $state.go("account");
      }
    });

    $scope.trustAsHtml = function (value) {
      return $sce.trustAsHtml(value);
    };

    function register() {
      self.submitting = true;
      self.error = '';
      if (!$scope.registerForm.$valid) {
        self.submitting = false;
        return;
      }

      $http({
        url: '/api/v1/account/register',
        method: 'POST',
        data: $scope.user
      }).then(function (response) {
        self.submitting = false;
        response = response.data;
        if (response.success === false) {
          self.error = response.message;
          return;
        }

        self.error = '';
      });
    }

    function reset() {
      if ($scope.user) {
        $scope.user.login = '';
        $scope.user.name = '';
        $scope.user.email = '';
      } else {
        $scope.user = {
          login: '',
          name: '',
          email: ''
        };
      }
    }

    return self;
  }
})();