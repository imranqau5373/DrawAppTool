(function (app) {
    'use strict';

    app.directive('timetemplateAdd', timetemplateAdd);

    function timetemplateAdd() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/TimeTemplates Dialogs/timetemplate-add.html',
            controller: ''
        }
    }

})(angular.module('Common.Core'));