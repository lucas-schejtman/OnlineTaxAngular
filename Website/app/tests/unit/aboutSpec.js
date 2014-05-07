'use strict';

describe("Testing the aboutController", function() {
    beforeEach(function() {
        module('OnlineTaxApp');
        module('toaster');
        module('chieffancypants.loadingBar');
        module('ui.bootstrap');
    });

    var aboutCtrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope;
        aboutCtrl = $controller('aboutController', {
           $scope: scope             
        });
    }));

    it("Should say 'Online Tax Sample Application using AngularJS'", function () {
        expect(scope.message).toBe('Online Tax Sample Application using AngularJS');
    });
});