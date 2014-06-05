'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', ['ngResource']).
  value('version', '0.1');

services.factory('freedomotic', ['$http', '$q', function ($http, $q) {
    //get commands
    var socket = io.connect('http://localhost:3333');

    var factory = {
        send: function (data) {
            socket.emit('cmd', data);
        },
        get: function (object, parameter) {
            var deferred = $q.defer();
            var promise = $http.post('/restApi/' + object, parameter).success(function (data) {
                if (data.isDemo)
                    $("#demoAlert").alert();
                else
                    $("#demoAlert").hide();
                var result;
                if (data.list != null)
                    result = data.list;
                else {
                    //for (var propName in data) {
                    //    result = data[propName];
                    //}
                    //if isn't list, return the first element
                    var sortedKeys = Object.keys(data).sort();
                    var first = data[sortedKeys[0]];
                    result = first;
                }
                deferred.resolve(result);
            });
            // Return the promise to the controller
            return deferred.promise;
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

services.factory('someArrays', ['$q', '$timeout', function ($q, $timeout) {
    var deferred = $q.defer();
    $timeout(function () {
        deferred.resolve({
            someArrays: {
                list0: [
                    { name: 'AngularJS' },
                    { name: 'Is' },
                    { name: 'teh' },
                    { name: '@wesome' }
                ],
                list1: [
                    { name: 'AngularJS' }
                ],
                list2: [
                    { name: 'Is' },
                    { name: 'rather good' }
                ],
                list3: [
                    { name: '@wesome' },
                    { name: 'MooTools' }
                ]
            }
        });
    }, 50);
    return deferred.promise.then(function (result) {
        return result.someArrays;
    });
}]);

