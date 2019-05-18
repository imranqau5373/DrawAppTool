(function (app) {
    'use strict';

    app.directive('userView', userView);

    function userView() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/user-view.html'
        }
    }

})(angular.module('Common.Core'));