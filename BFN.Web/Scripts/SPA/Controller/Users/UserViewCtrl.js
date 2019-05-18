

(function (app) {
    'use strict';

    app.controller('UserViewCtrl', UserViewCtrl);

    UserViewCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function UserViewCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.userId = $stateParams.UserId;
        $scope.viewUser = {};
        $scope.assignedUser = {};
        $scope.assignId = "";
        $scope.companyUser = {};
        $scope.shopUser = {};
        $scope.userHeading = "";
        $scope.shopCompName = {};
        $scope.isValidName = false;
        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/User/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
        }
        else {
            window.location = "/"
        }

        function AuthorizationResultSucceded(response) {
            $scope.getUser();
            setSideBarMenu();
            getAssignUserName()
        }

        function RequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#userLink').addClass('active');
        }

        //End of Authorization ...

        //Get User to view it...

        $scope.getUser = function () {
            
            ApiService.get(BFNConstants.urls.getUser + "?Id=" + $scope.userId, null, GetUserSucceded, RequestFailed);
        };

        function GetUserSucceded(response) {
            $scope.viewUser = response.data;
            $scope.getAssignedUsers();
            if ($scope.viewUser.RoleName == "ShopAdmin") {
                $scope.userHeading = "Shop";
                $scope.assignId = "BFN: "
            }
            else {
                if ($scope.viewUser.RoleName == "CompanyAdmin") {
                    $scope.userHeading = "Company";
                }
                else {
                    $scope.userHeading = "Chain";
                }
                $scope.assignId = "CVR: "
            }
            if ($scope.viewUser.IsActive) {
                $scope.ActivateUser = false;
                $scope.DeactivateUser= true;
            }
            else {
                $scope.ActivateUser = true;
                $scope.DeactivateUser = false;
            }

        }

        // .. end of Get User

        // Active/ Deactive User functionality start...\


        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }

        $scope.deactiveUserConfirm = function () {
            $scope.deActiveMessage = "";
            $scope.deActiveMessage = "All the assigned to user will be deactivated as well. Do you want to proceed?";
            $scope.deActiveExp = "deleteUser('" + $scope.userId + "')";
        }

        $scope.activeUserConfirm = function () {
            $scope.activeMessage = "";
            $scope.activeMessage = "All the assigned to user will be restored in previous positions. Do you want to proceed?";
            $scope.activeExp = "activateUser('" + $scope.userId + "')";
        }


        // End of Active/Deactive User Functionality End...

        // Start to delete/Restore User 
        $scope.deleteUser = function (id) {
            ApiService.get(BFNConstants.urls.deleteChainAdmin + "?Id=" + id, null, userCallSucceeded, RequestFailed);
        }

        $scope.activateUser = function (id) {
            ApiService.get(BFNConstants.urls.activateChainAdmin + "?Id=" + id, null, userCallSucceeded, RequestFailed);
        }

        function userCallSucceeded(response) {
            $scope.getUser();
        }

        // End of delete/Restore User

        // start to get Assigned User 

        $scope.getAssignedUsers = function () {
            closeDropDown();
            $scope.viewUser.AssignCompanyId = "";
            let qs = $httpParamSerializer($scope.pagingInfo);
            ApiService.get(BFNConstants.urls.getAssignedUser + "?Id=" + $scope.userId + "&roleName=" + $scope.viewUser.RoleName +"&"+ qs, null, getAssignedUserSucceeded, RequestFailed);
        }

        function getAssignedUserSucceeded(response) {
            $scope.assignedUser = response.data.AssignedUsers;
            $scope.pagingInfo.totalItems = response.data.TotalUserRecords;
            $scope.pagingInfo.startUserPageRecordNumber = response.data.StartUserPageNumber + 1;
            $scope.pagingInfo.endPageUserRecordNumber = response.data.EndUserPageNumber;
        }

        // End to Assigned User Functionality..

        /* *** Start Paging Sorting and Filtering *** */
        $scope.SearchModel = {
            searchAssignId: "",
            searchAssignName: "",
            searchAssignAddress: "",
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
                    $scope.pagingInfo.filterList["AssignedId"] = $scope.SearchModel.searchAssignId;
                    if ($scope.filterApplied.indexOf("AssignedId") === -1) {
                        $scope.filterApplied.push("AssignedId");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["Name"] = $scope.SearchModel.searchAssignName;
                    if ($scope.filterApplied.indexOf("Name") === -1) {
                        $scope.filterApplied.push("Name");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["Address"] = $scope.SearchModel.searchAssignAddress;
                    if ($scope.filterApplied.indexOf("Address") === -1) {
                        $scope.filterApplied.push("Address");
                    }
                    break;
            }

            $scope.getAssignedUsers();
        };

        $scope.sort = function (sortBy, reverse) {
            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAssignedUsers();

        };

        $scope.selectUserPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAssignedUsers();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchAssignId = "";
                        $scope.pagingInfo.filterList["AssignedId"] = "";
                        var index = $scope.filterApplied.indexOf("AssignedId");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAssignedUsers();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchAssignName = "";
                        $scope.pagingInfo.filterList["Name"] = "";
                        var index = $scope.filterApplied.indexOf("Name");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAssignedUsers();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchAssignAddress = "";
                        $scope.pagingInfo.filterList["Address"] = "";
                        var index = $scope.filterApplied.indexOf("Address");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAssignedUsers();
                    }
                    break;
            }

        };

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }
        

        /* *** End *** */

        // Assign and Unassigned User Functionality...

        $scope.removeAutoCss = function () {
            $('.easy-autocomplete').css("width", "");
            $('#ChainName').val('');
        }

        $scope.assignUser = function () {
            debugger;
            let shopCompName = $('#ChainName').val();

            if (checkCompanyNameExist(shopCompName)) {
                $("#assignUser").modal('hide');
                if ($scope.viewUser.RoleName == "ShopAdmin") {
                    $scope.shopUser = {};
                    $scope.shopUser.ShopId = $scope.viewUser.AssignCompanyId;
                    $scope.shopUser.UserId = $scope.userId;
                    ApiService.post(BFNConstants.urls.setShopUser, $scope.shopUser, $scope.getAssignedUsers, RequestFailed);
                }
                else {
                    $scope.companyUser = {};
                    $scope.companyUser.CompanyId = $scope.viewUser.AssignCompanyId;
                    $scope.companyUser.UserId = $scope.userId;
                    ApiService.post(BFNConstants.urls.setCompanyUser, $scope.companyUser, $scope.getAssignedUsers, RequestFailed);
                }
            }
            else
            {
                $scope.isValidName = true;
            }


        }

        $scope.removeUser = function (id) {
            ApiService.get(BFNConstants.urls.removeAssignedUser + "?id=" + id, null, $scope.getAssignedUsers, RequestFailed);
        }

        function checkCompanyNameExist(shopCompName) {
            let isName = false;
            angular.forEach($scope.shopCompName, function (value) {
                if (value.Name == shopCompName) {
                    isName = true;
                }
            });
            return isName;
        }

        // End of Assigned and Unassigned user Functionality...

        function getAssignUserName() {
            ApiService.get(BFNConstants.urls.getNamesForAssign + "?id=" + $stateParams.UserId, null, getAssignNameSucceed, RequestFailed)
        }
        function getAssignNameSucceed(response) {
            $scope.shopCompName = response.data;

        }

        $scope.$watch('viewUser.AssignCompanyId', function (newValue, oldValue) {
            $scope.isValidName = false;
        });
    }

})(angular.module('Common.Core'));