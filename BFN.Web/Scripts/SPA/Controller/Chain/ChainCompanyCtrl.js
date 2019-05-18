

(function (app) {
    'use strict';

    app.controller('ChainCompanyCtrl', ChainCompanyCtrl);

    ChainCompanyCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function ChainCompanyCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {


        $scope.chainCompanyGrid = true;
        $scope.viewAllCompanies = {};
        $scope.viewChain.showAddShopBtn = true;
        /* *** Start Paging Sorting and Filtering *** */

        $scope.SearchModel = {
            searchCVR: "",
            searchChainName: "",
            searchChainAddress: "",
            searchChainCompanies: ""
        };


        $scope.pagingInfo = {
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
            }

            $scope.getAllChainCompanies();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllChainCompanies();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllChainCompanies();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCVR = "";
                        $scope.pagingInfo.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainCompanies();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchChainName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainCompanies();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchChainAddress = "";
                        $scope.pagingInfo.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainCompanies();
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

        // Start of Get All Chains Companies

        $scope.getAllChainCompanies = function () {
            var qs = $httpParamSerializer($scope.pagingInfo);
            ApiService.get(BFNConstants.urls.getChainCompaies + "?id=" + $scope.id + "&" + qs, null, getAllChainCompanySucceded, getAllChainCompanyFailed);
        }

        function getAllChainCompanySucceded(response) {
            if (response.data.Companies.length > 0) {
                let totalActiveCompanies = _.find(response.data.Companies, function (value) { return (value.IsActive == true) });
                if (totalActiveCompanies)
                    $scope.viewChain.TotalCompanies = 1;
                else
                    $scope.viewChain.TotalCompanies = 0;
                $scope.chainCompanyGrid = true;
                $scope.viewAllCompanies = response.data.Companies;
                $scope.pagingInfo.totalItems = response.data.TotalRecords;
                $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
                $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
                closeDropDown();
            }
            else {
                // implement this one later on..
                $scope.chainCompanyGrid = true;
            }

        }

        function getAllChainCompanyFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of Get All Companies

        //Start Deactivate/Activate company...

        $scope.deleteChainCompany = function (id) {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "You want to Deactivate Chain Company. Do you want to proceed?";
            $scope.deActiveExp = "delChainCompany(" + id + ")";

        }

        $scope.activateChainCompany = function (id) {
            $scope.activeMessage = "";
            $scope.activeMessage = "You want to Activate Chain Company. Do you want to proceed?";
            $scope.activeExp = "actChainCompany(" + id + ")";
        }

        $scope.delChainCompany = function (id) {
            ApiService.get(BFNConstants.urls.deleteCompany + "?id=" + id, null, deleteChainCompanySucceded, deleteChainCompanyFailed);
        }

        $scope.actChainCompany = function (id) {
            ApiService.get(BFNConstants.urls.activateChain + "?id=" + id, null, deleteChainCompanySucceded, deleteChainCompanyFailed);
        }

        function deleteChainCompanySucceded(response) {
            $scope.getAllChainCompanies();
            $rootScope.$broadcast('updateCompanyShops', '');
        }

        function deleteChainCompanyFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Deactivate Company


        $scope.deactiveMethod = function (exp) {

            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {

            $parse(exp)($scope);

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
            $scope.id = $stateParams.id;
            $scope.getAllChainCompanies();
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