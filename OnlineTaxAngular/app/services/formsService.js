'use strict';

app.factory('formsService', function ($http) {
    var serviceBase = '/api/Forms/';
    var formsDataFactory = {};
    
    var getForms = function () {
        return $http.get(serviceBase)
                    .then(function(results) {
                        return results.data;
                    });
    };

    formsDataFactory.getForms = getForms;

    return formsDataFactory;
});