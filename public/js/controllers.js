'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function AppCtrl($scope, $http,$cookieStore) {
  
}

function DashBoardController($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    $('#container').highcharts({
        title: {
            text: 'Consomation électrique',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Consomation (kWh)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Total',
            data: [0.9, 2, 3.5, 8.4, 2.5, 17.0, 18.6, 10.9, 15.3, 9.0, 3.9, 1.0]
        }, {
            name: 'Cuisine',
            data: [0, 1, 2, 0, 2, 7, 17.0, 6.6, 10.2, 10.3, 2.6, 4.8]
        }]
    });
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
