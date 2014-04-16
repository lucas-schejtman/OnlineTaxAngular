'use strict';

app.factory('formsService', function ($http) {
    var serviceBase = '/api/Forms/';
    var formService = {
        getForms: function () {
            return $http.get(serviceBase).success(function (results) {
                return results;
            }).error(function() {
                return [];
            });
        }
    };

    return formService;
});