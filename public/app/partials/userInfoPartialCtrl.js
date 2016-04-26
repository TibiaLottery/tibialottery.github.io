(function () {
	'use strict';

	var app = angular.module('tibialotteryApp').controller('UserInfoPartialController', UserInfoPartialController);

	UserInfoPartialController.$inject = ['$rootScope', '$cookies', '$sce'];

	function UserInfoPartialController($rootScope, $cookies, $sce) {
		var self = this;

		self.loading = false; //Keeping this around in case we need to make this async again for some reason
		self.loggedIn = false;
		self.trustAsHtml = $sce.trustAsHtml;

		refreshCurrengUserInformation();

		$rootScope.$on('$stateChangeSuccess', refreshCurrengUserInformation); //Just in case we log in or out or something...

		function refreshCurrengUserInformation(){
			self.user = $cookies.getObject('user');
			self.loggedIn = !!self.user;
		}

		return self;
	}
})();