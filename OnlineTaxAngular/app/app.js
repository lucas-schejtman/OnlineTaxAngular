var app = angular.module('OnlineTaxApp', ['ngRoute', 'chieffancypants.loadingBar', 'toaster']);
//['ngRoute', 'ngResource', 'ui.bootstrap','toaster', 'chieffancypants.loadingBar', 'ngAnimate']

app.config(function ($routeProvider, cfpLoadingBarProvider) {
    $routeProvider.when("/about", {
        controller: "aboutController",
        templateUrl: "/app/views/about.html"
    });
    $routeProvider.when("/forms", {
        controller: "formsController",
        templateUrl: "/app/views/forms.html"
    });
    $routeProvider.when("/forms/526", {
        controller: "donationsController",
        templateUrl: "/app/views/forms/526.html"
    });
    $routeProvider.otherwise({ redirectTo: "/about" });

    cfpLoadingBarProvider.includeSpinner = false;
});