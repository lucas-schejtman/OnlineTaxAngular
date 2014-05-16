app.factory('authService', function($http, sessionService){
	var baseUrl = 'http://localhost:8080/site/';

	return {
		login: function(credentials){
			return $http.post(baseUrl + 'login', credentials).then(function(result){
				sessionService.create(result.data.userId, result.data.userName);
			});
		},
		isAuthenticated: function(){
			return !!sessionService.userId;
		},
	}
});