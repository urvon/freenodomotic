var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
function DashBoardController($scope, $modal, $log) {
    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent',
            //template: '<div> toto</div>',
            controller: ModalInstanceCtrl,
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
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


}
