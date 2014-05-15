'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function callbackStomp(message){
    alert(message);
}

function AppCtrl($scope, $http,$cookieStore) {
  //$http({method: 'GET', url: '/api/name'}).
  //success(function(data, status, headers, config) {
  //  $scope.name = data.name;
  //}).
  //error(function(data, status, headers, config) {
  //  $scope.name = 'Error!'
  //});

  
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
        menus.push({name:"Plugins", url:"/plugin"});
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


//var myApp = angular.module('myApp.controllers',[]);

app.controller('LoginCtrl2', ['$scope','$http','$resource'/*,'UserService'*/, function($scope,$http,$resource,user) {
  var i = 5;
  
    //$scope.greeting = 'Hola!';
  ////var auth = $cookieStore.get('authdata')
  //var config = {headers: {
  //          'Authorization': 'Basic YWRtaW46YWRtaW4=',            
  //          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  //      }
  //  };
  //$http.defaults.headers.common['Authorization'] = "Basic YWRtaW46YWRtaW4=";   
//  $.getJSON('http://localhost:8111/v2/environments/?callback=?', 
//function(json) {
//    alert(json.photos[1].photoUrl);
//});
  //$.ajax({
  //              type: "GET",
  //              url: "http://localhost:8111/v2/environments/?media=json",
  //              contentType: "application/json",               
  //              dataType: "json",
  //              //data: "url=http://localhost:8111/v2/environments/?media=json",
  //              crossDomain: true,
  //              async: false,
  //              jsonp: false,
  //              jsonpCallback: "myJsonMethod",
  //              statusCode: {
  //                  200: function (data,toto,tee) {
  //                      alert('200: Authenticated');
  //                      // Bind the JSON data to the UI
  //                  },
  //                  401: function (data) {
  //                      alert('401: Unauthenticated');
  //                      // Handle the 401 error here.
  //                  }
  //              },
  //              //beforeSend: function (xhr) {
  //              //    xhr.setRequestHeader("Authorization", "Basic YWRtaW5pc3RyYXRvcjo=");
  //              //    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  //              //},
  //              success: function( response ){
  //                  alert('succes');
  //              },
  //              error: function( error, data, toto ){
  //                  alert(error);
  //              },
  //              complete: function(){
  //              }
  //          });


 //$http.get('http://localhost\:8111/v2/environments/?media=json',config).success(alert('succes')).error(alert('error'));
 //$http.get('http://localhost:8111/v2/environments/?media=json')
 //       .success(function(data) {
 //           $scope.name = data.name;
 //           alert('succes');
 //       })
 //       .error(function(data, status, headers, config,statusText ) {
 //           $scope.name = 'Error!'
 //           alert(status + '  ' + data);
 //   });
}]);
