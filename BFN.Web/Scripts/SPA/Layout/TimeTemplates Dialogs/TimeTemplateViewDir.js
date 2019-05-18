(function (app) {
    'use strict';

    app.directive('timetemplateView', timetemplateView);

    function timetemplateView() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/TimeTemplates Dialogs/timetemplate-view.html',
            controller: ''
        }
    }

})(angular.module('Common.Core'));