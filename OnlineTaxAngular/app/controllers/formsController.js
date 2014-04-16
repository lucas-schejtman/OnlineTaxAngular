'use strict';

app.controller('formsController', function ($scope, formsService) {
    $scope.forms = [];

    init();
    
    function init() {
        getForms();
    }
    
    function getForms() {
        formsService.getForms()
            .then(function(results) {
                $scope.forms = results;
            }, function(error) {
                alert(error.message);
            });
    }
});
