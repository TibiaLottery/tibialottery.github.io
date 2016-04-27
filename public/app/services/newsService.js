(function () {
    angular.module('tibialotteryApp').service('NewsService', NewsService);

    NewsService.$inject = ['$http', 'UrlService'];

    function NewsService($http, UrlService) {
        var self = this;

        self.getRecent = getRecent;

        function getRecent(callback) {
            $http({
                url: UrlService.news.GET.recent,
                method: 'GET'
            }).then(callback);
        }
    }
})();