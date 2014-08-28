var EFLApp = angular.module('EFLApp', ['ui.router']);

EFLApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/start-screen');
    
    $stateProvider
        .state('start-screen', {
            url: '/start-screen',
            templateUrl: 'templates/partial-start-screen.html'
        })
        .state('main-menu', {
            url: '/main-menu',
            templateUrl: 'templates/partial-main-menu.html'
        })
        .state('sounds', {
            url: '/sounds',
            templateUrl: 'templates/partial-sounds.html'
        })
        .state('tests', {
            url: '/tests',
            templateUrl: 'templates/partial-tests.html'
        });
});