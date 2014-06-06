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
        'ui.bootstrap',
        'draganddrop'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {   
    $routeProvider.when('/', { templateUrl: 'partial/dashBoard', controller: DashBoardController });
    $routeProvider.when('/test', { templateUrl: 'partial/test', controller: dndCtrl });
    $routeProvider.when('/administration', {templateUrl: 'partial/admin', controller: LoginCtrl});
    $routeProvider.when('/composants', {templateUrl: 'partial/objects', controller: ObjectController});
    $routeProvider.when('/plugins', { templateUrl: 'partial/plugins', controller: PluginController });
    $routeProvider.when('/triggers', { templateUrl: 'partial/triggers', controller: TriggerController });
    $routeProvider.when('/administration/composant/:name', { templateUrl: 'partial/objDetail', controller: ObjDetailController });
    $routeProvider.when('/administration/commandes', { templateUrl: 'partial/commands', controller: CommandController });
    $routeProvider.when('/administration/commandes/detail/:id', {templateUrl: 'partial/cmdDetail', controller: CmdDetailController});
    $routeProvider.when('/administration/triggers/detail/:id', { templateUrl: 'partial/triggerDetail', controller: TriggerDetailController });

      //$routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
    Stomp.WebSocketClass = SockJS;
  }])
  