app.directive('numbersOnlyInput', function() {
    return {
        restrict: 'EA',
        template: '<input class="{{className}}" ng-model="inputValue" required="{{required}}" />',
        scope: {
            inputValue: '=',
            className: '@',
            required: '@'
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue, oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});