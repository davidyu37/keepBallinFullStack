'use strict';

angular.module('keepballin')
  .controller('PreferenceCtrl', ['$scope', 'User', 'Auth', function ($scope, User, Auth) {
  	$scope.user = Auth.getCurrentUser();
    console.log($scope.user);

    $scope.positions = [
      '控球後衛',
      '得分後衛',
      '小前鋒',
      '大前鋒',
      '中鋒'
    ];
    // $scope.positions = [
    //   {
    //     abbr: 'PG',
    //     english: 'Point Guard',
    //     chinese: '控球後衛'
    //   },
    //   {
    //     abbr: 'SG',
    //     english: 'Shooting Guard',
    //     chinese: '得分後衛'
    //   },
    //   {
    //     abbr: 'SF',
    //     english: 'Small Forward',
    //     chinese: '小前鋒'
    //   },
    //   {
    //     abbr: 'PF',
    //     english: 'Power Forward',
    //     chinese: '大前鋒'
    //   },
    //   {
    //     abbr: 'C',
    //     english: 'Center',
    //     chinese: '中鋒'
    //   }
    // ];

    // $scope.changeEmail = function(form) {
    //   $scope.submitted = true;
    //   if(form.$valid) {
    //     Auth.changeEmail($scope.user.email)
    //     .then( function() {
    //       $scope.message = '密碼更新成功';
    //     })
    //     .catch( function() {
    //       $scope.errors.other = '密碼錯誤';
    //       $scope.message = '';
    //     });
    //   }
	   // };
  }]);//NameCtrl ends 