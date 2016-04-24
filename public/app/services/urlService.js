(function () {
    angular.module('tibialotteryApp').service('UrlService', UrlService);

    function UrlService() {
        var self = this;

        self.account = {
            info: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-info'
        };
    }
})();