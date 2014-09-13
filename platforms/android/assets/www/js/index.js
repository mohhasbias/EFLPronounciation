var EFLApp = angular.module('EFLApp', ['ui.router', 'ngAudio']);

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
        })
        .state('test-vowel', {
            url: '/test-vowel',
            templateUrl: 'templates/partial-test-vowel.html',
            controller: 'TestVowelController'
        })
        .state('test-vowel-true', {
            url: '/test-vowel-true',
            templateUrl: 'templates/partial-test-vowel-true.html'
        });
});

EFLApp.controller("TestVowelController", ['$window', '$scope', '$log', function($window, $scope, $log){
  $scope.media = null;
  
  $scope.play = function(src){
    var full_path = cordova.file.applicationDirectory + src;
    $log.log("playing: " + full_path);
    
    if($scope.media !== null){
      $scope.media.release();
    }
    $scope.media = new Media(full_path);
    $scope.media.play();
  };
}]);

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
