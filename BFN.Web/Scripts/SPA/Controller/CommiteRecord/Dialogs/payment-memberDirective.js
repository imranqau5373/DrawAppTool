(function (app) {
    'use strict';

    app.directive('paymentmember', paymentmember);

    function paymentmember() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Controller/CommiteRecord/Dialogs/payment-record.html',
            controller: 'paymentMember'
        }
    }

})(angular.module('Common.Core'));