(function (app) {
    'use strict';

    app.controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];

    function UserCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {
        
        $scope.getUserExperties = function () {
            ApiService.get(BFNConstants.urls.getUserExperties, null, GetUserExpertiesSucceded, GetUserRequestFailed);

        };

        function GetUserExpertiesSucceded(response) {
            $scope.userExperties = response.data;

        }

        $scope.getUserRoles = function () {
            ApiService.get(BFNConstants.urls.getUserRoles, null, GetUserRolesSucceded, GetUserRequestFailed);

        };

        function GetUserRolesSucceded(response) {
            $scope.userRoles = response.data;

        }

        function GetUserRequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Company Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.getUserExperties();
        $scope.getUserRoles();


    }

})(angular.module('Common.Core'));