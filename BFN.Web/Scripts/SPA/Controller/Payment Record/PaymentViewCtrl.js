

(function (app) {
    'use strict';

    app.controller('PaymentViewCtrl', PaymentViewCtrl);

    PaymentViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function PaymentViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.listCommiteMembers = {};
        $scope.viewCommite = {};




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

        $scope.getCommite = function () {
            debugger;
            ApiService.get(BFNConstants.urls.getCommite + "?Id=" + $stateParams.Id, null, getCommiteSucceded, requestFailed);

        }

        function getCommiteSucceded(response) {
            $scope.viewCommite = response.data;
            $scope.viewCommite.CommiteStartDate = ($scope.viewCommite.CommiteStartDate == null ? "-" : moment($scope.viewCommite.CommiteStartDate).format("MM/DD/YYYY"));
            $scope.viewCommite.CommiteEndDate = ($scope.viewCommite.CommiteEndDate == null ? "-" : moment($scope.viewCommite.CommiteEndDate).format("MM/DD/YYYY"));
        }


        $scope.getPayment();


        //end customer module



    }

})(angular.module('Common.Core'));