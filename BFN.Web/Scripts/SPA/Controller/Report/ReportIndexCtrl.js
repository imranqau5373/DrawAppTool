

(function (app) {
    'use strict';

    app.controller('ReportIndexCtrl', ReportIndexCtrl);

    ReportIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function ReportIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        debugger;
        $scope.listAllPayments = {};
        $scope.commiteRecord = {};
        $scope.installmentRecord = {};
        $scope.reportData = {};
        $scope.totalUnPaid = "";
        $scope.totalPaid = "";


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


        $scope.getAllPayments = function () {
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllPayments);
            $scope.myProm.then(function mySucces(response) {
                GetAllPaymentsSucceded(response);
            }
            , function myError(response) {
                requestFailed(response);
            });

        }

        function GetAllPaymentsSucceded(response) {
            $scope.listAllPayments = response.data;


        }

        function getCommiteForPayment() {
            ApiService.get(BFNConstants.urls.getAllCommites, null, getCommiteSucceded, requestFailed);

        }

        function getCommiteSucceded(response) {
            $scope.commiteRecord = response.data;
        }


        $scope.getCommiteDetails = function () {
            if ($scope.reportData.CommiteId > 0) {
                ApiService.get(BFNConstants.urls.getCommiteInstallment + "?Id=" + $scope.reportData.CommiteId, null, getInstallmentSucceded, requestFailed);
            }
        }

        function getInstallmentSucceded(response) {
            $scope.installmentRecord = response.data;
        }

        $scope.searchReport = function () {
            debugger;
            if ($scope.reportData.CommiteId > 0) {
                ApiService.post(BFNConstants.urls.getPaymentReport, $scope.reportData,searchReportSucceeded, requestFailed);
            }
        }

        function searchReportSucceeded(response) {
            debugger;
            $scope.listAllPayments = response.data.Data;
            $scope.totalPaid = response.data.Paid;
            $scope.totalUnPaid = response.data.TotalUnPaid;
        }

        $scope.getAllPayments();
        getCommiteForPayment();



    }

})(angular.module('Common.Core'));