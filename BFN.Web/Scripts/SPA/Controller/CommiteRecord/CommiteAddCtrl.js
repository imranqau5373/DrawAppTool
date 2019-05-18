

(function (app) {
    'use strict';

    app.controller('CommiteAddCtrl', CommiteAddCtrl);

    CommiteAddCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CommiteAddCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        $scope.newCommite = {};




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

        //Add customer module..

        $scope.addCommite = function () {

            $scope.newCommite.LastUpdatedDate = $scope.newCommite.CreatedDate = moment(BFNConstants.getDateTime()).format("MM/DD/YYYY HH:mm");
            $scope.newCommite.IsActive = true;
            $scope.newCommite.CreatedBy = $cookies.get('userIdBFN');
            $scope.newCommite.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.addCommite, $scope.newCommite, addCommiteSucceded, requestFailed);

        }

        function addCommiteSucceded(response) {
            notificationService.displaySuccess('New Commite Added Successfully.');
            $location.url('/Home/CommiteIndex');
        }


        //end customer module



    }

})(angular.module('Common.Core'));