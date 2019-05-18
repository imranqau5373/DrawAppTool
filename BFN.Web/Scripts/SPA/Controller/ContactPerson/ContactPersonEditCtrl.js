(function (app) {
    'use strict';

    app.controller('ContactPersonEditCtrl', ContactPersonEditCtrl);

    ContactPersonEditCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];

    function ContactPersonEditCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {
        $scope.editContactPerson = {};
        $scope.id = $routeParams.id;
        
        $scope.getContactPerson = function () {
            ApiService.get(BFNConstants.urls.getContactPerson + "?id=" + $scope.id, null, GetContactPersonSucceded, GetContactPersonFailed);

        };
        $scope.getContactPerson();
        function GetContactPersonSucceded(response) {
            $scope.editContactPerson = response.data;
        }
        function GetContactPersonFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Company Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        /* *** Update form section *** */
        $scope.editContactPersonData = function () {
            if (angular.isDefined($scope.editContactPerson.ContactPersonName) &&
                angular.isDefined($scope.editContactPerson.ContactPersonAddress) &&
                angular.isDefined($scope.editContactPerson.ContactPersonEmail) &&
                angular.isDefined($scope.editContactPerson.ContactPersonNumber)) {
                ApiService.post(BFNConstants.urls.editContactPerson, $scope.editContactPerson, editContactPersonSucceded, editContactPersonFailed);
            } else {
                alert('Please enter missing fields.')
            }
        };
        function editContactPersonSucceded(response) {
            notificationService.displaySuccess('Contact person Updated Successfully.');
            $scope.newContactPerson = {};
        }
        function editContactPersonFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Contact person Not Updated Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
    }
    
})(angular.module('Common.Core'));