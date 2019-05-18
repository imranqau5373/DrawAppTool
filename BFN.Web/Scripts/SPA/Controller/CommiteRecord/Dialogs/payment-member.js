

(function (app) {
    'use strict';

    app.controller('paymentMember', paymentMember);

    paymentMember.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function paymentMember($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        debugger;
        $scope.member = {};
        $scope.listAllCustomers = {};
        $scope.installmentRecord = {};


        $scope.getCommiteDetails = function () {
            ApiService.get(BFNConstants.urls.getCommiteInstallment + "?Id=" + $stateParams.Id, null, getInstallmentSucceded, requestFailed);
        }

        function getInstallmentSucceded(response) {
            $scope.installmentRecord = response.data;
        }


        $scope.getCommiteDetails();






        ///* *** Start *** */

        //$scope.SearchCustomerModel = {
        //    searchSerialNo: "",
        //    searchCustomerName: "",
        //    searchIDCardNo: "",
        //    searchCustomerFather: "",
        //    searchCustomerAddress: ""
        //};

        //$scope.CustomerpagingInfo = {
        //    page: 1,
        //    itemsPerPage: BFNConstants.viewListingPaging,
        //    reverse: false,
        //    filterList: {},
        //    totalItems: 0
        //};

        //$scope.filterApplied = [];

        //$scope.search = function (filterType) {
        //    switch (filterType) {
        //        case 1:
        //            $scope.CustomerpagingInfo.filterList["CustomerSerialNo"] = $scope.SearchCustomerModel.searchSerialNo;
        //            if ($scope.filterApplied.indexOf("CustomerSerialNo") === -1) {
        //                $scope.filterApplied.push("CustomerSerialNo");
        //            }
        //            break;
        //        case 2:
        //            $scope.CustomerpagingInfo.filterList["CustomerName"] = $scope.SearchCustomerModel.searchCustomerName;
        //            if ($scope.filterApplied.indexOf("CustomerName") === -1) {
        //                $scope.filterApplied.push("CustomerName");
        //            }
        //            break;
        //    }

        //    $scope.getAllCustomers();
        //};

        //$scope.sort = function (sortBy, reverse) {

        //    $scope.pagingInfo.sortBy = sortBy;
        //    $scope.pagingInfo.reverse = reverse;
        //    $scope.getAllCustomers();

        //};

        //$scope.selectPage = function (page) {
        //    $scope.CustomerpagingInfo.page = page;
        //    $scope.getAllCustomers();
        //};

        //$scope.clearSearch = function (serachType) {
        //    switch (serachType) {
        //        case 1:
        //            {
        //                $scope.SearchCustomerModel.searchSerialNo = "";
        //                $scope.pagingInfo.filterList["CustomerSerialNo"] = "";
        //                var index = $scope.filterApplied.indexOf("CustomerSerialNo");
        //                $scope.filterApplied.splice(index, 1);
        //                $scope.getAllCustomers();
        //            }
        //            break;
        //        case 2:
        //            {
        //                $scope.SearchCustomerModel.searchCustomerName = "";
        //                $scope.pagingInfo.filterList["CustomerName"] = "";
        //                var index = $scope.filterApplied.indexOf("CustomerName");
        //                $scope.filterApplied.splice(index, 1);
        //                $scope.getAllCustomers();
        //            }
        //            break;
        //    }

        //};


        //function closeDropDown() {
        //    $(".show").each(function () {
        //        $(this).toggleClass("show");
        //    });
        //}

        /* *** End *** */

        // Start to get list of all customers

        //$scope.getAllCustomers = function () {

        //    var qs = $httpParamSerializer($scope.CustomerpagingInfo);
        //    $scope.myProm = ApiService.masterget(BFNConstants.urls.getCustomersForPayment + "?CustomerName=" + $scope.member.searchText + "&FK_CommiteId="+$scope.newPayment.CommiteId+"&PageNumber=" + $scope.CustomerpagingInfo.page + "&ItemsPerPage=" + $scope.CustomerpagingInfo.itemsPerPage + "&isName=" + $scope.member.isName);
        //    $scope.myProm.then(function mySucces(response) {
        //        GetAllCompanySucceded(response);
        //    }
        //    , function myError(response) {
        //        requestFailed(response);
        //    });

        //};

        //$scope.getCustomerForAssign = function () {
        //    debugger;
        //    var qs = $httpParamSerializer($scope.CustomerpagingInfo);
        //    $scope.myProm = ApiService.masterget(BFNConstants.urls.getMembersForAssign + "?CustomerName=" + $scope.member.searchText + "&FK_CommiteId=" + $stateParams.Id + "&PageNumber=" + $scope.CustomerpagingInfo.page + "&ItemsPerPage=" + $scope.CustomerpagingInfo.itemsPerPage + "&isName=" + $scope.member.isName);
        //    $scope.myProm.then(function mySucces(response) {
        //        GetAllCompanySucceded(response);
        //    }
        //    , function myError(response) {
        //        requestFailed(response);
        //    });

        //};

        //function GetAllCompanySucceded(response) {
        //    $scope.listAllCustomers = response.data.Data;
        //    $scope.CustomerpagingInfo.totalItems = response.data.TotalRecords;
        //    $scope.CustomerpagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
        //    $scope.CustomerpagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
        //    if ($scope.listAllCustomers.length == 0)
        //        toastr.error("No record found.")

        //}


        //$scope.setMember = function () {
        //    debugger;
        //    $scope.listAllCustomers = {};

        //    if ($stateParams.Id) {
        //        $scope.newMember.FK_CommiteId = $stateParams.Id;
        //        $scope.newMember.FK_CustomerId = $scope.member.FK_MemberId;
        //        $scope.newMember.LastUpdatedDate = $scope.newMember.CreatedDate = moment(BFNConstants.getDateTime()).format("MM/DD/YYYY HH:mm");
        //        $scope.newMember.IsActive = true;
        //        $scope.newMember.CreatedBy = $cookies.get('userIdBFN');
        //        $scope.newMember.LastUpdatedBy = $cookies.get('userIdBFN');
        //        ApiService.post(BFNConstants.urls.addCommiteMembers, $scope.newMember, addMemberSucceded, requestFailed);
        //    }
        //    else {
        //        $scope.newPayment.FK_MemberId = $scope.member.FK_MemberId;
        //        $scope.newPayment.CustomerName = $scope.member.CustomerName;
        //    }
 
        //    $("#searchMember").modal('hide');
        //    $('.modal-backdrop').remove();
        //}

        //function addMemberSucceded(response) {
        //    $scope.getCommiteMembers();
        //    $scope.newMember = {};
        //}


        //end to get list of all companies



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

        //$scope.searchMember = function () {
        //    $scope.listAllCustomers = {};
        //    $scope.member.isName = true;
        //    if ($stateParams.Id) {
        //        $scope.getCustomerForAssign();
        //    }
        //    else {
        //        if ($scope.newPayment.CommiteId > 0) {
        //            $scope.getAllCustomers();
        //        }
        //        else {
        //            notificationService.displayError('please select commite first.');
        //        }
        //    }


        //}

        //$scope.closePaymentMember = function () {
        //    $scope.listAllCustomers = {};

        //}



    }

})(angular.module('Common.Core'));