(function (app) {
    'use strict';

    app.directive('userAdd', userAdd);

    function userAdd() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/user-add.html',
            controller: 'UserCtrl'
        }
    }

})(angular.module('Common.Core'));