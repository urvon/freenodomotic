'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp',
        ['myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ng-context-menu',
        'AngularStomp'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {   
    $routeProvider.when('/login', {templateUrl: 'partial/login', controller: LoginCtrl});
    $routeProvider.when('/administration', {templateUrl: 'partial/admin', controller: LoginCtrl});
    $routeProvider.when('/composants', {templateUrl: 'partial/objects', controller: ObjectController});
    $routeProvider.when('/administration/commandes', {templateUrl: 'partial/commands', controller: CommandController});
    $routeProvider.when('/administration/commandes/detail/:id', {templateUrl: 'partial/cmdDetail', controller: CmdDetailController});
    $routeProvider.otherwise({redirectTo: '/composants'});
    $locationProvider.html5Mode(true);
    Stomp.WebSocketClass = SockJS;
    //$httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common['X-CSRFToken'] = '{{ csrf_token|escapejs }}';
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    ////================================================
    //// Check if the user is connected
    ////================================================
    //var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    //  // Initialize a new promise
    //  var deferred = $q.defer();

    //  // Make an AJAX call to check if the user is logged in
    //  $http.get('http://localhost:8111/v2/environments/?media=json').success(function(user){
    //    // Authenticated
    //    if (user !== '0')
    //      $timeout(deferred.resolve, 0);

    //    // Not Authenticated
    //    else {
    //      $rootScope.message = 'You need to log in.';
    //      $timeout(function(){deferred.reject();}, 0);
    //      $location.url('/login');
    //    }
    //  });

    //  return deferred.promise;
    //};
    ////================================================
    ////================================================
    //// Add an interceptor for AJAX errors
    ////================================================
    //$httpProvider.responseInterceptors.push(function($q, $location) {
    //  return function(promise) {
    //    return promise.then(
    //      // Success: just return the response
    //      function(response){
    //        return response;
    //      }, 
    //      // Error: check the error status to get only the 401
    //      function(response) {
    //        if (response.status === 404)
    //          $location.url('/login');
    //        return $q.reject(response);
    //      }
    //    );
    //  }
    //});
    ////================================================

  }])
  