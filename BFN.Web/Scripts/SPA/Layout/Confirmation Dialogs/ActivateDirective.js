(function (app) {
    'use strict';

    app.directive('active', active);

    function active() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/Confirmation Dialogs/active-message.html'
        }
    }

})(angular.module('Common.Core'));