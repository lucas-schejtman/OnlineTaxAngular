'use strict';

app.controller('donationsController', function ($scope, toaster, $window/*, $modal*/) {
    $scope.irdNumber = "";
    $scope.taxYear = "";
    $scope.box3 = "";
    $scope.box3a = function() {
        return isNaN($scope.box3) ? '' : $scope.box3 * 0.333333;
    };
    $scope.box4 = "";
    $scope.box4a = function() {
        if (isNaN($scope.box4)) return '';
        return $scope.box4 >= 940 ? 310 : $scope.box4 * 0.3;
    };
    $scope.box5 = function() {
        return ($scope.box3a() > 0 && $scope.box4a() > 0) ? $scope.box3a() + $scope.box4a() : '';
    };

    $scope.save = function() {
/*        var diag = $modal.open({
            templateUrl: 'app/views/modal.html',
            controller: modalController
        });

        diag.result.then(function() {
            toaster.pop('information', 'Modal Info', 'Form submitted');
        }, function() {
            toaster.pop('information', 'Modal Info', 'Dialog dismissed');
        });*/
    };

    $scope.cancelBtn = function() {
        $window.history.back();
    };

/*    var modalController = function($scope, $modalInstance) {
        $scope.ok = function () {
            // submit the form
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };*/

    toaster.pop('information', 'Form Information', 'IR526 Form Loaded!');
});
