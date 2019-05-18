

(function (app) {
    'use strict';

    app.controller('CompanyCtrl', CompanyCtrl);

    CompanyCtrl.$inject = ['$scope', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$cookies', '$stateParams', '$parse'];

    function CompanyCtrl($scope, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $cookies, $stateParams, $parse) {
        $scope.newCompany = {};
        $scope.cvrNumber = "";
        $scope.isChainError = false;
        $scope.userHeading = "Add Company Admin";
        $scope.userEdit = "Edit Company Admin";
        $scope.userView = "View Company Admin";
        $scope.userRole = "CompanyAdmin";
        $scope.allChainNames = {};


        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#companyLink').addClass('active');
        }

        //Save Company Button

        $scope.saveCompanyBtn = function () {
            if ($stateParams.ChainId != null) {
                //window.location.href = "Home/viewChain/" + $stateParams.ChainId;
                $location.url('/Home/viewChain/' + $stateParams.ChainId);

            } else {
                $location.url('/Home/CompanyIndex/');
                //window.location.href = "Home/CompanyIndex";
            }
        }

        //End of save button.

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


        // Authorization Module start from this ...
        if ($cookies.get('token') != null) {
            ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }
     

        function AuthorizationResultSucceded(response) {
            setSideBarMenu();
            $scope.getAllChainsNames();
            $scope.getAllCityPostCodes();
        }

        function AuthorizationResultFailed(response) {
            if (response.status == '400') 
                console.log(response.data);
            else
                console.log(response.statusText);
            $location.url('/');

        }

        //End of authorization Module

        //Start Add Company Module

        $scope.addCompany = function () {
            debugger;
            let getChainName = false;
                $scope.isChainError = false;
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
                                if (value.CompanyName == $scope.newCompany.ChainName) {
                                    getChainName = true;
                                }
                            });
                            if (!getChainName) {
                                $scope.isChainError = true;
                            }
                            else{
                                //Save data with chain as parent.
                                $scope.newCompany.ParentId = $("#ChainId").val();
                                saveCompanyData();
                            }

                        }
                    }
                    else {
                        //save data without chain.
                        $scope.newCompany.ParentId = 0;
                        saveCompanyData();
                    }
                }

        };

        function saveCompanyData() {
            //before send to server make sure token expire date.
            if ($scope.newCompany.CompanyCityName.indexOf("(") > 0)
            {
                $scope.newCompany.CompanyCityName = $scope.newCompany.CompanyCityName.substring(0, $scope.newCompany.CompanyCityName.indexOf("("));
            }
            
            $scope.newCompany.IsChain = false;
            $scope.newCompany.LastUpdatedDate = $scope.newCompany.CreatedDate = BFNConstants.getDateTime();
            $scope.newCompany.IsActive = true;
            $scope.newCompany.CreatedBy = $cookies.get('userIdBFN');
            $scope.newCompany.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.addChain, $scope.newCompany, addCompanySucceded, addCompanyFailed);
        }

        function addCompanySucceded(response) {
            notificationService.displaySuccess('New Company Created Successfully.');
            $scope.newCompany = {};
            angular.element('#company-admin-tab').css('pointer-events', 'fill');
            angular.element('#company-info-tab').css('pointer-events', 'none');
            $timeout(function () {
                $("#company-admin-tab").click();
            }, 0);
            //window.location.href = window.location.href + "/" + response.data.Id;
            $location.url('/Home/company/' + response.data.Id);

        }

        function addCompanyFailed(response) {
            console.log(response);
            if (response.status == '400') {
                if (response.data.Message == 'CVR Number is not Valid.')
                    $scope.isCVRError = true;
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Add Company module

        //Star tof Get All Companies

        $scope.getAllCompanies = function () {
            ApiService.get(BFNConstants.urls.getAllCompanies, null, addCompanySucceded, addCompanyFailed);

        };

        function GetAllCompanySucceded(response) {
            $scope.newCompany = {};
        }

        function GetAllCompanyFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not Get All Company Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Get All Companies

        // Star of Verify CVR Number Module

        $scope.verifyCVR = function () {
            debugger;
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                ApiService.post(BFNConstants.urls.verifyCVR, $scope.newCompany, verifyCVRNumberSucceded, verifyCVRNumberFailed);
            }
        }

        function verifyCVRNumberSucceded(response) {
            if (response.data.Success) {
                $scope.cvrNumber = response.data.CVRNumber;
                notificationService.displaySuccess('Successfully Verified CVR Number.');
                $scope.isCVRError = false;
                $scope.newCompany.CompanyName = response.data.Name;
                $scope.newCompany.CompanyAddress = response.data.Address;
                $scope.newCompany.CompanyPostCode = response.data.Zipcode;
                $scope.newCompany.CompanyCityName = response.data.City;
            }
            else {

                $scope.isCVRError = true;
            }
        }

        function verifyCVRNumberFailed(response) {
            notificationService.displayError('Failed to verify CVR number.');
        }

        $scope.$watch('newCompany.CompanyCVR', function (newValue, oldValue) {
            $scope.isCVRError = false;
            //it remove cvr default error if user going to change cvr.
        });

        //End of CVR module...


        $scope.getChainCompany = function () {
            ApiService.get(BFNConstants.urls.getChain + "?id=" + $stateParams.ChainId, null, getCompanyUsersSucceded, getCompanyUsersFailed);

        };

        function getCompanyUsersSucceded(response) {

            if ($stateParams.ChainId) {
                $scope.newCompany.ParentId = response.data.Id;
                $scope.newCompany.ChainName = response.data.CompanyName;
                $scope.newCompany.CompanyCVR = response.data.CompanyCVR;
                $scope.newCompany.ParentChain = true;
            }
            $scope.CompanyUsers = response.data.Users;
        }

        function getCompanyUsersFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // On Load Functions...

        if ($stateParams.CompanyId != null) {
            angular.element('#company-admin-tab').css('pointer-events', 'fill');
            angular.element('#company-info-tab').css('pointer-events', 'none');
            $timeout(function () {
                $("#company-admin-tab").click();
            }, 0);
            //$scope.getCompany();

        }
        else if ($stateParams.ChainId != null) {
            $scope.getChainCompany();
        }
        
        //End of On load functions

        $scope.btnSaveCompany= function () {
            if ($stateParams.CompanyId != null) {
                //window.location.href = "/Home/viewCompany/" + $stateParams.CompanyId;
                $location.url('/Home/viewCompany/' + $stateParams.CompanyId);
            } else {
                //window.location.href = "/Home/CompanyIndex";
                $location.url('/Home/CompanyIndex/');
            }
        }

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