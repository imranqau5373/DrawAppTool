

(function (app) {
    'use strict';

    app.controller('HandoverIndexCtrl', HandoverIndexCtrl);

    HandoverIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function HandoverIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        // Paging and filtering and sorting etc for Handedover Shops.


        $scope.SearchModel = {
            searchShopBFNNumber: "",
            searchShopName: "",
            searchShopAddress: "",
            searchCompanyName: ""
        };

        $scope.SearchCompanyModel = {
            searchCVR: "",
            searchChainName: "",
            searchChainAddress: "",
            searchChainCompanies: ""
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "ShopBFNNumber",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.pagingInfoCompany = {
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "CompanyCVR",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["ShopBFNNumber"] = $scope.SearchModel.searchShopBFNNumber;
                    if ($scope.filterApplied.indexOf("ShopBFNNumber") === -1) {
                        $scope.filterApplied.push("ShopBFNNumber");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["ShopName"] = $scope.SearchModel.searchShopName;
                    if ($scope.filterApplied.indexOf("ShopName") === -1) {
                        $scope.filterApplied.push("ShopName");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["ShopAddress"] = $scope.SearchModel.searchShopAddress;
                    if ($scope.filterApplied.indexOf("ShopAddress") === -1) {
                        $scope.filterApplied.push("ShopAddress");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["CompanyName"] = $scope.SearchModel.searchCompanyName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
            }

            $scope.handedoverShops();
        };

        $scope.searchCompany = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfoCompany.filterList["CompanyCVR"] = $scope.SearchCompanyModel.searchCVR;
                    if ($scope.filterApplied.indexOf("CompanyCVR") === -1) {
                        $scope.filterApplied.push("CompanyCVR");
                    }
                    break;
                case 2:
                    $scope.pagingInfoCompany.filterList["CompanyName"] = $scope.SearchCompanyModel.searchChainName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
                case 3:
                    $scope.pagingInfoCompany.filterList["CompanyAddress"] = $scope.SearchCompanyModel.searchChainAddress;
                    if ($scope.filterApplied.indexOf("CompanyAddress") === -1) {
                        $scope.filterApplied.push("CompanyAddress");
                    }
                    break;
            }

            $scope.handedoverCompanies();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.handedoverShops();

        };

        $scope.sortCompany = function (sortBy, reverse) {

            $scope.pagingInfoCompany.sortBy = sortBy;
            $scope.pagingInfoCompany.reverse = reverse;
            $scope.handedoverCompanies();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.handedoverShops();
        };

        $scope.selectPageCompany = function (page) {
            $scope.pagingInfoCompany.page = page;
            $scope.handedoverCompanies();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchShopBFNNumber = "";
                        $scope.pagingInfo.filterList["ShopBFNNumber"] = "";
                        var index = $scope.filterApplied.indexOf("ShopBFNNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverShops();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchShopName = "";
                        $scope.pagingInfo.filterList["ShopName"] = "";
                        var index = $scope.filterApplied.indexOf("ShopName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverShops();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchShopAddress = "";
                        $scope.pagingInfo.filterList["ShopAddress"] = "";
                        var index = $scope.filterApplied.indexOf("ShopAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverShops();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchCompanyName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverShops();
                    }
                    break;
            }

        };

        $scope.clearSearchCompany = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchCompanyModel.searchCVR = "";
                        $scope.pagingInfoCompany.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverCompanies();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchCompanyModel.searchChainName = "";
                        $scope.pagingInfoCompany.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverCompanies();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchCompanyModel.searchChainAddress = "";
                        $scope.pagingInfoCompany.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.handedoverCompanies();
                    }
                    break;
            }

        };

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


        //End of paging of Handedover shops Grid...

        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Handover/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
        }
        else {
            window.location = "/"
        }

        function AuthorizationResultSucceded(response) {
            $scope.handedoverShops();
            $scope.handedoverCompanies();
            $scope.clickShopHandover();
        }

        function RequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Authorization ...

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

        //Start to get list of all Handedover shops/Companies.

        $scope.handedoverShops = function () {
            let qs = $httpParamSerializer($scope.pagingInfo);
            ApiService.get(BFNConstants.urls.getHandedoverShops + "?" + qs, null, handedoverShopsSuccees, RequestFailed)
        }

        function handedoverShopsSuccees(response) {
            $scope.viewAllHandedoverShops = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
            $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
            closeDropDown();
        }

        $scope.handedoverCompanies = function () {
            let qs = $httpParamSerializer($scope.pagingInfoCompany);
            ApiService.get(BFNConstants.urls.getHandedoverCompanies + "?" + qs, null, handedoverCompaniesSuccees, RequestFailed)
        }

        function handedoverCompaniesSuccees(response) {
            $scope.viewAllHandedoverCompanies = response.data.Data;
            $scope.pagingInfoCompany.totalItems = response.data.TotalRecords;
            $scope.pagingInfoCompany.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfoCompany.endPageRecordNumber = response.data.EndPageRecordNumber;
            closeDropDown();
        }

        $scope.clickShopHandover = function () {
   
            $("#shop-handover").css("display", "block");
            $("#company-handover").css("display", "none");
        }

        $scope.clickCompanyHandover = function () {
 
            $("#shop-handover").css("display", "none");
            $("#company-handover").css("display", "block");
        }

        // end to get list of all company/shops.

        //Start to remove and confirm handover company/shop


        $scope.confirmReaper = function (shopCompany, current, future, id) {
            $scope.handoverId = id;
            $scope.shopRemoveMessage = `Do you want to repeal the handover request for '${shopCompany}'  from ${current} to ${future}?`;

        }

        $scope.reapealHandover = function (id) {
 
            ApiService.get(BFNConstants.urls.reapealHandover + "?reapealId=" + id+"&isShopCompany="+true, null, reapealHandoverSuccees, RequestFailed)
        }

        function reapealHandoverSuccees(response) {
            if (response.data.Data > 0) {
                toastr.success("Shop reapeal successfully.")
                $scope.handedoverShops();
                
            } else {
                toastr.success("Company reapeal successfully.");
                $scope.handedoverCompanies();
            }
        }



        //



    }

})(angular.module('Common.Core'));