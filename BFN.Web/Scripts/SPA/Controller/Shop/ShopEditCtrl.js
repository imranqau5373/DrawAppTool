
(function (app) {
    'use strict';

    app.controller('ShopEditCtrl', ShopEditCtrl);

    ShopEditCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$timeout','moment'];

    function ShopEditCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $timeout,moment) {
        $scope.editShop = {};
        $scope.allCompanyNames = {};
        $scope.id = $stateParams.id;

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#shopLink').addClass('active');
        }
        if (window.location.href.includes('editCompanyShop')) {
            $scope.isCompany = false;
        }
        else {
            $scope.isCompany = true;
        }
       
        ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed);
        function AuthorizationResultSucceded(response) {
            $scope.getShop();
            setSideBarMenu();
            $scope.getAllCityPostCodes();
            $scope.getAllCategories();
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

        $scope.saveShop = function () {
            debugger;
            let getCompanyName = false;
            /* *** Verify Company Name **** */
            angular.forEach($scope.allCompanyNames, function (value) {
                if (value.CompanyName == $scope.editShop.CompanyName) {
                    getCompanyName = true;
                }
            });
            if (getCompanyName) {
                debugger;
                if ($scope.editShop.ShopCityName.indexOf("(") > 0)
                {
                    $scope.editShop.ShopCityName = $scope.editShop.ShopCityName.substring(0, $scope.editShop.ShopCityName.indexOf("("));
                }
                
                $scope.editShop.InagurationDate = ($scope.editShop.InagurationDate == null ? null : moment($scope.editShop.InagurationDate).format("MM/DD/YYYY"));
                $scope.editShop.TerminatinonDate = ($scope.editShop.TerminatinonDate == null ? null : moment($scope.editShop.TerminatinonDate).format("MM/DD/YYYY"));
                if ($scope.editShop.InagurationDate != null && $scope.editShop.TerminatinonDate != null) {
                    if (new Date($scope.editShop.InagurationDate) > new Date($scope.editShop.TerminatinonDate)) {
                        notificationService.displayError('Inaguration Date must be less then or equal to TerminatinonDate');
                    }
                    else {
                        ApiService.post(BFNConstants.urls.saveShop, $scope.editShop, SaveShopSucceded, SaveShopFailed);
                    }
                }
                else {
                    ApiService.post(BFNConstants.urls.saveShop, $scope.editShop, SaveShopSucceded, SaveShopFailed);
                }
            
            }
            else {
                notificationService.displayError('Please select valid company name.');
            }
          
        };

        $scope.deleteShop = function () {
            if (confirm('Are you sure you want to delete this shop?')) {
                ApiService.post(BFNConstants.urls.deleteShop, $scope.editShop, deleteShopSucceded, deleteShopFailed);
            }
        };

        function GetShopSucceded(response) {
            debugger;
            $scope.editShop = response.data;
            if (response.data.ShopEAN > 0) {
                $scope.editShop.ShopEAN = parseFloat(response.data.ShopEAN);
            }
            $scope.editShop.InagurationDate = $scope.editShop.InagurationDate == null ? "" : new Date($scope.editShop.InagurationDate);
            $scope.editShop.TerminatinonDate = $scope.editShop.TerminatinonDate == null ? "" : new Date($scope.editShop.TerminatinonDate);
            $scope.getAllCompaniesNames();
        }

        function GetShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function SaveShopSucceded(response) {
            $scope.editShop = response.data;
            angular.element('#dlInfoPart').css('pointer-events', 'fill');
            angular.element('#shopPart').css('pointer-events', 'none');
            $timeout(function () {
                $("#dlInfoPart").click();
            }, 0);            
        }

        function SaveShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function deleteShopSucceded(response) {
            if ($stateParams.companyId != null) {
                $scope.editShop = {};
                //window.location.href = "Home/viewCompany/" + $stateParams.companyId;
                $location.url('/Home/viewCompany/' + $stateParams.companyId);
            }
            else {
                //window.location.href = "Home/viewShop/" + +$scope.id;
                $location.url('/Home/viewShop/' + $stateParams.id);
            }
        }

        function deleteShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to delete Shop.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.addDeliveryInfo = function () {
            ApiService.post(BFNConstants.urls.saveShop, $scope.editShop, addDeliveryInfoSucceded, addDeliveryInfoShopFailed);
        };
        function addDeliveryInfoSucceded(response) {
            if ($stateParams.chainId != null) {
                $scope.editShop = {};
                //window.location.href = "Home/viewChain/" + $stateParams.chainId;
                $location.url('/Home/viewChain/' + $stateParams.chainId);
            }
            else if ($stateParams.companyId != null) {
                $scope.editShop = {};
                //window.location.href = "Home/viewCompany/" + $stateParams.companyId;
                $location.url('/Home/viewCompany/' + $stateParams.companyId);
            }
            else {
                $scope.editShop = {};
                //window.location = "Home/viewShop/" + $scope.id;
                $location.url('/Home/viewShop/' + $scope.id);
            }
        }

        function addDeliveryInfoShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        /* *** Verify correct name entered Start*** */
        $scope.getAllCompaniesNames = function () {
            ApiService.get(BFNConstants.urls.getAllCompaniesNames, null, getAllCompaniesNamesSucceded, getAllCompaniesNamesFailed);
        };

        function getAllCompaniesNamesSucceded(response) {
            $scope.allCompanyNames = response.data;
        }
        function getAllCompaniesNamesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Verify correct name entered End*** */

        /* *** Get post code auto complete Start*** */
        $scope.getAllCityPostCodes = function () {
            debugger;
            let apiUrl = "api/CityPostCode/getAllCityPostCodes";
            ApiService.get(apiUrl, null, getAllCityPostCodesSucceded, getAllCityPostCodesFailed);
        };

        function getAllCityPostCodesSucceded(response) {
            $scope.allCityPostCodes = response.data;
            var options = {
                data: response.data,
                getValue: "PostNumber",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#chain-postal").getSelectedItemData().CityName;
                        $("#chain-city").val(value).trigger("change");
                    }
                }
            };
            $("#chain-postal").easyAutocomplete(options);
            var options2 = {
                data: response.data,
                getValue: "CityName",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#chain-city").getSelectedItemData().PostNumber;
                        $("#chain-postal").val(value).trigger("change");
                    }
                }
            };
            $("#chain-city").easyAutocomplete(options2);
        }
        function getAllCityPostCodesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Get post code auto complete End*** */
        /* *** Get Category auto complete Start*** */
        $scope.getAllCategories = function () {
            debugger;
            let apiUrl = "api/Category/getAllCategories";
            ApiService.get(apiUrl, null, getAllCategoriesSucceded, getAllCategoriesFailed);
        };

        function getAllCategoriesSucceded(response) {
            $scope.allCityPostCodes = response.data;
            var options = {
                data: response.data,
                getValue: "CategoryName",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#CategoryName").getSelectedItemData().Id;
                        $("#ShopFrellationsNummerCategoryId").val(value).trigger("change");
                    }
                }
            };
            $("#CategoryName").easyAutocomplete(options);
        }
        function getAllCategoriesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Get Category auto complete End*** */

    }

})(angular.module('Common.Core'));