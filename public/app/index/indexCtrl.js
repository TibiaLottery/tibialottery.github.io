(function () {
	'use strict';

	angular.module('tibialotteryApp').controller('IndexController', indexController);

	indexController.$inject = ['NewsService'];

	function indexController(NewsService) {
		var self = this;
		self.newsLoaded = false;
		self.news = [];

		NewsService.getRecent(function(response) {
			self.news = response.data.news;
			self.newsLoaded = true;
		});
	}
})();