'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function AppCtrl($scope, $http,$cookieStore) {
  
}

app.controller('MenuController', ['$scope', '$http', 'getFreedomoticDatas', function ($scope, $http, getFreedomoticDatas) {
    // get number elements for each menu
    getFreedomoticDatas.query("commands", { json: true }).then(function (result) {
        $scope.nbCmd = result.length;
    });
    getFreedomoticDatas.query("objects", { json: true }).then(function (result) {
        $scope.nbObj = result.length;
    });
    getFreedomoticDatas.query("plugins", { json: true }).then(function (result) {
        $scope.nbPlug = result.length;
    });
    getFreedomoticDatas.query("environments", { json: true }).then(function (result) {
        $scope.nbZone = result.length;
    });
}]);

app.controller('AdminController', ['$scope','$http','$resource', function($scope,$http,$resource) {

}]);

function LoginCtrl($scope, $rootScope, $http, $location) {
}
LoginCtrl.$inject = [];

function CommandController($scope, $rootScope, $http, $location) {
}
CommandController.$inject = [];

function CmdDetailController($scope, $rootScope, $http, $location) {
}
CmdDetailController.$inject = [];

function ObjectController($scope, $rootScope, $http, $location) {
}
ObjectController.$inject = [];

function ObjDetailController() {
}


function PluginController($scope, $rootScope, $http, $location) {
}
PluginController.$inject = [];

///**********************************************************************
// * Login controller
// **********************************************************************/
//app.controller('LoginCtrl',['$scope', '$rootScope', '$http', '$location',function($scope, $rootScope, $http, $location) {
//  // This object will be filled by the form
//  $scope.user = {};

//  // Register the login() function
//  $scope.login = function(){
//    $http.post('/login', {
//      username: $scope.user.username,
//      password: $scope.user.password
//    })
//    .success(function(user){
//      // No error: authentication OK
//      $rootScope.message = 'Authentication successful!';
//      $location.url('/admin');
//    })
//    .error(function(){
//      // Error: authentication failed
//      $rootScope.message = 'Authentication failed.';
//      $location.url('/login');
//    });
//  };
//}]);
