app.controller('DashBoardController', ['$scope', '$modal', '$log','$compile', 'freedomotic', function ($scope, $modal, $log,$compile, freedomotic) {
    freedomotic.get('objects',{suffixe:'livingroom light', json: true}).then(function(result){
        $scope.object = result;
    });

    $scope.open = function (size) {        
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent',
            controller: ModalInstanceCtrl,
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            $compile($('#col'))($scope).append('<div class="widget-col col-sm-3 col-xs-4">');//<my-widget><my-object obj-name=' + selectedItem[0] + '/></my-widget></div>');

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }   
    

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

}]);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'freedomotic', function ($scope, $modalInstance, freedomotic) {
    var objects;
    $scope.itemByPage = 6;
    

    freedomotic.get('objects', { json: true }).then(function (result) {
        objects = result;
        $scope.objects = objects;
    });

    //==============  Events  =================// 
    $scope.setPage = function (pageNo) {
        if (objects != null) {
            var end;
            if (pageNo * $scope.itemByPage > objects.length)
                end = objects.length;
            else
                end = (pageNo - 1) * $scope.itemByPage;

            $scope.objects = objects.slice((pageNo - 1) * $scope.itemByPage, end);
        }
    };

    $scope.pageChanged = function (pageNo) {
        if (objects != null) {
            var end;
            if (pageNo * $scope.itemByPage > objects.length)
                end = objects.length;
            else
                end = (pageNo - 1) * $scope.itemByPage;

            $scope.objects = objects.slice((pageNo - 1) * $scope.itemByPage, end);
        }
    };


    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //=========================================//
}]);

function DashBoardController($scope, $modal, $log, freedomotic) {
    
}

function ModalInstanceCtrl($scope, $modalInstance, freedomotic) {
    var objects;
    $scope.itemByPage = 6;
    $scope.pattern = "mosaic";

    freedomotic.get('objects', { json: true }).then(function (result) {
        objects = result;
        $scope.objects = objects;
    });

    //==============  Events  =================// 
    $scope.setPage = function (pageNo) {
        //if (objects != null) {
        //    var end;
        //    if (pageNo * $scope.itemByPage > objects.length)
        //        end = objects.length;
        //    else
        //        end = (pageNo - 1) * $scope.itemByPage;

        //    $scope.objects = objects.slice((pageNo - 1) * $scope.itemByPage, end);
        //}
    };

    $scope.pageChanged = function (pageNo) {
        if (objects != null) {
            var end;
            if (pageNo * $scope.itemByPage > objects.length)
                end = objects.length;
            else
                end = (pageNo - 1) * $scope.itemByPage;

            $scope.objects = objects.slice((pageNo - 1) * $scope.itemByPage, end);
        }
    };


    $scope.ok = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // selected widget
    $scope.selected = [];
    $scope.toggleSelection = function toggleSelection(name) {
        var idx = $scope.selected.indexOf(name);

        // is currently selected
        if (idx > -1) {
            $scope.selected.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selected.push(name);
        }
    };
    //=========================================/
};
