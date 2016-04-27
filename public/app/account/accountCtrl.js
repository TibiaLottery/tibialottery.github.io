(function () {
	'use strict';

	angular.module('tibialotteryApp')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['$scope', '$state', '$mdDialog', '$mdToast', '$cookies', 'AccountService', 'LotteryService'];

	function AccountController($scope, $state, $mdDialog, $mdToast, $cookies, AccountService, LotteryService) {
		var self = this;

		self.lotteriesLoading = true;
		self.lotteries = [];
		self.changePassword = changePassword;
		self.logout = logout;
		$scope.user = null;
		$scope.loggedIn = false;
		$scope.noop = $.noop;

		$scope.trustAsHtml = function (value) {
			return $sce.trustAsHtml(value);
		};

		AccountService.getCurrentUserInformation(function (response) {
			response = response.data;
			if (!response.success) {
				$cookies.remove('user');
				$state.go('account.login');
				return;
			}

			$scope.loggedIn = true;
			$scope.user = response.user;
		});

		LotteryService.getLotteriesForCurrentUser(function (response) {
			response = response.data;
			if (!response.success) {
				return;
			}

			self.lotteries = response.lotteries;
			self.lotteriesLoading = false;
		});

		function changePassword() {
			$mdDialog.show({
				controller: ['$scope', '$mdDialog', 'AccountService', DialogController],
				templateUrl: '/build/templates/account/partials/changePassword.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true
			}).then(function (pw) {
				AccountService.changePassword(pw, function(response){
					response = response.data;
					var toast = $mdToast.simple().position("top right").action('OK').hideDelay(3000);
					if(!response.success){
						console.error(response);
						$mdToast.show(toast.content('An unknown error occurred while changing your password.'));
					}else{
						$mdToast.show(toast.content('Your password has been changed successfully!'));
					}
				});
			});
		}

		function logout() {
			var confirm = $mdDialog.confirm()
				.title('Are you sure you want to log out?')
				.ok('Yes')
				.cancel('No');

			$mdDialog.show(confirm).then(function () {
				AccountService.logout(function (response) {
					response = response.data;
					if (!response.success) {
						console.error(response);
						return;
					}

					$cookies.remove('user');
					$state.go('account.login');
				});
			});
		}

		return self;
	}

	function DialogController($scope, $mdDialog, AccountService) {
		$scope.oldPassword = "";
		$scope.newPassword = "";
		$scope.newPasswordConfirmation = "";
		$scope.errored = false;
		$scope.passwordMatchFail = false;

		$scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.change = function () {
			$scope.errored = false;
			if($scope.newPassword.length < 5) {
				$scope.errored = true;
				$scope.errorMessage = "The new password must have at least 5 characters.";
			}else if($scope.oldPassword.length === 0){
				$scope.errored = true;
				$scope.errorMessage = "You must enter your old password.";
			} else if ($scope.newPassword === $scope.newPasswordConfirmation) {
				AccountService.comparePassword($scope.oldPassword, function(match){
					if(match) {
						$mdDialog.hide({newPw: $scope.newPassword, oldPw: $scope.oldPassword});
					}else{
						$scope.errored = true;
						$scope.errorMessage = "The password you entered as your current password does not match your actual current password.";
					}
				});
			} else {
				$scope.errored = true;
				$scope.errorMessage = "The new password and confirmation do not match.";
			}
		};
	}
})();