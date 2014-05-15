app.factory('apiService', function ($http) {
    'use strict';

    var serviceBase = 'http://localhost:8080/api/';

    var formsConstant = 'forms';
    var submissionsConstant = 'submissions';

    var apiService = {
        getForms: function () {
            return $http.get(serviceBase + formsConstant).success(function (results) {
                return results;
            }).error(function() {
                return [];
            });
        },
        getSubmissions: function () {
            return $http.get(serviceBase + submissionsConstant).success(function (results){
                return results;
            }).error(function(){
                return [];
            })
        },
        saveSubmissions: function(data){
            return $http.post(serviceBase + submissionsConstant, data).success(function (results){
                console.log('success');
                console.log(results);
            }).error(function(error){
                console.log('error');
                console.log(error);
            })
        }
    };

    return apiService;
});