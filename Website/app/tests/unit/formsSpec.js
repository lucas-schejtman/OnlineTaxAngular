'use strict';

describe('Testing the formsController', function () {
    var formsCtrl, scope, formsSvc, q, deferred;

    beforeEach(function () {
        module('OnlineTaxApp');
        module('toaster');
        module('chieffancypants.loadingBar');
        module('ui.bootstrap');
    });

    beforeEach(function () {
        formsSvc = {
            getForms: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    beforeEach(inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        formsCtrl = $controller('formsController', {
            $scope: scope,
            formsService: formsSvc
        });
    }));

    it('Should call formsService getForms method', function () {
        spyOn(formsSvc, 'getForms').andCallThrough();

        scope.init();

        deferred.resolve([{}]);

        scope.$apply();

        expect(formsSvc.getForms).toHaveBeenCalled();
    });

    it('Should return mocked forms', function () {
        deferred.resolve({ data: [{ name: '' }, { name: '' }] });

        scope.$apply();

        expect(scope.forms.length).toBe(2);
    });
});