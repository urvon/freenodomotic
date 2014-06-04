angular.module('myApp.controllers').controller('CommandController', ['$scope', '$http', 'freedomotic', function ($scope, $http, freedomotic) {
    freedomotic.get("commands").then(function (result) {
        $scope.datas = result;
    })
    $scope.title = 'Composants';

        
    $scope.shortName1 = function(name, lenght){       
        //return shortName(name,lenght);
    }

    $scope.edit = function(id){
        window.location = '/administration/commandes/detail/'+id;
    }

}]);

angular.module('myApp.controllers').controller('CmdDetailController', ['$scope','$http','$routeParams',function($scope,$http,$routeParams) {
    alert($routeParams.id);
}]);