    angular.module('myApp.controllers').controller('CommandController', ['$scope', '$http', 'getFreedomoticDatas', function ($scope, $http, getFreedomoticDatas) {
    
        getFreedomoticDatas.query("commands", {json: true}).then(function (result) {
        $scope.datas = result;
    })
        


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