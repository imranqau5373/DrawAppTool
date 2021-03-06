﻿

(function (app) {
    'use strict';

    app.controller('CustomerAddCtrl', CustomerAddCtrl);

    CustomerAddCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CustomerAddCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        $scope.newCustomer = {};
        ApiService.get(BFNConstants.urls.getSerialNumber, null, GetSerialNumberSucceded, requestFailed);

        function GetSerialNumberSucceded(response) {
            $scope.newCustomer.CustomerSerialNo = response.data;
        }

    

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

        $scope.addCustomer = function () {
                $scope.newCustomer.LastUpdatedDate = $scope.newCustomer.CreatedDate = BFNConstants.getDateTime();
                $scope.newCustomer.IsActive = true;
                $scope.newCustomer.CreatedBy = $cookies.get('userIdBFN');
                $scope.newCustomer.LastUpdatedBy = $cookies.get('userIdBFN');
                if ($stateParams.CommiteId) {
                    $scope.newCustomer.FK_CommiteId = $stateParams.CommiteId;
                }
                ApiService.post(BFNConstants.urls.addCustomer, $scope.newCustomer, addCustomerSucceded, requestFailed);


            




        }

        function addCustomerSucceded(response) {

            $scope.newCustomer.Id = response.data.Id;
            notificationService.displaySuccess('New Customer Added Successfully.');
            $timeout(function () {
                $("#evidence-admin-tab").click();
            }, 0);
            $location.url('/Home/CommiteView/' + response.data.FK_CommiteId);
        }

        $scope.addEvidence = function () {
            $scope.newCustomer.LastUpdatedDate = $scope.newCustomer.CreatedDate = BFNConstants.getDateTime();
            $scope.newCustomer.IsActive = true;
            $scope.newCustomer.CreatedBy = $cookies.get('userIdBFN');
            $scope.newCustomer.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.updateCustomer, $scope.newCustomer, addEvidenceSucceded, requestFailed);

        }

        function addEvidenceSucceded(response) {
            notificationService.displaySuccess('New Evidence Added Successfully.');
            $scope.newCustomer = {};
            $location.url('/Home/CustomerIndex');
        }
        
        $scope.verifySerialNumber = function () {

        }



        $scope.searchUserId = function () {
           
            ApiService.get(BFNConstants.urls.searchIdCard+"?CustomerIdCardNo="+$scope.newCustomer.CustomerIdCardNo,null, searchUserSucceed, requestFailed);

        }

        function searchUserSucceed(response) {
            debugger;
            $scope.newCustomer = response.data;
            $scope.newCustomer.CustomerPhoneNo = parseInt($scope.newCustomer.CustomerPhoneNo);
            
        }

        $scope.nextPage = function () {
            $timeout(function () {
                $("#evidence-admin-tab").click();
            }, 0);
        }

        $scope.addExistingMember = function () {
            let newMember = {};
            newMember.FK_CommiteId = $stateParams.CommiteId;
            newMember.FK_CustomerId = $scope.newCustomer.Id;

            newMember.LastUpdatedDate = newMember.CreatedDate = BFNConstants.getDateTime();
            newMember.IsActive = true;
            newMember.CreatedBy = $cookies.get('userIdBFN');
            newMember.LastUpdatedBy = $cookies.get('userIdBFN');

            ApiService.post(BFNConstants.urls.addCommiteMembers, newMember, addMemberSucceded, requestFailed);

        }

        function addMemberSucceded(response) {
            debugger;
            if (response.Error) {
                notificationService.displayError(response.data.Message);
            }
            $location.url('/Home/CommiteView/' + $stateParams.CommiteId);
        }


        

        //end customer module



    }

})(angular.module('Common.Core'));