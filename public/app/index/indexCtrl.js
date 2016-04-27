(function () {
	'use strict';

	angular.module('tibialotteryApp').controller('IndexController', indexController);

	indexController.$inject = ['$sce', 'NewsService'];

	function indexController($sce, NewsService) {
		var self = this;
		self.news = [];

		NewsService.getRecent(function(response) {
			self.news = _.map(response.data.news, function(news) {
				console.log(news.Contents);
				news.Contents = $sce.trustAsHtml(news.Contents);
				return news;
			});

			console.log(self.news);
		});
	}
})();