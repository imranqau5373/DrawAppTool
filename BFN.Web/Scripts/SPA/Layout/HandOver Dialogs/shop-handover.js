﻿
(function (app) {
    'use strict';

    app.controller('shopHandover', shopHandover);

    shopHandover.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer', 'moment'];

    function shopHandover($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer, $moment) {

        $scope.handover = {};

        /* *** Start *** */

        $scope.SearchHandoverModel = {
            searchCVR: "",
            searchChainName: "",
            searchChainAddress: "",
            searchChainCompanies: "",
            searchChainEmail: ""
        };

        $scope.HandoverpagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.HandoverpagingInfo.filterList["CompanyCVR"] = $scope.SearchHandoverModel.searchCVR;
                    if ($scope.filterApplied.indexOf("CompanyCVR") === -1) {
                        $scope.filterApplied.push("CompanyCVR");
                    }
                    break;
                case 2:
                    $scope.HandoverpagingInfo.filterList["CompanyName"] = $scope.SearchHandoverModel.searchChainName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
                case 3:
                    $scope.HandoverpagingInfo.filterList["CompanyAddress"] = $scope.SearchHandoverModel.searchChainAddress;
                    if ($scope.filterApplied.indexOf("CompanyAddress") === -1) {
                        $scope.filterApplied.push("CompanyAddress");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["CompanyEmail"] = $scope.SearchHandoverModel.searchChainEmail;
                    if ($scope.filterApplied.indexOf("CompanyEmail") === -1) {
                        $scope.filterApplied.push("CompanyEmail");
                    }
                    break;
            }

            $scope.getAllCompanies();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllCompanies();

        };

        $scope.selectPage = function (page) {
            $scope.HandoverpagingInfo.page = page;
            $scope.getAllCompanies();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchHandoverModel.searchCVR = "";
                        $scope.pagingInfo.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchHandoverModel.searchChainName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchHandoverModel.searchChainAddress = "";
                        $scope.pagingInfo.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchHandoverModel.searchChainEmail = "";
                        $scope.pagingInfo.filterList["CompanyEmail"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyEmail");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
            }

        };


        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        /* *** End *** */

        // Start to get list of all companies

        $scope.getAllCompanies = function () {
            var qs = $httpParamSerializer($scope.HandoverpagingInfo);
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getCompaniesForShop + "?CompanyName=" + $scope.handover.searchText + "&ShopId=" + $scope.id + "&PageNumber=" + $scope.HandoverpagingInfo.page + "&ItemsPerPage=" + $scope.HandoverpagingInfo.itemsPerPage + "&isEmail=" + $scope.handover.isEmail);
            $scope.myProm.then(function mySucces(response) {
                GetAllCompanySucceded(response);
            }
            , function myError(response) {
                requestFailed(response);
            });

        };

        function GetAllCompanySucceded(response) {
            $scope.listAllCompanies = response.data.Data;
            $scope.HandoverpagingInfo.totalItems = response.data.TotalRecords;
            $scope.HandoverpagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.HandoverpagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
            if($scope.listAllCompanies.length == 0)
                toastr.error("No record found.")
           
        }


        //end to get list of all companies

        //Request Failed Function

        function requestFailed(response) {
            console.log(response);
                notificationService.displayError(response.data.Message);
        }

        // end of Request function failed

        //$scope.getAllCompanies();

        // Search Company Admin email

        $scope.searchCompany = function (email) {
            if (email) {
                if (validateEmail(email)) {
                    $scope.handover.isEmail = true;
                }
                $scope.getAllCompanies();
            }
            else {
                toastr.error("Plesae enter the text for search.")
                $scope.listAllCompanies = "";
                $scope.HandoverpagingInfo.totalItems = 0;
                $scope.HandoverpagingInfo.startPageRecordNumber = 0 + 1;
                $scope.HandoverpagingInfo.endPageRecordNumber = 0;
            }



        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // End to search company admin Email

        //Module to Handover Shop

        $scope.handoverShop = function (result) {
            $scope.handover.HandOverDate = moment($scope.handover.HandOverDate).format("MM/DD/YYYY");
            if ($scope.handover.HandOverDate >= moment(new Date()).format("MM/DD/YYYY")) {
                $scope.handover.CurrentShopId = $scope.id;
                if ($scope.handover.companyId) {
                    $scope.handover.NextCompanyId = $scope.handover.companyId;
                    ApiService.post(BFNConstants.urls.handoverCompanyShop, $scope.handover, handoverShopSucceded, requestFailed);
                }
                else {
                    toastr.error("Please select company for handover.");
                }
            }
            else {
                toastr.error("Handover date must be greater or equal to today date.");
            }
            

        }

        function handoverShopSucceded(response) {
            $scope.handover = {};
            toastr.success("Shop handed over successfully.")
            $("#shopHandover").modal('hide');
            $('.modal-backdrop').remove();
            if (response.data == "Queue") {
                $scope.viewShop.isHandoverShop = false;
            }
            
        }

        $scope.openHandoverDialog = function () {
            $scope.handover = {};
            $scope.listAllCompanies = {};
            $scope.HandoverpagingInfo.totalItems = 0;
            $scope.HandoverpagingInfo.startPageRecordNumber = 0;
            $scope.HandoverpagingInfo.endPageRecordNumber = 0;
            $scope.handover.isEmail = false;
        }

        //Module to End Handover Shop.


        $scope.confirmRepealDialog = function () {
            ApiService.get(BFNConstants.urls.getQueueShop + "?shopId=" + $scope.id, null, confirmRepealDialogSuccees, requestFailed)
        }

        function confirmRepealDialogSuccees(response) {
            $scope.handoverId = response.data.HandoverId;
            $scope.shopRemoveMessage = `Do you want to repeal the handover request for '${response.data.ShopName}'  from ${response.data.CurrentCompanyName} to ${response.data.futureCompanyName}?`;

        }

        $scope.reapealHandover = function (id) {
            ApiService.get(BFNConstants.urls.reapealHandover + "?reapealId=" + id + "&isShopCompany=" + false, null, reapealHandoverSuccees, requestFailed)
        }

        function reapealHandoverSuccees(response) {
                $scope.viewShop.isHandoverShop = true;

            toastr.success("Shop reapeal successfully.");
          
        }



    }

})(angular.module('Common.Core'));