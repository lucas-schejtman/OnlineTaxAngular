'use strict';

app.controller('donationsController', function ($scope, toaster, $window, modalService, apiService) {
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
        var modalOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Proceed?',
            bodyText: 'Do you want to submit this form?'
        };

        var submission = {};
        submission.name = '526';
        submission.description = 'Donations form';
        submission.country = 'NZ';
        submission.data = {"irdNumber" : $scope.irdNumber,
                           "taxYear" : $scope.taxYear, 
                           "box3" : $scope.box3, 
                           "box3a" : $scope.box3a(), 
                           "box4" : $scope.box4, 
                           "box4a" : $scope.box4a(), 
                           "box5" : $scope.box5};
        submission.date = new Date();

        modalService.showModal({}, modalOptions).then(function(){
            apiService.saveSubmissions(submission).then(function () {
                toaster.pop('information', 'Modal Info', 'Form submitted');
            }, function(error) {
                toaster.pop('error', 'Modal Info', error);
            }); 
        }, function(){
            toaster.pop('information', 'Modal Info', 'Dialog dismissed');
        })
    };

    $scope.cancelBtn = function() {
        $window.history.back();
    };

    toaster.pop('information', 'Form Information', 'IR526 Form Loaded!');
});
