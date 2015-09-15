'use strict';

angular.module('keepballin')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        views: {
          '': {
            templateUrl: 'app/account/settings/settings.html',
            controller: 'SettingsCtrl',
            authenticate: true
          },
          'teamsignup@settings': {
            templateUrl: 'app/account/settings/temp/team/team.signup.html',
            authenticate: true
          }
        }
      })
      .state('settings.info', {
        url: '/teaminfo',
        templateUrl: 'app/account/settings/temp/team/team.info.html',
        authenticate: true
      })
      .state('settings.member', {
        url: '/teammember',
        templateUrl: 'app/account/settings/temp/team/team.member.html',
        authenticate: true
        
      })
      .state('settings.represent', {
        url: '/teamrepresent',
        templateUrl: 'app/account/settings/temp/team/team.represent.html',
        authenticate: true
      })
    $urlRouterProvider.otherwise('/settings');
  });