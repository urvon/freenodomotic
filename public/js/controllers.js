'use strict';

var app = angular.module('myApp.controllers', []);
/* Controllers */

function AppCtrl($scope, $http,$cookieStore) {
  
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

app.controller('LogViewerController', ['$scope', '$http', 'freedomotic', function ($scope, $http, freedomotic) {

}]);

app.controller('dndCtrl', ['$scope', 'someArrays', function ($scope, someArrays) {
    $scope.someArrays = someArrays;

    $scope.dropListener = function (eDraggable, eDroppable) {

        var isDropForbidden = function (aTarget, item) {
            if (aTarget.some(function (i) {
                return i.name == item.name;
            })) {
                return { reason: 'target already contains "' + item.name + '"' };
            } else {
                return false;
            }
        };

        var onDropRejected = function (error) {
            alert('Operation not permitted: ' + error.reason);
        };

        var onDropComplete = function (eSrc, item, index) {
            console.log('moved "' + item.name + ' from ' + eSrc.data('model') + '[' + index + ']' + ' to ' + eDroppable.data('model'));
        };

        var eSrc = eDraggable.parent();
        var sSrc = eSrc.data('model');
        var sTarget = eDroppable.data('model');

        if (sSrc != sTarget) {
            $scope.$apply(function () {
                var index = eDraggable.data('index');
                var aSrc = $scope.$eval(sSrc);
                var aTarget = $scope.$eval(sTarget);
                var item = aSrc[index];
                var error = isDropForbidden(aTarget, item);
                if (error) {
                    onDropRejected(error);
                } else {
                    aTarget.push(item);
                    aSrc.splice(index, 1);
                    onDropComplete(eSrc, item, index);
                }
            });
        }

    };
}]);
function dndCtrl($scope, $rootScope, $http, $location) {
}
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
