

(function (app) {
    'use strict';

    app.controller('CustomerEditCtrl', CustomerEditCtrl);

    CustomerEditCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CustomerEditCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.newCustomer = {};


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

        $scope.getCustomer = function () {
            ApiService.get(BFNConstants.urls.getCustomer + "?Id=" + $stateParams.MemberId, null, getCustomerSucceded, requestFailed);

        }

        function getCustomerSucceded(response) {
            debugger;
            $scope.newCustomer = response.data;
            $scope.newCustomer.CustomerSerialNo = parseFloat($scope.newCustomer.CustomerSerialNo, 10);

            $scope.newCustomer.CustomerStartDate = ($scope.newCustomer.CustomerStartDate == null ? "-" : moment($scope.newCustomer.CustomerStartDate).format("MM/DD/YYYY"));
            $scope.newCustomer.CustomerEndDate = ($scope.newCustomer.CustomerEndDate == null ? "-" : moment($scope.newCustomer.CustomerEndDate).format("MM/DD/YYYY"));
            $scope.newCustomer.CommiteId = $stateParams.CommiteId;


        }

        $scope.editCustomer = function () {
            //ApiService.get(BFNConstants.urls.getCustomer + "?Id=" + $stateParams.MemberId, null, getCustomerSucceded, requestFailed);
            ApiService.post(BFNConstants.urls.updateCustomer,$scope.newCustomer,editCustomerSucceded,requestFailed)

        }

        function editCustomerSucceded() {
            $scope.newCustomer.Id = response.data.Id;
            notificationService.displaySuccess('New Customer Added Successfully.');
            $timeout(function () {
                $("#evidence-admin-tab").click();
            }, 0);
            
        }

        $scope.getCustomer();



    }

})(angular.module('Common.Core'));