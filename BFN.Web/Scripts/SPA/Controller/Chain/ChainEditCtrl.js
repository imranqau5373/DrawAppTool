(function (app) {
    'use strict';

    app.controller('ChainEditCtrl', ChainEditCtrl);

    ChainEditCtrl.$inject = ['$scope', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$cookies', '$stateParams', '$parse'];

    function ChainEditCtrl($scope, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $cookies, $stateParams,$parse) {
        $scope.editChain = {};
        $scope.id = $stateParams.id;
        $scope.companyId = $stateParams.companyId;
        $scope.chainId = $stateParams.chainId;
        $scope.userHeading = "Add Chain Admin";
        $scope.userEdit = "Edit Chain Admin";
        $scope.userView = "View Chain Admin";

        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#chainLink').addClass('active');
        }

        // Start of Authorization Module ...


        if ($cookies.get('token') != null) {
            ApiService.get('/api/Chain/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            $scope.getAllCityPostCodes();
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

        //End of Authorization Module

        // Start to get Chain Module...

        $scope.getChain = function () {
            if ($scope.companyId != null) {
                ApiService.get(BFNConstants.urls.getChain + "?id=" + $scope.companyId, null, GetChainSucceded, GetChainFailed);
            }
            else {
                ApiService.get(BFNConstants.urls.getChain + "?id=" + $scope.id, null, GetChainSucceded, GetChainFailed);
            }
            

        };

        function GetChainSucceded(response) {
            $scope.editChain = response.data;
            $scope.editChain.CompanyCVR = parseFloat($scope.editChain.CompanyCVR, 10);
            $scope.cvrNumber = $scope.editChain.CompanyCVR;
            $scope.editChain.CompanyBankAccountNo = parseFloat($scope.editChain.CompanyBankAccountNo, 10);
            $scope.CompanyUsers = response.data.Users;
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

        //End of Chain Module...

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

        //Start to Verfiy cvr

        $scope.verifyChainCVR = function () {
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                ApiService.post(BFNConstants.urls.verifyChainCVR, $scope.editChain, verifyChainCVRNumberSucceded, verifyChainCVRNumberFailed);
            }
        }

        function verifyChainCVRNumberSucceded(response) {
            if (response.data.Success) {
                $scope.cvrNumber = response.data.CVRNumber;
                notificationService.displaySuccess('Successfully Verified CVR Number.');
                $scope.isCVRError = false;
            }
            else {

                $scope.isCVRError = true;
            }
        }

        function verifyChainCVRNumberFailed(response) {
            $scope.isCVRError = true;
        }

        $scope.$watch('editChain.CompanyCVR', function (newValue, oldValue) {
            $scope.isCVRError = false;
            //it remove cvr default error if user going to change cvr.
        });

        //End of Verify CVR

        //Start of Save Chain

        $scope.saveChain = function () {
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                if ($scope.editChain.CompanyCityName.indexOf("(") > 0)
                {
                    $scope.editChain.CompanyCityName = $scope.editChain.CompanyCityName.substring(0, $scope.editChain.CompanyCityName.indexOf("("));
                }
                
                $scope.editChain.LastUpdatedBy = $cookies.get('userIdBFN');
                $scope.editChain.LastUpdatedDate = BFNConstants.getDateTime();
                ApiService.post(BFNConstants.urls.saveChain, $scope.editChain, SaveChainSucceded, SaveChainFailed);
            }
            

        };

        function SaveChainSucceded(response) {
            //window.location.href = "Home/viewChain/" + $stateParams.id;
            $location.url('/Home/viewChain/' + $stateParams.id);
        }

        function SaveChainFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                //notificationService.displayError('Not able to save Chain Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Save Chain...












    }

})(angular.module('Common.Core'));