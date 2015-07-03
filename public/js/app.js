'use strict';

// Declare angular app top level

angular.module('lobbycitoyen',  [
  'ngLocale', 
  'ngResource',
  'ngRoute', 
  'ngSanitize',
  'ui.bootstrap', 
  'lobbycitoyen.vendorService',
  'lobbycitoyen.user_controller',
  'lobbycitoyen.document_controller', 
  'lobbycitoyen.voteRest',
  'lobbycitoyen.UserService',
  'lobbycitoyen.Socket',
  'n3-pie-chart',
  'LocalStorageModule'
  ]).
  config(['$localeProvider','$routeProvider', '$locationProvider','$sceDelegateProvider', '$sceProvider', function($localeProvider,$routeProvider, $locationProvider, $sceDelegateProvider,$sceProvider ) {
    $routeProvider.
 	   when('/', {
        templateUrl: '/../partials/vote/list',
        controller: HomeCtrl
      }).
      when('/login', {
         templateUrl: '/partials/user/login',
        controller: UserCtrl
      }).
       when('/signup', {
        templateUrl: '/partials/user/signup',
        controller: UserCtrl
      }).
      when('/me/account', {
        templateUrl: '/partials/user/account',
        controller: UserProfileCtrl
      }).
      when('/doc/create', {
        templateUrl: '/partials/document/new',
        controller: VoteCtrl
      }).
      when('/server/:id', {
        // match doc, doc_editor
        templateUrl: '/../partials/vote/single',
        controller: PlayerCtrl
      }).
      when('#_=_', {
        redirectTo: '/'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
     // $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?soundcloud\.com/.+$')]);

      //console.log($localeProvider)
      $sceProvider.enabled(false);
   //  $sceDelegateProvider.resourceUrlWhitelist(['*']);
    }
  ]).run(function () {
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}).config( function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});