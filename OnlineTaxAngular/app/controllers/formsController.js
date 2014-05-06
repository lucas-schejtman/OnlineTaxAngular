app.controller('formsController', function ($scope, formsService) {
    'use strict';
    
    $scope.forms = [];

    $scope.init = function() {
        formsService.getForms().then(function (result) {
            $scope.forms = result.data;
        }, function(error) {
            console.log('error ' + error.message);
        });
    };

    $scope.init();
});
