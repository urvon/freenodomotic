'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function AppCtrl($scope, $http,$cookieStore) {
  
}
app.controller('TriggerController', ['$scope', 'freedomotic', function ($scope, freedomotic) {
    freedomotic.get('triggers',{xml:true}).then(function (result) {
        $scope.datas = result;
    });
}]);

function TriggerController($scope, $modal, $log, freedomotic) {

}
app.controller('MenuController', ['$scope', '$http', 'freedomotic', function ($scope, $http, freedomotic) {
    // get number elements for each menu
    freedomotic.get("commands").then(function (result) {
        $scope.nbCmd = result.length;
    });
    freedomotic.get("objects").then(function (result) {
        $scope.nbObj = result.length;
    });
    freedomotic.get("plugins").then(function (result) {
        $scope.nbPlug = result.length;
    });
    freedomotic.get("environments").then(function (result) {
        $scope.nbZone = result.length;
    });
    freedomotic.get("triggers", { xml: true }).then(function (result) {
        $scope.nbTrigger = result.trigger.length;
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
