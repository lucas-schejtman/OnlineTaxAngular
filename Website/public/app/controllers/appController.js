app.controller('appController', function($scope, $rootScope, $location, authService, AUTH_EVENTS){
	$scope.currentUser = authService.isAuthenticated();

	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
    	$scope.currentUser = authService.isAuthenticated();
    	$location.path('/about');
    })
});