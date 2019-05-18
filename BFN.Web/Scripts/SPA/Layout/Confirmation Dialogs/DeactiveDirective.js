/// <reference path="deactive-message.html" />
(function (app) {
    'use strict';

    app.directive('deactive', deactive);

    function deactive() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/Confirmation Dialogs/deactive-message.html'
        }
    }

})(angular.module('Common.Core'));