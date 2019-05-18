

(function (app) {
    'use strict';

    app.controller('UserAddCtrl', UserAddCtrl);

    UserAddCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function UserAddCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        /* *** End *** */
        $scope.newAdmin = {};
        $scope.userHeading = "";
        //Authoriaztion Start

        $scope.userId = $stateParams.UserId;
        setSideBarMenu();
        if ($cookies.get('token') != null) {
            ApiService.get('/api/User/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
        }
        else {
            window.location = "/"
        }

        function AuthorizationResultSucceded(response) {
            if ($scope.userId != undefined) {
                $scope.getUser();
                $scope.userHeading = "Edit User";
            } else {
                $scope.userHeading = "Add User";
            }
            $scope.getAllCityPostCodes();

        }

        function RequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
                notificationService.displayError(response.data.Message);
            }
            else
                notificationService.displayError(response.data.Message);
        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#userLink').addClass('active');
        }


        //End of Authorization ...

        //... Start to Add User Admin 

        $scope.saveUser = function () {
            if ($scope.userId != undefined) {
                $scope.saveUserAdmin();

            } else {
                $scope.addUserAdmin();
            }
        }

        $scope.addUserAdmin = function () {
            $scope.newAdmin.LastUpdatedDate = $scope.newAdmin.CreatedDate = BFNConstants.getDateTime();
            $scope.newAdmin.IsActive = true;
            $scope.newAdmin.CreatedBy = $cookies.get('userIdBFN');
            $scope.newAdmin.LastUpdatedBy = $cookies.get('userIdBFN');
            $scope.newAdmin.Password = BFNConstants.randomText();
            $scope.newAdmin.ConfirmPassword = $scope.newAdmin.Password;
            ApiService.post(BFNConstants.urls.addChainAdmin, $scope.newAdmin, addChainAdminSucceded, RequestFailed);
        }

        function addChainAdminSucceded(response) {
            $scope.adduser = {};
            if ($scope.userId) {
                window.location.href = "/Home/viewUser/" + $scope.userId;
            }
            else {
                window.location.href = "/Home/viewUser/" + response.data.Id;
            }
            
        }

        // End to Add User Admin...

        //Start to get User Admin

        $scope.getUser = function () {
            ApiService.get(BFNConstants.urls.getUser + "?Id=" + $scope.userId, null, GetUserSucceded, RequestFailed);
        };

        function GetUserSucceded(response) {
            $scope.newAdmin = response.data;

        }

        //End to Get User Admin

        //Start to update User Admin After Edit

        $scope.saveUserAdmin = function () {
            $scope.newAdmin.userName = $scope.newAdmin.Email;
            $scope.newAdmin.LastUpdatedDate = BFNConstants.getDateTime();
            $scope.newAdmin.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.updateChainAdmin, $scope.newAdmin, saveUserAdminSucceded, RequestFailed);
        }

        function saveUserAdminSucceded(response) {
   
            $scope.newAdmin = {};
            window.location.href = "/Home/viewUser/" + $scope.userId;

        }

        //End to update User Admin..

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



    }

})(angular.module('Common.Core'));