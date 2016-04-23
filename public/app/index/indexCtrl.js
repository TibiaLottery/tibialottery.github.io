(function () {
	'use strict';

	var app = angular.module('tibialotteryApp').controller('IndexController', indexController);

	indexController.$inject = ['$mdToast'];

	function indexController($mdToast) {
		var self = this;

		self.toast = function toast(){
			$mdToast.show(
				$mdToast.simple()
					.content('Would you like some toast?')
					.position("top right")
					.action('OK')
					.hideDelay(3000)
			);
		};
	}
})();