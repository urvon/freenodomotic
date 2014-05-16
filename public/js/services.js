'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource']).
  value('version', '0.1');

services.factory('getFreedomoticDatas',['$http',function($http){
      //get commands
    var factory = {      
          query: function (type) {
              var request = $http.get('/restApi/'+type).then(function (data, status, headers, config) {
                  if (data.data.isDemo)
                      $("#demoAlert").alert();
                  else
                      $("#demoAlert").hide();
                  return data.data.list;
              });
              return request;             
          }
    }
    return factory;
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

