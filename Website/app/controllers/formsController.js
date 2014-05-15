app.controller('formsController', function ($scope, apiService) {
    'use strict';
    
    $scope.forms = [];

    $scope.init = function() {
        apiService.getForms().then(function (result) {
            $scope.forms = result.data;
        }, function(error) {
            console.log('error ' + error.message);
        });
    };

    $scope.init();
});
