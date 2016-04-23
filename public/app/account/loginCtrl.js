(function () {
	'use strict';

	angular.module('tibialotteryApp')
		.controller('LoginController', loginController);

	loginController.$inject = ['$scope', '$http', '$sce', '$cookies', '$state', 'AccountService'];

	function loginController($scope, $http, $sce, $cookies, $state, AccountService) {
		var self = this;

		self.submitting = false;

		AccountService.getCurrentUserInformation(function (response) {
			response = response.data;
			if (response.success) {
				$state.go("account");
			}
		});

		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};

		self.login = function login(){
			self.submitting = true;
			self.error = '';
			if(!$scope.loginForm.$valid){
				self.submitting = false;
				return;
			}

			$http({
				url: '/api/v1/account/login',
				method: 'POST',
				data: $scope.user
			}).then(function(response){
				self.submitting = false;
				response = response.data;
				if(response.success === false){
					self.error = response.message;
					return;
				}

				self.error = '';
				if(response.rememberMe){
					var expirationDate = new Date();
					expirationDate.setFullYear(expirationDate.getFullYear()+2);
					$cookies.put("rememberMe", response.rememberMe, {
						expires: expirationDate
					});
				}

				$state.go("account");
			});
		};
	}
})();