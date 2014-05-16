'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function callbackStomp(message){
    alert(message);
}

function AppCtrl($scope, $http,$cookieStore) {
  
}

app.controller('MenuController', ['$scope','$http','$resource', function($scope,$http,$resource) {
    var menus = [];
    if(false){
        menus.push({name:"Zones", url:"/Zones"});
        menus.push({name:"Composants", url:"/composants"});
        menus.push({name:"Plugins", url:"/Plugin"});
    }
    else{
        menus.push({name:"Zones", url:"/zones"});
        menus.push({name:"Composants", url:"/composants"});
        menus.push({name:"Plugins", url:"/plugins"});
        menus.push({name:"Commandes", url:"/administration/commandes"});
        menus.push({name:"Déclancheurs", url:"/triggers"});
    }

    $scope.menus = menus;
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
