(function () {
    'use strict';

    angular.module('tibialotteryApp')
        .controller('LoginController', loginController);

    loginController.$inject = ['$scope', '$http', '$sce', '$cookies', '$state', 'AccountService', 'UrlService'];

    function loginController($scope, $http, $sce, $cookies, $state, AccountService, UrlService) {
        var self = this;

        self.submitting = false;

        AccountService.getCurrentUserInformation(function (response) {
            response = response.data;
            if (response.success) {
                $state.go("account");
            }
        });

        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        self.login = function login() {
            self.submitting = true;
            self.error = '';
            if (!$scope.loginForm.$valid) {
                self.submitting = false;
                return;
            }

            $http({
                url: UrlService.account.POST.login,
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
                var expirationDate = new Date();
                if (response.user.rememberMe) {
                    expirationDate.setFullYear(expirationDate.getFullYear() + 2);
                } else {
                    expirationDate.setTime(expirationDate.getTime() + (1000 * 60 * 60 * 2)); // 2 hours
                }

                $cookies.putObject("user", response.user, {
                    expires: expirationDate
                });

                $state.go("account");
            });
        };
    }
})();
