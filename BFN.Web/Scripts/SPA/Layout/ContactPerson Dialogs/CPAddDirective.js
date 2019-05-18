(function (app) {
    'use strict';

    app.directive('contactAdd', contactAdd);

    function contactAdd() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/Scripts/SPA/Layout/ContactPerson Dialogs/contact-add.html',
            controller: 'UserCtrl'
        }
    }

})(angular.module('Common.Core'));