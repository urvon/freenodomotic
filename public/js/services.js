'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource']).
  value('version', '0.1');

services.factory('getFreedomoticDatas',['$http','$q',function($http,$q){
      //get commands
    var factory = {      
        query: function (url, postData) {
            //var deferred = $q.defer();
            //var promise = $http.post('/restApi/'+url,postData).success(function (data) {
            //    if (data.isDemo)
            //        $("#demoAlert").alert();
            //    else
            //        $("#demoAlert").hide();
            //    var result;
            //    if (data.list != null)
            //        result = data.list;
            //    else {
            //        for (var propName in data.data) {
            //            result = data.data[propName];
            //        }                      
            //    }
            //    deferred.resolve(result);
            //});
            //// Return the promise to the controller
            //return deferred.promise;

            var request = $http.post('/restApi/'+url,postData).then(function (data, status, headers, config) {
                  if (data.data.isDemo)
                      $("#demoAlert").alert();
                  else
                      $("#demoAlert").hide();
                  var result;
                  if (data.data.list != null)
                      result = data.data.list;
                  else {
                      for (var propName in data.data) {
                          result = data.data[propName];
                      }                      
                  }

                  return result;
              });
            return request;             
          },
          convert: function (data) {
              var request = $http.post('restApi/convert', data).then(function (dataConverted, status) {
                  return dataConverted;
              });
              return request; 
          }
    }
    return factory;
}]);

services.factory('freedomotic', ['$http', '$q', function ($http, $q) {
    //get commands
    var socket = io.connect('http://localhost:3333');

    var factory = {
        send: function (data) {
            socket.emit('cmd', data);
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

