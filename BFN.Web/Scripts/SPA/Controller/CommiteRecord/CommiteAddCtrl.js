

(function (app) {
    'use strict';

    app.controller('CommiteAddCtrl', CommiteAddCtrl);

    CommiteAddCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CommiteAddCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        $scope.commiteData = {};




        //Request Failed Function

        function requestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }


        // end of Request function failed




        // Start Module to add Commite Record

        $scope.addCommite = function () {
            if ($stateParams.Id) {
                updateComitte();
            }
            else {
                $scope.commiteData.LastUpdatedDate = $scope.commiteData.CreatedDate = moment(BFNConstants.getDateTime()).format("MM/DD/YYYY HH:mm");
                $scope.commiteData.IsActive = true;
                $scope.commiteData.CreatedBy = $cookies.get('userIdBFN');
                $scope.commiteData.LastUpdatedBy = $cookies.get('userIdBFN');
                ApiService.post(BFNConstants.urls.addCommite, $scope.commiteData, addCommiteSucceded, requestFailed);
            }

        }

        function addCommiteSucceded(response) {
            notificationService.displaySuccess('New Commite Added Successfully.');
            $location.url('/Home/CommiteIndex');
        }

        //End module to end commite record.

        // Module to get Commite Record to get it and update it.


        $scope.getCommite = function () {
            ApiService.get(BFNConstants.urls.getCommite + "?Id=" + $stateParams.Id, null, getCommiteSucceded, requestFailed);

        }

        function getCommiteSucceded(response) {
            $scope.commiteData = response.data;
            $scope.commiteData.CommiteStartDate = ($scope.commiteData.CommiteStartDate == null ? "-" : new Date($scope.commiteData.CommiteStartDate));//.format("MM/DD/YYYY"));
            $scope.commiteData.CommiteEndDate = ($scope.commiteData.CommiteEndDate == null ? "-" : new Date($scope.commiteData.CommiteEndDate));//.format("MM/DD/YYYY"));
        }

        function updateComitte() {
            $scope.commiteData.LastUpdatedDate = $scope.commiteData.CreatedDate = moment(BFNConstants.getDateTime()).format("MM/DD/YYYY HH:mm");
            ApiService.post(BFNConstants.urls.updateCommite, $scope.commiteData, updateCommiteSucceded, requestFailed);
        }

        function updateCommiteSucceded(response) {
            notificationService.displaySuccess('Commite Updated Successfully.');
            $location.url('/Home/CommiteIndex');
        }

        // end of Module to get Commite Record and update it.

        if ($stateParams.Id)
            $scope.getCommite();






    }

})(angular.module('Common.Core'));