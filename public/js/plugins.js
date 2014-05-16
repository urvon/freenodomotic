
angular.module('myApp.controllers').controller('PluginController', ['$scope', 'getFreedomoticDatas', function ($scope, getFreedomoticDatas) {
    getFreedomoticDatas.query("plugins").then(function (result) {
        $scope.datas = result;
    })
}]);
