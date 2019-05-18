

(function (app) {
    'use strict';

    app.controller('CustomerIndexCtrl', CustomerIndexCtrl);

    CustomerIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CustomerIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.listAllCustomers = {};

        /* *** Start *** */
        
        $scope.SearchModel = {
            searchCustomerName: "",
            searchCustomerSerialNo: "",
            searchCustomerIdCard: "",
            searchCustomerAddress: ""
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.listingPaging,
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

            $scope.getAllCustomers();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllCustomers();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllCustomers();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCustomerSerialNo = "";
                        $scope.pagingInfo.filterList["CustomerSerialNo"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerSerialNo");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCustomers();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchCustomerName = "";
                        $scope.pagingInfo.filterList["CustomerName"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCustomers();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchCustomerIdCard = "";
                        $scope.pagingInfo.filterList["CustomerIdCardNo"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerIdCardNo");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCustomers();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchCustomerAddress = "";
                        $scope.pagingInfo.filterList["CustomerAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CustomerAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCustomers();
                    }
                    break;
            }

        };

        /* *** End *** */

        $scope.getAllCustomers = function () {
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllCustomers);
            $scope.myProm.then(function mySucces(response) {
                GetAllCustomerSucceded(response);
            }
            , function myError(response) {
                requestFailed(response);
            });

        }

        function GetAllCustomerSucceded(response) {
            $scope.listAllCustomers = response.data;


        }

        $scope.getAllCustomers();















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



    }

})(angular.module('Common.Core'));