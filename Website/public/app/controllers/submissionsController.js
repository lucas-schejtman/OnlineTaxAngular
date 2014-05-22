app.controller('submissionsController', function($scope, apiService, modalService){
	'use strict';
	
	$scope.submissions = [];

	$scope.layout = 'Table';

	$scope.filterBy = function(){
		console.log('filter by');
	};

	$scope.showData = function(data){
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'OK',
			headerText: 'Form Data',
			bodyText: data
		};

		modalService.showModal({}, modalOptions);
	};

	$scope.init = function() {
        apiService.getSubmissions().then(function (result) {
            $scope.submissions = result.data;
        }, function(error) {
            console.log('error ' + error.message);
        });
	};

	$scope.init();
});