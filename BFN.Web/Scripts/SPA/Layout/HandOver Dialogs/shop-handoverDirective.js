(function (app) {
    'use strict';

    app.directive('shophandover', shophandover);

    function shophandover() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/HandOver Dialogs/shop-handover.html',
            controller: 'shopHandover'
        }
    }

})(angular.module('Common.Core'));