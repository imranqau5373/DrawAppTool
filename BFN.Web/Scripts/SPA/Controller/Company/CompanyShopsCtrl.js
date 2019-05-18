

(function (app) {
    'use strict';

    app.controller('CompanyShopsCtrl', CompanyShopsCtrl);

    CompanyShopsCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function CompanyShopsCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {


        $scope.companyShopGrid = true;
        $scope.viewAllShops = {};
        /* *** Start Paging Sorting and Filtering *** */
        $scope.SearchModel = {
            searchShopBFNNumber: "",
            searchShopName: "",
            searchShopAddress: ""
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "ShopBFNNumber",
            reverse: false,
            filterList: {},
            totalItems: 0,
            isChain : false
        };

        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            debugger;
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
            }

            $scope.getCompanyShops();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getCompanyShops();

        };

        $scope.selectShopPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getCompanyShops();
        };

        $scope.clearShopSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchShopBFNNumber = "";
                        $scope.pagingInfo.filterList["ShopBFNNumber"] = "";
                        var index = $scope.filterApplied.indexOf("ShopBFNNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCompanyShops();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchShopName = "";
                        $scope.pagingInfo.filterList["ShopName"] = "";
                        var index = $scope.filterApplied.indexOf("ShopName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCompanyShops();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchShopAddress = "";
                        $scope.pagingInfo.filterList["ShopAddress"] = "";
                        var index = $scope.filterApplied.indexOf("ShopAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getCompanyShops();
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

        /* *** End *** */


        // Start To Get All Shops of Company
        $scope.getCompanyShops = function () {
            var qs = $httpParamSerializer($scope.pagingInfo);

           ApiService.get(BFNConstants.urls.getCompanyShops + "?id=" + $scope.id + "&" + qs, null, getCompanyShopsSucceded, getCompanyShopsFailed);

        };

        $rootScope.$on('updateCompanyShops', function (ev, args) {
            var qs = $httpParamSerializer($scope.pagingInfo);
            ApiService.get(BFNConstants.urls.getCompanyShops + "?id=" + $scope.id + "&" + qs, null, getCompanyShopsSucceded, getCompanyShopsFailed);

        });

        function getCompanyShopsSucceded(response) {
            if (response.data.Shops.length > 0) {
                $scope.companyShopGrid = true;
                $scope.viewAllShops = response.data.Shops;
                $scope.pagingInfo.ShoptotalItems = response.data.TotalShopRecords;
                $scope.pagingInfo.startShopPageRecordNumber = response.data.StartShopPageNumber + 1;
                $scope.pagingInfo.endPageShopRecordNumber = response.data.EndShopPageNumber;
                closeDropDown();
            }
            else {
                $scope.companyShopGrid = true;
                $scope.pagingInfo.ShoptotalItems = 0;
            }

        }

        function getCompanyShopsFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Get All Shops of Company

        $scope.delCompanyShop = function (id) {
            debugger;
            ApiService.get(BFNConstants.urls.deleteShop + "?id=" + id, null, deleteCompanyShopSucceded, deleteCompanyShopFailed);
        }

        $scope.actCompanyShop = function (id) {
            ApiService.get(BFNConstants.urls.activateShop + "?id=" + id, null, deleteCompanyShopSucceded, deleteCompanyShopFailed);
        }

        function deleteCompanyShopSucceded(response) {
            $scope.getCompanyShops();
        }

        function deleteCompanyShopFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        

        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            //ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
            AuthorizationResultSucceded("");
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            if ($stateParams.id) {
                $scope.id = $stateParams.id;
                $scope.pagingInfo.isChain = true;
            }
            else {
                $scope.id = $stateParams.companyId;
                $scope.pagingInfo.isChain = false;
            }

            $scope.getCompanyShops();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Authorization ...





    }

})(angular.module('Common.Core'));