'use strict';

describe("Testing the about controller", function() {
    //beforeEach(angular.mock.module('OnlineTaxApp'));
    beforeEach(function() {
        module('OnlineTaxApp');
        module('toaster');
        module('chieffancypants.loadingBar');
    });

    var aboutCtrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope;
        aboutCtrl = $controller('aboutController', {
           $scope: scope             
        });
    }));

    it("Should say 'About Us'", function() {
        expect(scope.message).toBe('About Us');
    });
});