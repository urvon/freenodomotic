
angular.module('myApp.controllers').controller('PluginController', ['$scope', 'freedomotic', function ($scope, freedomotic) {
    freedomotic.get("plugins").then(function (result) {
        $scope.datas = result;
    })
}]);
