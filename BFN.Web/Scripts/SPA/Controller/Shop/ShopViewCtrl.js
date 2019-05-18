
(function (app) {
    'use strict';

    app.controller('ShopViewCtrl', ShopViewCtrl);
    
    ShopViewCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$cookies', '$stateParams', "$httpParamSerializer", 'moment', '$timeout'];

    function ShopViewCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService, $cookies, $stateParams, $httpParamSerializer, moment, $timeout) {
        $scope.viewShop = {};
        $scope.viewContactPerson = {};
        $scope.newTimeTemplateHours = {};

        $scope.userHeading = "Add Shop Admin";
        $scope.userEdit = "Edit Shop Admin";
        $scope.userView = "View Shop Admin";
        $scope.userRole = "ShopAdmin";
        $scope.isShop = true;



        // .. Start Active/Deactive Shopf Method

        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }

        $scope.deactiveShopConfirm = function () {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "All the child opening hours will be deactivated. Do you want to proceed?";
            $scope.deActiveExp = "deleteShop(" + $scope.id + ")";
        }

        $scope.activeShopConfirm = function () {
            if (!$scope.viewShop.IsParentActive) {
                notificationService.displayError("You cannnot activate this shop. Until parent of that shop is activated.");
            } else {
                $timeout(function () {
                    $("#openActiveShop").click();
                }, 0);
                $scope.activeMessage = "";
                $scope.activeMessage = "All the child opening hours will be restored in previous positions. Do you want to proceed?";
                $scope.activeExp = "activateShop(" + $scope.id + ")";
            }

        }

        // .. End of Active/Deactive Shop Method..



        // Start of Activate/Delete Shop

        $scope.deleteShop = function (id) {
            ApiService.get(BFNConstants.urls.deleteShop + "?Id=" + id, null, actDelChainSucceded, requestFailed);
        }

        $scope.activateShop = function (id) {
            ApiService.get(BFNConstants.urls.activateShop + "?Id=" + id, null, actDelChainSucceded, requestFailed);
        }

        function actDelChainSucceded(response) {
            $scope.getShop();
        }

        // End of Activate/Delete Shop



        $scope.id = $stateParams.id;
        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#shopLink').addClass('active');
        }
        if ($cookies.get('token') != null) {
            ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }
        function AuthorizationResultSucceded(response) {
            $scope.getShop();
            setSideBarMenu();
            //$scope.getShopContactPerson();
        }
        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.getShop = function () {
            ApiService.get(BFNConstants.urls.getShop + "?id=" + $scope.id, null, GetShopSucceded, GetShopFailed);

        };
        
        function GetShopSucceded(response) {
            $scope.viewShop = response.data;
            $scope.viewShop.InagurationDate = ($scope.viewShop.InagurationDate == null ? "-" : moment($scope.viewShop.InagurationDate).format("MM/DD/YYYY"));
            $scope.viewShop.TerminatinonDate = ($scope.viewShop.TerminatinonDate == null ? "-" : moment($scope.viewShop.TerminatinonDate).format("MM/DD/YYYY"));
            if ($scope.viewShop.IsActive) {
                $scope.ActivateShop = false;
                $scope.DeactivateShop = true;
            }
            else {
                $scope.ActivateShop = true;
                $scope.DeactivateShop = false;
            }

        }

        function GetShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Shop data..');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }






        // Request Failed function call if any request is going to failed or error comes on server side

        function requestFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of this funciton..

        //Open Shop Admin Dialog



        //End of Shop Admin Dailog

    }
})(angular.module('Common.Core'));