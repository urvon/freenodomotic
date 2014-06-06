app.controller('TriggerController', ['$scope', 'freedomotic', function ($scope, freedomotic) {
    freedomotic.get('triggers', { xml: true }).then(function (result) {
        $scope.datas = result;
    });


    $scope.edit = function (id) {
        window.location = '/administration/triggers/detail/' + id;
    }

}]);

function TriggerController($scope, $modal, $log, freedomotic) {

}

angular.module('myApp.controllers').controller('TriggerDetailController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    alert($routeParams.id);
}]);

function TriggerDetailController($scope, $http, $cookieStore) {

}