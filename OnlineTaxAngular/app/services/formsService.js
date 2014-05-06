app.factory('formsService', function ($http) {
    'use strict';

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