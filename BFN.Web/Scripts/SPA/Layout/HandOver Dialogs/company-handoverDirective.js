(function (app) {
    'use strict';

    app.directive('companyhandover', companyhandover);

    function companyhandover() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/HandOver Dialogs/company-handover.html',
            controller: 'companyHandover'
        }
    }

})(angular.module('Common.Core'));