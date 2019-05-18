(function (app) {
    'use strict';

    app.directive('userEdit', userEdit);

    function userEdit() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/user-edit.html',
            controller: 'UserCtrl'
        }
    }

})(angular.module('Common.Core'));