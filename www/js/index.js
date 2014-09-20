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
        })
        .state('test-vowel-false', {
            url: '/test-vowel-false',
            templateUrl: 'templates/partial-test-vowel-false.html'
        });
});

EFLApp.controller("TestVowelController", ['$window', '$scope', '$log', '$state', function($window, $scope, $log, $state){
  $scope.shuffleArray = function(arr){
    var new_arr = arr.slice(0);
    
    return new_arr.sort(function(){ return 0.5 - Math.random() });
  };
  
  $scope.questions = [
    { 
      vowel: "success", 
      media: [
        "success.mp3",
        "_success1.mp3",
        "_success2.mp3"
      ]
    },
    {
      vowel: "opportunity",
      media: [
        "opportunity.mp3",
        "_opportunity1.mp3",
        "_opportunity2.mp3"
      ]
    }
  ];
  
  $scope.question_number = 0;
  $scope.current_question = $scope.questions[$scope.question_number];
  $scope.current_answer = "";
  
  $scope.media_list_name = $scope.current_question.vowel;
  $scope.media_list = $scope.shuffleArray($scope.current_question.media);
  
  $scope.media_player = null;
  
  $scope.play = function(src){
    var audio_path = "www/audio/";
    var full_path = cordova.file.applicationDirectory + audio_path + src;
    $log.log("playing: " + full_path);
    
    if($scope.media_player !== null){
      $scope.media_player.release();
    }
    $scope.media_player = new Media(full_path);
    $scope.media_player.play();
  };
  
  $scope.playAt = function(index){
    $log.log("halo " + index);
    $log.log($scope.media_list[index]);
//    $window.alert(index);
    if( typeof cordova !== "undefined"){
      $scope.play($scope.media_list[index]);
    }
  };
  
  $scope.nextChar = function(start, offset){
    return String.fromCharCode(start.charCodeAt(0) + offset);
  };
  
  $scope.nextQuestion = function(){
    $scope.current_question++;
    if( $scope.current_answer.indexOf('_') < 0 ){
      $state.go('test-vowel-true');
    } else {
      $state.go('test-vowel-false');
    }
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
