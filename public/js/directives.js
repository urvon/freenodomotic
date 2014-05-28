'use strict';

/* Directives */


var app = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

//app.directive('myToggleObject', function () {
//    return function (scope, element, attrs) {
//        element.on('click', function (event, toto) {
            
//        });
//    }
//});

app.directive('myObject', function ($timeout, $location, freedomotic) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {obj:"@",name:'@', icon:'@', uuid:'@'},
        templateUrl: 'component/myObject',
        link: function (scope, element, attr) {
            //$('.slider').slider();            
            scope.turnOn = function (object) {               
                freedomotic.send(getToggleData(scope.obj));

                $("#btn-on-" + scope.uuid).addClass("btn-success");
                $("#btn-off-" + scope.uuid).removeClass("btn-success");
                $("#img-" + scope.uuid).attr("src", "/img/freedomotic/light-on.png");
            }
            scope.turnOff = function (object) {
                freedomotic.send(getToggleData(scope.obj));

                $("#btn-off-" + scope.uuid).addClass("btn-success").attr("ng-disabled", "true");
                $("#btn-on-" + scope.uuid).removeClass("btn-success");
                $("#img-" + scope.uuid).attr("src", "/img/freedomotic/light-off.png");
            }
            scope.edit = function (name) {
                $location.path('/administration/composant/' + scope.name)
            }

        }
    };

    function getToggleData(obj) {
        var object = JSON.parse(obj);
        return {
            event: 'ObjectReceiveClick',
            payload: [{
                attr: 'click',
                value: 'SINGLE_CLICK'
            }, {
                attr: 'object.type',
                value: object.type
            }, {
                attr: 'object.name',
                value: object.name
            }],
            target: '/topic/VirtualTopic.app.event.sensor.object.behavior.clicked'
        }
    }
});
