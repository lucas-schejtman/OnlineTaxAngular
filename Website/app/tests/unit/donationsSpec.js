'use strict';

describe('Testing the donationsController', function () {
    var scope, ctrller, window, modal, toastr;

    beforeEach(function () {
        module('OnlineTaxApp');
        module('toaster');
        module('chieffancypants.loadingBar');
        module('ui.bootstrap');
    });

    beforeEach(inject(function ($rootScope, $controller, toaster, $window, $modal) {
        scope = $rootScope.$new();
        window = $window,
        modal = $modal,
        toastr = toaster,
        ctrller = $controller('donationsController', {
            $scope: scope,
            toaster: toastr,
            $window: window,
            $modal: modal
        });
    }));

    it("Should initialize values", function () {
        expect(scope.irdNumber).toBe("");
        expect(scope.taxYear).toBe("");
        expect(scope.box3).toBe("");
        expect(scope.box3a()).toBe(0);
        expect(scope.box4).toBe("");
        expect(scope.box4a()).toBe(0);
        expect(scope.box5()).toBe('');
    });

    it("Should return box3a value for valid box3", function () {
        scope.box3 = "100";
        
        expect(scope.box3a()).toBe(33.3333);
    });

    it("Should return empty box3a value for invalid box3", function () {
        scope.box3 = "abc";

        expect(scope.box3a()).toBe('');
    });

    it("Should return box4a value for valid box4", function () {
        scope.box4 = "100";

        expect(scope.box4a()).toBe(30);
    });

    it("Should return empty box4a value for invalid box4", function () {
        scope.box4 = "abc";

        expect(scope.box4a()).toBe('');
    });

    it("Should return box5a value for valid box3a and box4a", function () {
        scope.box3 = "100";
        scope.box4 = "100";

        expect(scope.box5()).toBe(63.3333);
    });
});