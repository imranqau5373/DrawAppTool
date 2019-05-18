(function (app) {
    'use strict';

    app.controller('ChainViewCtrl', ChainViewCtrl);

    ChainViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function ChainViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        $scope.id = $stateParams.id;
        $scope.viewChain = {};
        $scope.newChainUser = {};
        $scope.editAdmin = {};
        $scope.viewAllCompanies = {};
        $scope.chainUsers = {};
        $scope.viewAllShops = {};
        $scope.userHeading = "Add Chain Admin";
        $scope.userEdit = "Edit Chain Admin";
        $scope.userView = "View Chain Admin";
        $scope.userRole = "ChainAdmin";
        $scope.viewChain.showAddShopBtn = false;



        $scope.deactiveMethod = function (exp) {
            debugger;
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            debugger;
            $parse(exp)($scope);

        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#chainLink').addClass('active');
        }

        // .. Start Active/Deactive Chain Method

        $scope.deactiveChainConfirm = function () {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "All the child companies and shops will be deactivated as well. Do you want to proceed?";
            $scope.deActiveExp = "deleteChain(" + $scope.id + ")";
        }

        $scope.activeChainConfirm = function () {
            $scope.activeMessage = "";
            $scope.activeMessage = "All the child companies and shops will be restored in previous positions. Do you want to proceed?";
            $scope.activeExp = "activateChain(" + $scope.id + ")";
        }

        // .. End of Active/Deactive Chain Method..

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
            sortBy: "Name",
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

            $scope.getAllCompanies();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllCompanies();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllCompanies();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCVR = "";
                        $scope.pagingInfo.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchChainName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchChainAddress = "";
                        $scope.pagingInfo.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
            }

        };


        /* *** End *** */

        $scope.id = $stateParams.id;

        //Authorization Module to authorize request...
        if ($cookies.get('token') != null) {
            ApiService.get('/api/Chain/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');

        }


        function AuthorizationResultSucceded(response) {
            $scope.getChain();
            setSideBarMenu();
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

        //End of Authorization Module...

        //Get Chain Details from Server like its companies, Shops and Users.

        $scope.getChain = function () {
            ApiService.get(BFNConstants.urls.getChain + "?id=" + $scope.id, null, GetChainSucceded, GetChainFailed);

        };

        function GetChainSucceded(response) {
            $scope.viewChain = response.data;
            if ($scope.viewChain.IsActive) {
                $scope.ActivateChain = false;
                $scope.DeactivateChain = true;
            }
            else {
                $scope.ActivateChain = true;
                $scope.DeactivateChain = false;
            }

        }

        function GetChainFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Chain Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Get Chain Details Module
        
        // Start to delete chain 
        $scope.deleteChain = function (id) {

            ApiService.get(BFNConstants.urls.deleteChain + "?Id=" + id, null, deleteChainSucceded, deleteChainFailed);
        }

        function deleteChainSucceded(response) {
            $scope.getChain();
            //window.location.href = "/Home/viewChain/" + $scope.id;
        }

        function deleteChainFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of delete chain

        // Start of Activate Chain

        $scope.activateChain = function (id) {
            ApiService.get(BFNConstants.urls.activateChain + "?Id=" + id, null, activateChainSucceded, activateChainFailed);
        }

        function activateChainSucceded(response) {
            $scope.getChain();
        }

        function activateChainFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of Activate Chain







        //Start Deactivate/Activate Shop...

        $scope.deleteCompanyShop = function (id) {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "You want to Deactivate Shop. Do you want to proceed?";
            $scope.deActiveExp = "delCompanyShop(" + id + ")";

        }

        $scope.activateCompanyShop = function (id) {
            $scope.activeMessage = "";
            $scope.activeMessage = "You want to Activate Shop. Do you want to proceed?";
            $scope.activeExp = "actCompanyShop(" + id + ")";
        }



        //End of Deactivate Shop




    }

})(angular.module('Common.Core'));