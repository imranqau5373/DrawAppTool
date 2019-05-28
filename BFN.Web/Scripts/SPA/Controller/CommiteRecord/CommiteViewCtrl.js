

(function (app) {
    'use strict';

    app.controller('CommiteViewCtrl', CommiteViewCtrl);

    CommiteViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CommiteViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.listCommiteMembers = {};
        $scope.viewCommite = {};
        $scope.listAllCustomers = {};

        $scope.newPayment = {};



        /* *** Start *** */

        $scope.SearchModel = {
            searchCustomerName: "",
            searchCustomerSerialNo: "",
            searchCustomerIdCard: "",
            searchCustomerAddress: ""
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "CustomerName",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["CustomerName"] = $scope.SearchModel.searchCustomerName;
                    if ($scope.filterApplied.indexOf("CustomerName") === -1) {
                        $scope.filterApplied.push("CustomerName");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["CustomerSerialNo"] = $scope.SearchModel.searchCustomerSerialNo;
                    if ($scope.filterApplied.indexOf("CustomerSerialNo") === -1) {
                        $scope.filterApplied.push("CustomerSerialNo");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["CustomerIdCardNo"] = $scope.SearchModel.searchCustomerIdCard;
                    if ($scope.filterApplied.indexOf("CustomerIdCardNo") === -1) {
                        $scope.filterApplied.push("CustomerIdCardNo");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["CustomerAddress"] = $scope.SearchModel.searchCustomerAddress;
                    if ($scope.filterApplied.indexOf("CustomerAddress") === -1) {
                        $scope.filterApplied.push("CustomerAddress");
                    }
                    break;
            }

            $scope.getCommiteMembers();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getCommiteMembers();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getCommiteMembers();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCustomerName = "";
                        $scope.pagingInfo.filterList["CustomerName"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCommiteMembers();
                    }
                    break;
                case 2:
                    {
     
                        $scope.SearchModel.searchCustomerSerialNo = "";
                        $scope.pagingInfo.filterList["CustomerSerialNo"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerSerialNo");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCommiteMembers();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchCustomerIdCard = "";
                        $scope.pagingInfo.filterList["CustomerIdCardNo"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerIdCardNo");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCommiteMembers();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchCustomerAddress = "";
                        $scope.pagingInfo.filterList["CustomerAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCommiteMembers();
                    }
                    break;
            }

        };

        /* *** End *** */

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
            ApiService.get(BFNConstants.urls.getCommite + "?Id=" + $stateParams.Id, null, getCommiteSucceded, requestFailed);

        }

        function getCommiteSucceded(response) {
            $scope.viewCommite = response.data;
            $scope.viewCommite.CommiteStartDate = ($scope.viewCommite.CommiteStartDate == null ? "-" : moment($scope.viewCommite.CommiteStartDate).format("MM/DD/YYYY"));
            $scope.viewCommite.CommiteEndDate = ($scope.viewCommite.CommiteEndDate == null ? "-" : moment($scope.viewCommite.CommiteEndDate).format("MM/DD/YYYY"));
        }



        //Commite Members Start Module

        $scope.getCommiteMembers = function () {
            var searchData = $httpParamSerializer($scope.pagingInfo);

            ApiService.get(BFNConstants.urls.getCommiteMembers + "?commiteId=" + $stateParams.Id+"&searchData"+searchData, null, GetCommiteMembersSucceded, requestFailed);
            //ApiService.post(BFNConstants.urls.getCommiteMembers, newGridModel, GetCommiteMembersSucceded, requestFailed);

        }

        $scope.addCommiteMember = function () {
            $location.url('/Home/CommiteView/' + $stateParams.Id + '/AddMember');

        }

        $scope.viewCustomerDetails = function (Id) {
            $location.url('/Home/CommiteView/' + $stateParams.Id + '/ViewMember/'+Id);

        }



        function GetCommiteMembersSucceded(response) {
  
            $scope.listAllCustomers = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
            $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;

        }

        // End Commite Members Module...

        // Start Payment Module

        $scope.addNewPayment = function (Id) {

            $scope.newPayment.FK_MemberId = Id;
            $scope.newPayment.CommiteId = $stateParams.Id;

        }


        $scope.addPayment = function () {
 
            $scope.newPayment.LastUpdatedDate = $scope.newPayment.CreatedDate = BFNConstants.getDateTime();
            $scope.newPayment.IsActive = true;
            $scope.newPayment.CreatedBy = $cookies.get('userIdBFN');
            $scope.newPayment.LastUpdatedBy = $cookies.get('userIdBFN');
            


            ApiService.post(BFNConstants.urls.addPayment, $scope.newPayment, addPaymentSucceded, requestFailed);

        }

        function addPaymentSucceded(response) {
            notificationService.displaySuccess('New Payment Added Successfully.');
            $("#addPayment").modal('hide');
            $scope.newPayment = {};
            
        }

        // End Payment Module

        $scope.getCommite();
        $scope.getCommiteMembers();



        //end customer module



    }

})(angular.module('Common.Core'));