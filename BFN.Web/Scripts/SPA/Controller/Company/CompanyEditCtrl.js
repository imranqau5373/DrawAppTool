

(function (app) {
    'use strict';

    app.controller('CompanyEditCtrl', CompanyEditCtrl);

    CompanyEditCtrl.$inject = ['$scope', '$timeout', '$cookies', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams'];

    function CompanyEditCtrl($scope, $timeout, $cookies, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams) {
     
        $scope.companyId = $stateParams.companyId;
        $scope.allChainNames = {};

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#companyLink').addClass('active');
        }

        $scope.saveEditCompany = function () {
            if ($stateParams.chainId != null) {
                //window.location = "Home/viewChain/" + $stateParams.chainId;
                $location.url('/Home/viewChain/' + $stateParams.chainId);
            } else {
                $location.url('/Home/viewCompany/' + $stateParams.companyId);
                //window.location = "Home/viewCompany/" + $stateParams.companyId;
            }
        }

        //Authorization Module ...

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            $scope.getAllCityPostCodes();
            $scope.getCompany();
            setSideBarMenu();
            $scope.getAllChainsNames();
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


        /* *** Get post code auto complete Start*** */

        $scope.getAllCityPostCodes = function () {

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

        //Verify CVR Module ....


        $scope.verifyCVR = function () {
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                ApiService.post(BFNConstants.urls.verifyCVR, $scope.editCompany, verifyCVRNumberSucceded, verifyCVRNumberFailed);
            }
        }

        function verifyCVRNumberSucceded(response) {
            if (response.data.Success) {
                $scope.cvrNumber = response.data.CVRNumber;
                notificationService.displaySuccess('Successfully Verified CVR Number.');
                $scope.isCVRError = false;
            }
            else {

                $scope.isCVRError = true;
            }
        }

        function verifyCVRNumberFailed(response) {
            notificationService.displayError('Failed to verify CVR number.');
        }

        $scope.$watch('editCompany.CompanyCVR', function (newValue, oldValue) {
            $scope.isCVRError = false;
            //it remove cvr default error if user going to change cvr.
        });

        //End of verify CVR Module...

        //Show Company from Database Module

        $scope.editCompany = {};

        $scope.getCompany = function () {
            if ($stateParams.chainId) {
                $("#selectChain").children().attr("disabled", "disabled");
                $(".easy-autocomplete").children().attr("disabled", "disabled");
            }

            ApiService.get(BFNConstants.urls.getCompanyWithChain + "?id=" + $scope.companyId, null, GetCompanySucceded, GetCompanyFailed);


        };

        function GetCompanySucceded(response) {

            $scope.editCompany = response.data;
            $scope.editCompany.CompanyCVR = parseFloat($scope.editCompany.CompanyCVR, 10);
            $scope.editCompany.CompanyBankAccountNo = parseFloat($scope.editCompany.CompanyBankAccountNo, 10);
            $scope.CompanyUsers = response.data.Users;

        }

        function GetCompanyFailed(response) {

            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Company Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Company Database Module...


        // Save Company after Edit 

        $scope.saveCompany = function () {
            let getChainName = false;
            $scope.editCompany.IsActive = true;
                if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                    $scope.isCVRError = true;
                    $("#cvr").val('');
                }
                else {
                    if ($("#addToChain").is(':checked')) {
                        if (!$("#ChainId").val()) {
                            $scope.isChainError = true;

                        } else {
                            /* *** Verify Chain Name **** */
                            angular.forEach($scope.allChainNames, function (value) {
                                if (value.CompanyName == $scope.editCompany.ChainName) {
                                    getChainName = true;
                                }
                            });
                            if (!getChainName) {
                                //notificationService.displayError('Please select valid chain name.');
                                $scope.isChainError = true;
                            }else{
                                $scope.editCompany.ParentId = $("#ChainId").val();
                                saveCompanyEditData();
                            }
                        }
                    }
                    else {
                        $scope.editCompany.ParentId = 0
                        saveCompanyEditData();
                    }
                }

        }

        function saveCompanyEditData() {
            if ($scope.editCompany.CompanyCityName.indexOf("(") > 0)
            {
                $scope.editCompany.CompanyCityName = $scope.editCompany.CompanyCityName.substring(0, $scope.editCompany.CompanyCityName.indexOf("("));
            }
            
            $scope.editCompany.LastUpdatedBy = $cookies.get('userIdBFN');
            $scope.editCompany.LastUpdatedDate = BFNConstants.getDateTime();
            ApiService.post(BFNConstants.urls.saveCompany, $scope.editCompany, saveCompanySucceded, saveCompanyFailed);
        }

        function saveCompanySucceded(response) {
            $scope.editCompany = {};
            $scope.saveEditCompany();

        }

        function saveCompanyFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                //notificationService.displayError('Not able to save Chain Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of Save Company...


        $scope.$watch('editCompany.CompanyCVR', function (newValue, oldValue) {
            $scope.isCVRError = false;
            //it remove cvr default error if user going to change cvr.
        });

        /* *** Verify correct name entered Start*** */
        $scope.getAllChainsNames = function () {

            ApiService.get(BFNConstants.urls.getAllChainsNames, null, getAllChainsNamesSucceded, getAllChainsNamesFailed);
        };

        function getAllChainsNamesSucceded(response) {

            $scope.allChainNames = response.data;
        }
        function getAllChainsNamesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Verify correct name entered End*** */


    }

})(angular.module('Common.Core'));