

(function (app) {
    'use strict';

    app.controller('PaymentAddCtrl', PaymentAddCtrl);

    PaymentAddCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function PaymentAddCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        $scope.newPayment = {};
        $scope.commiteRecord = {};
        $scope.installmentRecord = {};




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

        $scope.addPayment = function () {
            debugger;
            $scope.newPayment.LastUpdatedDate = $scope.newPayment.CreatedDate = BFNConstants.getDateTime();
            $scope.newPayment.IsActive = true;
            $scope.newPayment.CreatedBy = $cookies.get('userIdBFN');
            $scope.newPayment.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.addPayment, $scope.newPayment, addPaymentSucceded, requestFailed);

        }

        function addPaymentSucceded(response) {
            notificationService.displaySuccess('New Payment Added Successfully.');
            $location.url('/Home/PaymentIndex');
        }

        function getCommiteForPayment() {
            ApiService.get(BFNConstants.urls.getAllCommites,null, getCommiteSucceded, requestFailed);

        }

        function getCommiteSucceded(response) {
            $scope.commiteRecord = response.data;
        }

        $scope.selectMember = function () {
            debugger;
            if ($scope.newPayment.CommiteId > 0) {
                $scope.isCommiteError = false;
            }
            else {
                $scope.isCommiteError = true;
            }
        }

        $scope.getCommiteDetails = function () {
            if ($scope.newPayment.CommiteId > 0) {
                ApiService.get(BFNConstants.urls.getCommiteInstallment + "?Id=" + $scope.newPayment.CommiteId, null, getInstallmentSucceded, requestFailed);
            }
        }

        function getInstallmentSucceded(response) {
            $scope.installmentRecord = response.data;
        }


        //end customer module

        //on load function

        getCommiteForPayment();



    }

})(angular.module('Common.Core'));