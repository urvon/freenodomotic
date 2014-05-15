angular.module('myApp.controllers').controller('ObjectController', ['objects','$scope','$http','ngstomp', function(objects,$scope,$http,ngstomp) {
    var freedomsocket = io.connect('http://0.0.0.0:61614');
    freedomsocket.on('event', function (data) {
        alert('received data');
    }); 
    freedomsocket.emit('/topic/VirtualTopic.app.event.sensor.object.behavior.clicked/','eezezez');
        
    var socket = io.connect('http://localhost:3333');
    socket.on('event', function (data) {
        alert('received data');
    });

    //Get Zones
    var zones;
    var objectsByZone = [];
    $http.get('/json/environements.json').
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
                
        socket.emit('cmd', { target: '/queue/app.event.sensor.object.behavior.clicked',
                             message: '<it.freedomotic.api.events.ObjectReceiveClick>'
  +'<sender>PHPFreedomSensor</sender>'
  +'<payload>'
    +'<payload>'
      +'<it.freedomotic.reactions.Statement>'
        +'<logical>AND</logical>'
        +'<attribute>Object</attribute>'
        +'<operand>EQUAL</operand>'
        +'<value>Kitchen Light</value>'
      +'</it.freedomotic.reactions.Statement>'
      +'<it.freedomotic.reactions.Statement>'
       +' <logical>AND</logical>'
        +'<attribute>click</attribute>'
       +' <operand>EQUAL</operand>'
        +'<value>SINGLE_CLICK</value>'
      +'</it.freedomotic.reactions.Statement>'
    +'</payload>'
  +'</payload>'
+'</it.freedomotic.api.events.ObjectReceiveClick>' });
    }
    $scope.turnOff = function(object){
        alert(object.name + ' turn off');
    }
/*=============================================*/
}]);