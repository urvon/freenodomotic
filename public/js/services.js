'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource']).
  value('version', '0.1');

services.factory('objects',['$resource','$http',
  function($resource,$http){
      //return $http.get("/json/objects.json").succes(function(data){alert(data)});
      return $resource('/json/objects.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

services.factory('shortName', [function(name, length) {
    var shortName = name;
    if(name.length > length)
        shortName = shortName.substring(1,length) + '...';
    return shortName;
}]);

services.factory('ngstomp', ['$rootScope',function($rootScope) {
    var shortName = Stomp.overTCP('CELAD-P070', 61666);
}]);

