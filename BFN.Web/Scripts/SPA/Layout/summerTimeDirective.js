(function (app) {
    'use strict';

    app.directive('summerTime', summerTime);

    function summerTime() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/summer-time.html'
        }
    }

})(angular.module('Common.Core'));