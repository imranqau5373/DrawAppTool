(function (app) {
    'use strict';

    app.directive('sideBar', sideBar);

    function sideBar() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/side-bar.html'
        }
    }

})(angular.module('Common.Core'));