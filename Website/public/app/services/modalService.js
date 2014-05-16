app.service('modalService', function($modal){
	var modalDefaults = {
		backdrop: true,
		keyboard: true,
		modalFade: true,
		templateUrl: '/app/views/modal.html'
	};

	var modalOptions = {
		closeButtonText: 'No',
		actionButtonText: 'Yes',
		headerText: 'Proceed?',
		bodyText: 'Are you sure you want to submit this form?'
	};

	this.showModal = function(customModalDefaults, customModalOptions){
		if(!customModalDefaults) customModalDefaults = {};
		customModalDefaults.backdrop = 'static';

		return this.show(customModalDefaults, customModalOptions);
	}

	this.show = function(customModalDefaults, customModalOptions){
		var tempModalDefaults = {};
		var tempModalOptions = {};

		angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
		angular.extend(tempModalOptions, modalOptions, customModalOptions);

		if(!tempModalDefaults.controller){
			tempModalDefaults.controller = function($scope, $modalInstance){
				$scope.modalOptions = tempModalOptions;
				$scope.modalOptions.ok = function(result) {
					$modalInstance.close(result);
				};
				$scope.modalOptions.close = function(result){
					$modalInstance.dismiss('cancel');
				};
			}
		}

		return $modal.open(tempModalDefaults).result;
	};
});