'use strict';

/* Directives */


var app = angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


app.directive('myObject', function ($timeout, $location, freedomotic) {
    return {
        priority: -1000,
        restrict: 'E',
        transclude: true,
        scope: {obj:"@",name:'@', icon:'@', uuid:'@',type:'@', pattern:'@'},
        templateUrl: 'component/myObject',
        link: function (scope, element, attr) {
            //$('.slider').slider();
            attr.$observe('obj', function (value) {
                if (value) {
                    initValue(scope.obj);
                }
            });
            scope.rolling = function(object,state,el){
                setState(object, "rolling", state);
            }
            scope.turnOn = function (object) {               
                freedomotic.send(getToggleData(scope.obj));
                setState(JSON.parse(scope.obj), "powered", true);
            }
            scope.turnOff = function (object) {
                freedomotic.send(getToggleData(scope.obj));
                setState(JSON.parse(scope.obj), "powered", false);
            }
            scope.edit = function (name) {
                $location.path('/administration/composant/' + scope.name)
            }

        }
    };

    function initValue(object) {
        var obj = JSON.parse(object);
        for (var i in obj.behaviors) {
            var behavior = obj.behaviors[i]
            if (behavior != null) {
                setState(obj, behavior.name, behavior.value);
            }
        }
    }

    function setState(object, behaviourType, behaviourValue) {
        switch (behaviourType) {
            case "powered":
                if (behaviourValue) {
                    $("#btn-on-" + object.uuid).addClass("btn-success");
                    $("#btn-off-" + object.uuid).removeClass("btn-danger");
                    $("#img-" + object.uuid).attr("src", "/img/freedomotic/light-on.png");
                }
                else {
                    $("#btn-off-" + object.uuid).addClass("btn-danger").attr("ng-disabled", "true");
                    $("#btn-on-" + object.uuid).removeClass("btn-success");
                    $("#img-" + object.uuid).attr("src", "/img/freedomotic/light-off.png");
                }
                break;
            case "open":
                if (!behaviourValue) {
                    $("#img-" + object.uuid).attr("src", "/img/freedomotic/door-open.png");
                }
                else {
                    $("#img-" + object.uuid).attr("src", "/img/freedomotic/door-closed.png");
                }
                break;
            case "rolling":
                switch (behaviourValue) {
                    case -1:
                        $("#btn-down-" + object).addClass("btn-success");
                        $("#btn-up-" + object).removeClass("btn-success");
                        $("#btn-middle-" + object).removeClass("btn-success");
                        break;

                    case 1:
                        $("#btn-up-" + object).addClass("btn-success");
                        $("#btn-middle-" + object).removeClass("btn-success");
                        $("#btn-down-" + object).removeClass("btn-success");
                        break;
                    default:
                        $("#btn-middle-" + object).addClass("btn-success");
                        $("#btn-up-" + object).removeClass("btn-success");
                        $("#btn-down-" + object).removeClass("btn-success");
                        break;
                }
                break;
            default:
        }
        
    }

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

app.directive('myWidget', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: { },
        templateUrl: 'component/myWidget',
        link: function (scope, element, attr) {
            scope.close = function ($event) {
                $event.target.parentElement.parentElement.remove();
            }
        },
        add: function (scope, element, attr) {
            element.append('<my-widget><my-object obj="scope"/></my-widget>');
        }
    };
});

app.directive('mychart', function (version) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            $('#container').highcharts({
                title: {
                    text: 'Consomation �lectrique',
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
                    valueSuffix: '�C'
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
    }

});

app.directive('uiDraggable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: true
            });
        }
    };
});

app.directive('uiDropListener', function () {
    return {
        restrict: 'A',
        link: function (scope, eDroppable, attrs) {
            eDroppable.droppable({
                drop: function (event, ui) {
                    var fnDropListener = scope.$eval(attrs.uiDropListener);
                    if (fnDropListener && angular.isFunction(fnDropListener)) {
                        var eDraggable = angular.element(ui.draggable);
                        fnDropListener(eDraggable, eDroppable, event, ui);
                    }
                }
            });
        }
    };
});