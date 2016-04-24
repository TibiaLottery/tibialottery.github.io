(function () {
    angular.module('tibialotteryApp').service('UrlService', UrlService);

    function UrlService() {
        var self = this;

        self.account = {
            GET: {
                info: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-info'
            },
            POST: {
                login: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-login'
            }
        };

        self.lottery = {
            GET: {
                byAccount: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/lottery-get-by-account'
            }
        };
    }
})();