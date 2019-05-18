(function (app) {
    'use strict';
    app.directive('subscriptionupdate', subscriptionupdate);
    function subscriptionupdate() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/Subscription Dialog/subscription-update.html',
            controller: 'SubscriptionUpdateCtrl'
        }
    }
})(angular.module('Common.Core'));