(function (app) {
    'use strict';

    app.directive('paymentrecord', paymentrecord);

    function paymentrecord() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-record.html',
            controller: 'paymentrecord'
        }
    }

})(angular.module('Common.Core'));