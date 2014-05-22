app.factory('authService', function($http, sessionService){
	return {
		login: function(credentials){
			return $http.post('/login', credentials).then(function(result){
				sessionService.create(result.data.userId, result.data.username);
			});
		},
		isAuthenticated: function(){
			return !!sessionService.userId;
		},
	}
});