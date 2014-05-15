angular.module('myApp.controllers').controller('CommandController', ['$scope','$http',function($scope,$http,shortName) {
    
    //get commands
    var commands = [];
    $http.get('/json/commands.json').
    success(function(data, status, headers, config) {
        commands = data.list;
        $scope.datas = commands;
        
    }).error(function(data, status, headers, config) {
          $(".alert").alert();
    });

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