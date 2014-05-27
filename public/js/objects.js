var app = angular.module('myApp.controllers');

app.controller('ObjectController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
   
    var socket = io.connect('http://localhost:3333');
    socket.on('event', function (data) {
        alert('received data');
    });

    socket.on('getObject', function (data) {
        alert('received data');
    });


    //Get Zones
    var zones;
    var objectsByZone = [];
    $http.get('/json/environments.json').
    success(function(data, status, headers, config) {
        zones = data.list[0].zones;
        $(".alert").alert();

          //Get objects
        $http.get('/json/objects.json').
        success(function(data, status, headers, config) {
            var objects = data.list;
            //foreach objects
            for(var i = 0; i < objects.length; i++)
            {
                //foreach zones
                for(var j = 0; j < zones.length; j++)
                {                    
                    if(zones[j].objects.length > 0){
                        if(i==0)
                        {
                            var el = {name: zones[j].name, objects: []};
                            objectsByZone.push(el);
                        }

                        //foreach object in zone
                        for(var k = 0; k < zones[j].objects.length; k++)
                        {                             
                            //if zone contains object
                            if(objects[i].name == zones[j].objects[k].name)
                            {
                                //var obj = {objects: objects[i]}
                                for(var l = 0; l < objectsByZone.length; l++)
                                {
                                    if(objectsByZone[l].name == zones[j].name)
                                    {
                                        objectsByZone[l].objects.push(objects[i]);
                                    }
                                }                                 
                            }
                        }
                    }
                    
                }                
            }
          $scope.objects = objects;
          $scope.zones = objectsByZone;
          $scope.title = 'Composants';
        }).
        error(function(data, status, headers, config) {
          // log error
        });
    }).
    error(function(data, status, headers, config) {
      $(".alert-danger").alert();
    });

    

/*================ Events ==========================*/
    $scope.turnOn = function(object){
                
        socket.emit('cmd', GetToggleData(object));
            
        $("#btn-on-" + object.uuid).addClass("btn-success");
        $("#btn-off-" + object.uuid).removeClass("btn-success");
        $("#img-" + object.uuid).attr("src", "/img/freedomotic/light-on.png");
    }
    $scope.turnOff = function (object) {
        socket.emit('cmd', GetToggleData(object));

        $("#btn-off-" + object.uuid).addClass("btn-success").attr("ng-disabled","true");
        $("#btn-on-" + object.uuid).removeClass("btn-success");
        $("#img-" + object.uuid).attr("src","/img/freedomotic/light-off.png");
    }
    $scope.edit = function (name) {
        $location.path('/administration/composant/' + name)
    }
/*=============================================*/
}]);

function GetToggleData(object) {
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

app.controller('ObjDetailController', ['$scope', '$routeParams','getFreedomoticDatas', function ObjDetailController($scope, $routeParams,getFreedomoticDatas) {
    //getFreedomoticDatas.query("triggers").then(function (result) {
    //    $scope.datas = result;
    //})

    getFreedomoticDatas.query("objects", { suffixe: $routeParams.name, json: true }).then(function (result) {
        $scope.datas = result;
        $scope.jsonDatas = JSON.stringify(result);
    })
    //getFreedomoticDatas.convert()
    //{
    //    $scope.xmlDatas

    //}

    $scope.name = $routeParams.object;

    /*================ Events ==========================*/
    $scope.submit = function () {
        
    }
    /*==================================================*/
}]);