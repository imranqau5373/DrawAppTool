

(function (app) {
    'use strict';

    app.controller('CommiteIndexCtrl', CommiteIndexCtrl);

    CommiteIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CommiteIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        debugger;
        $scope.listAllCommites = {};
        $scope.listAllMembers = {};

        /* *** Start *** */

        $scope.SearchModel = {
            searchCustomerName: "",
            searchCustomerSerialNo: "",
            searchCustomerIdCard: "",
            searchCustomerFather: ""
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
                    $scope.pagingInfo.filterList["CustomerName"] = $scope.SearchModel.searchCVR;
                    if ($scope.filterApplied.indexOf("CustomerName") === -1) {
                        $scope.filterApplied.push("CustomerName");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["CompanyName"] = $scope.SearchModel.searchChainName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["CompanyAddress"] = $scope.SearchModel.searchChainAddress;
                    if ($scope.filterApplied.indexOf("CompanyAddress") === -1) {
                        $scope.filterApplied.push("CompanyAddress");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["TotalCompanies"] = $scope.SearchModel.searchTotalCompanies;
                    if ($scope.filterApplied.indexOf("TotalCompanies") === -1) {
                        $scope.filterApplied.push("TotalCompanies");
                    }
                    break;
            }

            $scope.getAllChains();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllChains();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllChains();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCVR = "";
                        $scope.pagingInfo.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChains();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchChainName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChains();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchChainAddress = "";
                        $scope.pagingInfo.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChains();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchTotalCompanies = "";
                        $scope.pagingInfo.filterList["TotalCompanies"] = "";
                        var index = $scope.filterApplied.indexOf("TotalCompanies");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChains();
                    }
                    break;
            }

        };

        /* *** End *** */

        $scope.getAllCommites = function () {
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllCommites);
            $scope.myProm.then(function mySucces(response) {
                GetAllCommiteSucceded(response);
            }
            , function myError(response) {
                requestFailed(response);
            });

        }

        function GetAllCommiteSucceded(response) {
            debugger;
            $scope.listAllCommites = response.data;


        }



        $scope.getAllCommites();

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