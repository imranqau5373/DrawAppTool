(function (app) {
    'use strict';

    app.controller('ChainAddCtrl', ChainAddCtrl);

    ChainAddCtrl.$inject = ['$scope', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$cookies', '$stateParams', '$parse'];

    function ChainAddCtrl($scope, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $cookies, $stateParams, $parse) {
        //Public Data Members...

        $scope.newChain = {};
        $scope.chainAdmins = {};
        $scope.newChainUser = {};
        $scope.listAllChains = {};
        $scope.selected = undefined;
        $scope.isCVRError = false;
        $scope.userHeading = "Add Chain Admin";
        $scope.userEdit = "Edit Chain Admin";
        $scope.userView = "View Chain Admin";
        $scope.id = "";
        $scope.userRole = "ChainAdmin";


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

        // End of Members....


        // Add Chain Module ...

        $scope.addChain = function () {
            //before send to server make sure token expire date.
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                if ($scope.newChain.CompanyCityName.indexOf("(") > 0)
                {
                    $scope.newChain.CompanyCityName = $scope.newChain.CompanyCityName.substring(0, $scope.newChain.CompanyCityName.indexOf("("));
                }
                
                $scope.newChain.LastUpdatedDate = $scope.newChain.CreatedDate = BFNConstants.getDateTime();
                $scope.newChain.IsChain = true;
                $scope.newChain.ParentId = 0;
                $scope.newChain.IsActive = true;
                $scope.newChain.CreatedBy = $cookies.get('userIdBFN');
                $scope.newChain.LastUpdatedBy = $cookies.get('userIdBFN');
                ApiService.post(BFNConstants.urls.addChain, $scope.newChain, addChainSucceded, addChainFailed);
            }

        };

        function addChainSucceded(response) {
            //window.location.href = window.location.href + "/" + response.data.Id;
            $location.url('/Home/addChain/' + response.data.Id);
            notificationService.displaySuccess('New Chain Added Successfully.');
            $scope.addChain = {};
            angular.element('#admin-tab').css('pointer-events', 'fill');
            angular.element('#chain-info-tab').css('pointer-events', 'none');
            $timeout(function () {
                $("#admin-tab").click();
            }, 0);

        }

        function addChainFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
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

        $scope.verifyChainCVR = function () {
            if ($("#cvr").val() != null && $("#cvr").val() <= 0) {
                $scope.isCVRError = true;
                $("#cvr").val('');
            }
            else {
                $scope.newChain.CompanyName = $scope.newChain.CompanyAddress= $scope.newChain.CompanyPostCode = $scope.newChain.CompanyCityName = "";
                ApiService.post(BFNConstants.urls.verifyChainCVR, $scope.newChain, verifyChainCVRNumberSucceded, verifyChainCVRNumberFailed);
            }
            
        }

        function verifyChainCVRNumberSucceded(response) {
            if (response.data.Success) {
                $scope.cvrNumber = response.data.CVRNumber;
                notificationService.displaySuccess('Successfully Verified CVR Number.');
                $scope.isCVRError = false;
                $scope.newChain.CompanyName = response.data.Name;
                $scope.newChain.CompanyAddress = response.data.Address;
                $scope.newChain.CompanyPostCode = response.data.Zipcode;
                $scope.newChain.CompanyCityName = response.data.City;
                //if (response.data.Owners.length > 0) {
                //    $scope.newChain.CompanyCityName = response.data.Owners[0].Name;
                //}

            }
            else {

                $scope.isCVRError = true;
                }

        }

        function verifyChainCVRNumberFailed(response) {
            $scope.isCVRError = true;
        }

        $scope.$watch('viewUser.AssignCompanyId', function (newValue, oldValue) {
            $scope.isCVRError = false;
            //it remove cvr default error if user going to change cvr.
        });

        // End of Add Chain Module...



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




        // On load to check that if chain is already added to show the chain admin tab.

        if ($stateParams.id != null) {
            angular.element('#admin-tab').css('pointer-events', 'fill');
            angular.element('#chain-info-tab').css('pointer-events', 'none');
            $timeout(function () {
                $("#admin-tab").click();
            }, 0);
            $scope.id = $stateParams.id;
            $scope.getAllCityPostCodes();
            //$scope.getChain();

        }

        function checkTokenExpire(tokenExpire) {

        }







        //On Load end Functions ();

        $scope.btnSaveChain = function () {

            if ($stateParams.id != null) {
                $location.url('/Home/viewChain/' + $stateParams.id);
            } else {
                $location.url('/Home/chainIndex');
            }
        }

        // end of on load functions.


        //Start of Authorization module

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Chain/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            //window.location = "/";
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            setSideBarMenu();
            $scope.getAllCityPostCodes();
        }

        function AuthorizationResultFailed(response) {
            if (response.status == '400')
                console.log(response.data);
            else
                console.log(response.statusText);
            $location.url('/');
        }


        //End of Authorization Module...

    }

})(angular.module('Common.Core'));