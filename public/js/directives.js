'use strict';

/* Directives */


var app = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

app.directive('myToggleObject', function () {
    return {
        link: function (scope, el, attrs) {
            scope.myToggleObject2 = function (value) {
                console.log("toto" + el);
                return "toto";
            }
        }
    }
});
