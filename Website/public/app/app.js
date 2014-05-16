var app = angular.module('OnlineTaxApp', ['ngRoute', 'chieffancypants.loadingBar', 'toaster', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when("/about", {
        controller: "aboutController",
        templateUrl: "./app/views/about.html"
    }).when("/forms", {
        controller: "formsController",
        templateUrl: "./app/views/forms.html"
    }).when("/forms/526", {
        controller: "donationsController",
        templateUrl: "./app/views/forms/526.html"
    }).when("/submissions", {
        controller: "submissionsController",
        templateUrl: "./app/views/submissions.html"
    }).when("/login", {
        controller: 'loginController',
        templateUrl: './app/views/login.html'
    }).otherwise({ redirectTo: "/about" });

    cfpLoadingBarProvider.includeSpinner = false;
});

app.run(function($rootScope, AUTH_EVENTS, authService, $location){
    $rootScope.$on('$locationChangeStart', function(event, next){
        var route = next.substring(next.indexOf('#'), next.length);
        if(authService.isAuthenticated() === false && route !== '#/login'){
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            $location.path('/login');
        }
    });
});

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    notAuthenticated: 'auth-not-authenticated'
});