app.directive('numbersOnlyInput', function() {
    return {
        restrict: 'EA',
        template: '<input class="{{className}}" ng-model="inputValue" required="{{required}}" allowdecimals="{{decimals}}" allownegatives="{{negatives}}" />',
        scope: {
            inputValue: '=',
            className: '@',
            required: '@',
            decimals: '@',
            negatives: '@'
        },
        replace: true,
        link: function (scope, ele, attr) {
            scope.$watch('inputValue', function (newValue, oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                var allowDecimals = String(attr.allowdecimals).trim();
                var allowNegatives = String(attr.allownegatives).trim();
                if (arr.length === 1 && ((allowNegatives === 'true' && arr[0] === '-') || (allowDecimals === 'true' && arr[0] === '.'))) return;
                if (allowDecimals === 'false') {
                    if (arr.indexOf('.') > -1) {
                        scope.inputValue = oldValue;
                        return;
                    }
                }
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});