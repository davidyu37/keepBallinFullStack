'use strict';

angular.module('keepballin')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': '首頁',
      'link': '/',
      'icon': 'glyphicon-home'
    },
    {
      'title': '球場',
      'link': '/courts',
      'icon': 'glyphicon-map-marker'
    },
    {
      'title': '活動',
      'link': '/events',
      'icon': 'glyphicon-bullhorn'
    },
    {
      'title': '聯絡',
      'link': '/register',
      'icon': 'glyphicon-envelope'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });