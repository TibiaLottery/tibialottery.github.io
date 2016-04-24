(function () {
    'use strict';

    var app = angular.module('tibialotteryApp', ['ui.router', 'ngMaterial', 'ngCookies', 'ngAnimate']);

    app.config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('grey');
    }]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    '': {
                        templateUrl: '/build/templates/index/index.html',
                        controller: 'IndexController',
                        controllerAs: 'indexCtrl'
                    }
                }
            })
            .state('news', {
                url: '/news',
                views: {
                    '': {
                        template: 'What\'s new? Haha, get it? New? Like news?'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('lottery', {
                url: '/lottery',
                views: {
                    '': {
                        template: 'Lottery stuff'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('lotteryView', { //This sucks, but I did it for URL compatibility with the original TibiaLottery
                url: '/view/:lotteryId',
                views: {
                    '': {
                        templateUrl: '/build/templates/lotteries/view.html',
                        controller: 'LotteryViewController',
                        controllerAs: 'lotteryViewCtrl'
                    }
                }
            })
            .state('stats', {
                url: '/stats',
                views: {
                    '': {
                        template: 'Statistics stuff'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('faq', {
                url: '/faq',
                views: {
                    '': {
                        template: 'Frequently asked questions'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                views: {
                    '': {
                        template: 'Contact information'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('account', {
                url: '/account',
                views: {
                    '': {
                        templateUrl: '/build/templates/account/account.html',
                        controller: 'AccountController',
                        controllerAs: 'accountCtrl'
                    }
                }
            })
            .state('account.login', {
                url: '/login',
                views: {
                    '@': {
                        templateUrl: '/build/templates/account/login.html',
                        controller: 'LoginController',
                        controllerAs: 'loginCtrl'
                    }
                }
            })
            .state('account.login.reset', {
                url: '/reset',
                views: {
                    '@': {
                        template: 'Reset password'//,
                        //controller: 'NoteListCtrl'
                    }
                }
            })
            .state('account.register', {
                url: '/register',
                views: {
                    '@': {
                        templateUrl: '/build/templates/account/register.html',
                        controller: 'RegisterController',
                        controllerAs: 'registerCtrl'
                    }
                }
            });
    }]);

    app.run(['$rootScope', '$state', '$http', '$cookies', function ($rootScope, $state, $http, $cookies) {
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeSuccess', function() {
            var user = $cookies.getObject('user');
            if (user && user.authToken) {
                $http.defaults.headers.common['auth-token'] = user.authToken;
            } else {
                $http.defaults.headers.common['auth-token'] = null;
            }
        });
    }]);
})();
