(function () {
	'use strict';

	var app = angular.module('tibialotteryApp').controller('UserInfoPartialController', UserInfoPartialController);

	UserInfoPartialController.$inject = ['$rootScope', 'AccountService', '$sce'];

	function UserInfoPartialController($rootScope, AccountService, $sce) {
		var self = this;

		self.loading = true;
		self.loggedIn = false;
		self.trustAsHtml = $sce.trustAsHtml;

		refreshCurrengUserInformation();

		$rootScope.$on('$stateChangeSuccess', refreshCurrengUserInformation); //Just in case we log in or out or something...

		function refreshCurrengUserInformation(){
			AccountService.getCurrentUserInformation(function (response) {
				response = response.data;
				self.loading = false;
				if (!response.success) {
					self.loggedIn = false;
				}else{
					self.loggedIn = true;
					self.user = response.user;
				}
			});
		}

		return self;
	}
})();