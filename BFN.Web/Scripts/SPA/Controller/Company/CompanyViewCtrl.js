

(function (app) {
    'use strict';

    app.controller('CompanyViewCtrl', CompanyViewCtrl);

    CompanyViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams'];

    function CompanyViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams) {
        $scope.viewCompany = {};
        $scope.id = $stateParams.companyId;
        $scope.userHeading = "Add Company Admin";
        $scope.userEdit = "Edit Company Admin";
        $scope.userView = "View Company Admin";
        $scope.userRole = "CompanyAdmin";

        function setSideBarMenu() {
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#companyLink').addClass('active');
        }

        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }
        //Authorization Module ...

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
            }
        function AuthorizationResultSucceded(response) {
            $scope.getCompany();
            setSideBarMenu();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Authorization Module...

        // Get Company Information when page is loaded...

        $scope.getCompany = function () {
            ApiService.get(BFNConstants.urls.getCompany + "?id=" + $scope.id, null, GetCompanySucceded, GetCompanyFailed);

        };

        function GetCompanySucceded(response) {
            $scope.viewCompany = response.data;
            if ($scope.viewCompany.IsActive) {
                $scope.ActivateCompany = false;
                $scope.DeactivateCompany= true;
            }
            else {
                $scope.ActivateCompany = true;
                $scope.DeactivateCompany = false;
            }
        }

        function GetCompanyFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get company data..');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // Start To Get All Shops of Company
        $scope.getCompanyShops = function () {
            ApiService.get(BFNConstants.urls.getCompanyShops + "?id=" + $stateParams.companyId, null, getCompanyShopsSucceded, getCompanyShopsFailed);

        };

        function getCompanyShopsSucceded(response) {
            $scope.viewAllShops = response.data;
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



        // Start Activate/Deactivate Shop ...

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

        $scope.delCompanyShop = function (id) {
            ApiService.get(BFNConstants.urls.deleteShop + "?id=" +id, null, deleteCompanyShopSucceded, deleteCompanyShopFailed);
            }

        $scope.actCompanyShop = function (id) {
            ApiService.get(BFNConstants.urls.activateShop + "?id=" +id, null, deleteCompanyShopSucceded, deleteCompanyShopFailed);
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

        //End of Deactivate Shop

        // Start to delete/Active Company 

        $scope.deactiveCompConfirm = function () {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "All the child shops will be deactivated as well. Do you want to proceed?";
            $scope.deActiveExp = "deleteCompany(" + $scope.id + ")";
        }

        $scope.activeCompConfirm = function () {
            debugger;
            if (!$scope.viewCompany.IsParentActive) {
                notificationService.displayError("You cannnot activate this company. Until parent chain is activated.");
            } else {
                $timeout(function () {
                    $("#openActiveCompany").click();
                }, 0);
                $scope.activeMessage = "";
                $scope.activeMessage = "All the child shops will be restored in previous positions. Do you want to proceed?";
                $scope.activeExp = "activateCompany(" + $scope.id + ")";
            }

        }


        $scope.deleteCompany = function (id) {
            ApiService.get(BFNConstants.urls.deleteChain + "?Id=" + id, null, delActChainSucceded, delActChainFailed);
        }

        $scope.activateCompany = function (id) {
            ApiService.get(BFNConstants.urls.activateChain + "?Id=" + id, null, delActChainSucceded, delActChainFailed);
        }

        function delActChainSucceded(response) {
            $scope.getCompany();
        }

        function delActChainFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of delete/Active Company


    }

})(angular.module('Common.Core'));