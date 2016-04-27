(function () {
    angular.module('tibialotteryApp').service('UrlService', UrlService);

    function UrlService() {
        var self = this;

        self.account = {
            GET: {
                info: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-info'
            },
            POST: {
                login: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-login',
                logout: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-logout',
                changePassword: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-password-change',
                passwordCompare: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/account-password-compare'
            }
        };

        self.lottery = {
            GET: {
                byAccount: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/lottery-get-by-account',
                byID: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/lottery-get-by-id/'
            }
        };

        self.news = {
            GET: {
                recent: 'https://xmxuxh5tdg.execute-api.us-west-2.amazonaws.com/dev/news-get-recent',
                all: ''
            }
        };
    }
})();