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
    }).otherwise({ redirectTo: "/about" });

    cfpLoadingBarProvider.includeSpinner = false;
});