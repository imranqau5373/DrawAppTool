(function (app) {
    'use strict';

    app.controller('ContactPersonCtrl', ContactPersonCtrl);

    ContactPersonCtrl.$inject = ['$scope', '$location', '$rootScope', 'ApiService', 'notificationService'];

    function ContactPersonCtrl($scope, $location, $rootScope, ApiService, notificationService) {
        $scope.newContactPerson = {};
        $scope.addContactPerson = function () {
            if (angular.isDefined($scope.newContactPerson.ContactPersonName) &&
                angular.isDefined($scope.newContactPerson.ContactPersonAddress) &&
                angular.isDefined($scope.newContactPerson.ContactPersonEmail) &&
                angular.isDefined($scope.newContactPerson.ContactPersonNumber)) {
                ApiService.post(BFNConstants.urls.addContactPerson, $scope.newContactPerson, addContactPersonSucceded, addContactPersonFailed);
            } else {
                alert('Please enter missing fields.')
            }
        };

        function addContactPersonSucceded(response) {
            notificationService.displaySuccess('New contact person Created Successfully.');
            $scope.newContactPerson = {};
        }
        function addContactPersonFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Contact person Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
    }

})(angular.module('Common.Core'));