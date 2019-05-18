﻿(function (app) {
    'use strict';
    app.controller('ChainIndexCtrl', ChainIndexCtrl);
    ChainIndexCtrl.$inject = ['$scope', '$cookies', '$location', '$rootScope', 'ApiService', 'notificationService', "$httpParamSerializer"];

    function ChainIndexCtrl($scope,$cookies, $location, $rootScope, ApiService, notificationService, $httpParamSerializer) {
        $scope.listAllChains = {};


        // Start of Authorization Module

        if ($cookies.get('token') != null) {
            $scope.AuthorizeResponse = ApiService.masterget('/api/Chain/IsAuthorized'); //, null, AuthorizationResultSucceded, AuthorizationResultFailed
            $scope.AuthorizeResponse.then(function mySucces(response) {
                AuthorizationResultSucceded(response);
            }
            , function myError(response) {
                AuthorizationResultFailed(response);
            });
        }
        else {
            $location.url('/');
        }
        function AuthorizationResultSucceded(response) {
            $scope.getAllChains();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);

            $location.url('/');

        }

        //End of Authorization Module

        $scope.getAllChains = function () {
            //setSideBarMenu();
            var qs = $httpParamSerializer($scope.pagingInfo);
            //$scope.myPromise = ApiService.get(BFNConstants.urls.getAllChains + "?" + qs, null, GetAllChainSucceded, GetAllChainFailed);
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllChains + "?" + qs);
            $scope.myProm.then(function mySucces(response) {
                GetAllChainSucceded(response);
            }
            , function myError(response) {
                GetAllChainFailed(response);
            });
        };

        
        /* *** Start *** */


        $scope.SearchModel = {
            searchCVR: "",
            searchChainName: "",
            searchChainAddress: "",
            searchTotalCompanies: ""
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.listingPaging,
            sortBy: "CompanyCVR",
            reverse: false,
            filterList: {},
            totalItems: 0
        };
        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["CompanyCVR"] = $scope.SearchModel.searchCVR;
                    if ($scope.filterApplied.indexOf("CompanyCVR") === -1) {
                        $scope.filterApplied.push("CompanyCVR");
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

        function GetAllChainSucceded(response) {
            $scope.listAllChains = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
            $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
            closeDropDown();
        }

        function GetAllChainFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Chain Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('.sidebar-nav .nav li a').each(function () {
                if (this.href == url) {
                    $(this).parent().addClass('active');
                }
            });
        }


    }

})(angular.module('Common.Core'));