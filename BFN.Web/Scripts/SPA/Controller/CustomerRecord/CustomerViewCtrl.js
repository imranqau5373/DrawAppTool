

(function (app) {
    'use strict';

    app.controller('CustomerViewCtrl', CustomerViewCtrl);

    CustomerViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CustomerViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.viewCustomer = {};
        $scope.listAllPayments = {};



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

        $scope.getCustomer = function () {
            ApiService.get(BFNConstants.urls.getCustomer + "?Id=" + $stateParams.Id, null, getCustomerSucceded, requestFailed);

        }

        function getCustomerSucceded(response) {
            $scope.viewCustomer = response.data;
            $scope.viewCustomer.CustomerStartDate = ($scope.viewCustomer.CustomerStartDate == null ? "-" : moment($scope.viewCustomer.CustomerStartDate).format("MM/DD/YYYY"));
            $scope.viewCustomer.CustomerEndDate = ($scope.viewCustomer.CustomerEndDate == null ? "-" : moment($scope.viewCustomer.CustomerEndDate).format("MM/DD/YYYY"));
            $scope.viewCustomer.CommiteId = $stateParams.CommiteId;


        }

        $scope.getCustomerPayments = function () {
            debugger;
            ApiService.get(BFNConstants.urls.getCustomerPayments + "?CustomerId=" + $stateParams.Id, null, getPaymentsSucceded, requestFailed);
        }

        function getPaymentsSucceded(response) {
            $scope.listAllPayments = response.data;


        }


        $scope.getCustomer();

        $scope.getCustomerPayments();




        //end customer module



    }

})(angular.module('Common.Core'));