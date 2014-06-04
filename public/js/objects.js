var app = angular.module('myApp.controllers');

app.controller('ObjectController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //$('.slider').slider();
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
    
    
/*=============================================*/
}]);

app.controller('ObjDetailController', ['$scope', '$routeParams', 'freedomotic', function ObjDetailController($scope, $routeParams, freedomotic) {
    freedomotic.get('objects', { suffixe: 'livingroom light', json: true }).then(function (result) {
        $scope.datas = result;
        $scope.jsonDatas = JSON.stringify(result);
    });

    $scope.name = $routeParams.object;

    /*================ Events ==========================*/
    $scope.submit = function () {
        
    }
    /*==================================================*/
}]);