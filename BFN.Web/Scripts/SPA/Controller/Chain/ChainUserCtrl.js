(function (app) {
    'use strict';

    app.controller('ChainUserCtrl', ChainUserCtrl);

    ChainUserCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function ChainUserCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {


        $scope.newAdmin = {};
        $scope.userExperties;
        $scope.chainUserGrid = true;
        $scope.newShopUser = {};
        $scope.addUserMode = true;
        $scope.searchedUser = false;
        $scope.btnAddUser = "Save";
        $scope.isCompany = false;
        $scope.isChain = false;
        $scope.searchBtnClicked = false;



        /* *** Start Paging Sorting and Filtering *** */
        $scope.SearchModel = {
            searchName: "",
            searchUserAddress: "",
            serachUserPhoneNo: "",
            serachUserEmail: "",
            serachUserExp: "",
            serachUserRole:""
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
                    $scope.pagingInfo.filterList["Name"] = $scope.SearchModel.searchName;
                    if ($scope.filterApplied.indexOf("Name") === -1) {
                        $scope.filterApplied.push("Name");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["Address"] = $scope.SearchModel.searchUserAddress;
                    if ($scope.filterApplied.indexOf("Address") === -1) {
                        $scope.filterApplied.push("Address");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["PhoneNumber"] = $scope.SearchModel.serachUserPhoneNo;
                    if ($scope.filterApplied.indexOf("PhoneNumber") === -1) {
                        $scope.filterApplied.push("PhoneNumber");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["Email"] = $scope.SearchModel.serachUserEmail;
                    if ($scope.filterApplied.indexOf("Email") === -1) {
                        $scope.filterApplied.push("Email");
                    }
                    break;
                case 5:
                    $scope.pagingInfo.filterList["ExpertyTitle"] = $scope.SearchModel.serachUserExp;
                    if ($scope.filterApplied.indexOf("ExpertyTitle") === -1) {
                        $scope.filterApplied.push("ExpertyTitle");
                    }
                    break;
                case 6:
                    $scope.pagingInfo.filterList["RoleName"] = $scope.SearchModel.serachUserRole;
                    if ($scope.filterApplied.indexOf("RoleName") === -1) {
                        $scope.filterApplied.push("RoleName");
                    }
                    break;
            }

            $scope.getAllChainUsers();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllChainUsers();

        };

        $scope.selectUserPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllChainUsers();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchName = "";
                        $scope.pagingInfo.filterList["Name"] = "";
                        var index = $scope.filterApplied.indexOf("Name");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchUserAddress = "";
                        $scope.pagingInfo.filterList["Address"] = "";
                        var index = $scope.filterApplied.indexOf("Address");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.serachUserPhoneNo = "";
                        $scope.pagingInfo.filterList["PhoneNumber"] = "";
                        var index = $scope.filterApplied.indexOf("PhoneNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.serachUserEmail = "";
                        $scope.pagingInfo.filterList["Email"] = "";
                        var index = $scope.filterApplied.indexOf("Email");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
                case 5:
                    {
                        $scope.SearchModel.serachUserExp = "";
                        $scope.pagingInfo.filterList["ExpertyTitle"] = "";
                        var index = $scope.filterApplied.indexOf("ExpertyTitle");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
                case 6:
                    {
                        $scope.SearchModel.serachUserRole = "";
                        $scope.pagingInfo.filterList["RoleName"] = "";
                        var index = $scope.filterApplied.indexOf("RoleName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllChainUsers();
                    }
                    break;
            }

        };

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('.sidebar-nav .nav li a').each(function () {
                if (this.href == url) {
                    $(this).parent().addClass('active');
                }
            });
        }

        /* *** End *** */


        $scope.deactiveMethod = function (exp) {
            $parse(exp)($scope);
        }

        $scope.activeMethod = function (exp) {
            $parse(exp)($scope);

        }




        //Start When Chain user Addedd to update view of Chain call this below method

        $scope.getAllChainUsers = function () {
            if ($scope.id != undefined) {
                //get list of shop admins for shop view page and company list and chain list...
                let qs = $httpParamSerializer($scope.pagingInfo);
                if ($scope.isShop == undefined) {
                    $scope.isShop = false;
                }
                ApiService.get(BFNConstants.urls.getAllChainUsers + "?id=" + $scope.id + "&isShop=" + $scope.isShop + "&" + qs, null, getAllCallSucceded, getAllCallFailed);
            }
            else if ($scope.isShop) {
                //get list of shop admins at the time of add shop...
                if ($scope.nextShop.Id) {
                    let qs = $httpParamSerializer($scope.pagingInfo);
                    ApiService.get(BFNConstants.urls.getAllChainUsers + "?id=" + $scope.nextShop.Id + "&isShop=" + $scope.isShop + "&" + qs, null, getAllCallSucceded, getAllCallFailed);
                }
                else {
                    $scope.pagingInfo.UsertotalItems = 0;
                }
            }
            else {
                // for company and chain.
                $scope.pagingInfo.itemsPerPage = BFNConstants.listingPaging;
                let qs = $httpParamSerializer($scope.pagingInfo);
                ApiService.get(BFNConstants.urls.getAllUsers + "?" + qs, null, getAllCallSucceded, getAllCallFailed);
            }
            
        }

        function getAllCallSucceded(response) {
            $scope.Users = response.data.Users;
            $scope.pagingInfo.UsertotalItems = response.data.TotalUserRecords;
            $scope.pagingInfo.startUserPageRecordNumber = response.data.StartUserPageNumber + 1;
            $scope.pagingInfo.endPageUserRecordNumber = response.data.EndUserPageNumber;
            closeDropDown();
        }

        function getAllCallFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of all Chain users...

        //Chain Admin Module Add, Edit and Delete

        //STart Add New Chain Admin

        $scope.addChainAdmin = function () {
            if ($scope.newAdmin.Id) {
                if ($scope.isShop) {
                    if ($scope.id) {
                        $scope.newShopUser.ShopId = $scope.id;
                    }
                    else {
                        $scope.newShopUser.ShopId = $scope.nextShop.Id;
                    }
                    $scope.newShopUser.UserId = $scope.newAdmin.Id;
                    ApiService.post(BFNConstants.urls.addShopUser, $scope.newShopUser, addShopUserSucceded, addShopUserFailed);
                } else {
                    $scope.newChainUser.UserId = $scope.newAdmin.Id;
                    $scope.addChainUser()

                }
            }
            else {

                $scope.newAdmin.LastUpdatedDate = $scope.newAdmin.CreatedDate = BFNConstants.getDateTime();
                $scope.newAdmin.IsActive = true;
                $scope.newAdmin.CreatedBy = $cookies.get('userIdBFN');
                $scope.newAdmin.LastUpdatedBy = $cookies.get('userIdBFN');
                $scope.newAdmin.Password = BFNConstants.randomText();
                $scope.newAdmin.ConfirmPassword = $scope.newAdmin.Password;
                $scope.newAdmin.RoleName = $scope.userRole;
                ApiService.post(BFNConstants.urls.addChainAdmin, $scope.newAdmin, addChainAdminSucceded, addChainAdminFailed);

            }
        }

        function addChainAdminSucceded(response) {
            $scope.newAdmin = {};
            // in case of shop view or add shop wizard.
            if ($scope.isShop) {
                if ($scope.id) {
                    $scope.newShopUser.ShopId = $scope.id;
                }
                else {
                    $scope.newShopUser.ShopId = $scope.nextShop.Id;
                }
                $scope.newShopUser.UserId = response.data.Id;
                ApiService.post(BFNConstants.urls.addShopUser, $scope.newShopUser, addShopUserSucceded, addShopUserFailed);
            }
            else {
                $scope.newChainUser.UserId = response.data.Id;
                $scope.addChainUser();
            }
          
        }

        function addChainAdminFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of Add Chain Admin

        // Start of Shop Admin

        $scope.addShopUser = function () {


        }

        function addShopUserSucceded(response) {
            $scope.newShopUser = {};
            $scope.getAllChainUsers();
            $("#addChainAdmin").modal('hide');
            $('.modal-backdrop').remove();
            $scope.searchedUser = false;

        }

        function addShopUserFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.getShopAdmins = function () {
            ApiService.get(BFNConstants.urls.getShop + "?id=" + $scope.nextShop.Id, null, getShopAdminsSucceded, getShopAdminsFailed);

        };

        function getShopAdminsSucceded(response) {
            $scope.ShopUsers = response.data.ShopUsers;

        }

        function getShopAdminsFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Shop Admin

        // Start Search User Via Email

        $scope.searchUserEmail = function (email) {

            $scope.searchBtnClicked = true;
            searchUserEmailRecord(email);


        }

        $scope.onBlurSearchUserEmail = function (email) {

            if ($scope.searchBtnClicked) {
                $scope.searchBtnClicked = false;
            } else {
                searchUserEmailRecord(email)
            }
        }

        function searchUserEmailRecord(email) {
            if (email) {
                if ($scope.isShop) {
                    // in case of shop view
                    ApiService.get(BFNConstants.urls.getShopAdminByEmail + "?email=" + email, null, serachContactEmailSucceed, requestFailed);
                } else if ($scope.isCompany) {
                    ApiService.get(BFNConstants.urls.getCompanyAdminByEmail + "?email=" + email + "&IsChain=" + false, null, serachContactEmailSucceed, requestFailed);
                } else {
                    ApiService.get(BFNConstants.urls.getCompanyAdminByEmail + "?email=" + email + "&IsChain=" + true, null, serachContactEmailSucceed, requestFailed);
                }
            }
        }


        function serachContactEmailSucceed(response) {
            $scope.newAdmin = {};
            $scope.newAdmin = response.data.user;
            if ($scope.newAdmin != null) {
                if (response.data.user.PhoneNumber > 0) {
                    $scope.newAdmin.PhoneNumber = parseFloat(response.data.user.PhoneNumber);
                }
                setUserHeading();

            }
            else {
                $scope.newAdmin = {};
                // in new new admin is null from response. so we cannot assign email field into it.
                $scope.newAdmin.Email = response.data.Email;
                setDefaultHeading();
                notificationService.displayError("No record found against this email");
            }

        }

        function serachOnBlurContactEmailSucceed(response) {
            $scope.newAdmin = {};
            $scope.newAdmin = response.data.user;
            if ($scope.newAdmin != null) {
                if (response.data.user.PhoneNumber > 0) {
                    $scope.newAdmin.PhoneNumber = parseFloat(response.data.user.PhoneNumber);
                }
                setUserHeading();
            }
            else {
                // in new new admin is null from response. so we cannot assign email field into it.
                $scope.newAdmin = {};
                $scope.newAdmin.Email = response.data.Email;
                setDefaultHeading();
            }

        }

        function validateEmailAddress(email){

        }

        //End of Search User Via Email

        // Start of Add Chain User in Company User Table it is called after AddChain Admin.

        $scope.addChainUser = function () {

            $scope.newChainUser.CompanyId = $scope.id;
            if ($scope.isCompany) {
                $scope.newChainUser.IsChain = false;
            }
            else {
                $scope.newChainUser.IsChain = true;
            }
            ApiService.post(BFNConstants.urls.addChainUser, $scope.newChainUser, addChainUserSucceded, addChainUserFailed);
        }

        function addChainUserSucceded(response) {
            $scope.newChainUser = {};
            $scope.getAllChainUsers();
            $("#addChainAdmin").modal('hide');
            $('.modal-backdrop').remove();

        }

        function addChainUserFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End of Add Chain users of Company User Table...


        //Start to view Chain Admin

        $scope.viewChainAdmin = function (id) {
            ApiService.get(BFNConstants.urls.getChainAdmin + "?Id=" + id, null, viewChainAdminSucceded, viewChainAdminFailed);
        }

        function viewChainAdminSucceded(response) {
            $scope.viewAdmin = {};
            $scope.viewAdmin = response.data;
            if (response.data.PhoneNumber > 0) {
                $scope.viewAdmin.PhoneNumber = parseFloat(response.data.PhoneNumber);
            }
            $timeout(function () {
                $("#view-admin").click();
            }, 0);


        }

        function viewChainAdminFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End to view Chain Admin...

        // Start to view Chain Admin in Edit form...

        $scope.editChainAdmin = function (id) {
            $scope.getAllPostCodeEditUser();
            ApiService.get(BFNConstants.urls.getChainAdmin + "?Id=" + id, null, editChainAdminSucceded, editChainAdminFailed);
        }

        function editChainAdminSucceded(response) {
            $scope.editAdmin = {};
            $scope.editAdmin = response.data;
            if (response.data.PhoneNumber > 0) {
                $scope.editAdmin.PhoneNumber = parseInt(response.data.PhoneNumber);
            }
            angular.forEach($scope.userExperties, function (value) {
                if (value.id == $scope.editAdmin.ExpertiseId) {
                    $scope.editAdmin.selectedOption = value;
                }
            });
            $timeout(function () {
                $("#edit-admin").click();
            }, 0);
        }

        function editChainAdminFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // End to view Chain Admin user..

        // After Edit view call this update chain admin user...

        $scope.saveChainAdmin = function () {
            $scope.editAdmin.LastUpdatedDate = BFNConstants.getDateTime();
            $scope.editAdmin.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.updateChainAdmin, $scope.editAdmin, saveChainAdminSucceded, saveChainAdminFailed);
        }

        function saveChainAdminSucceded(response) {
            $scope.editAdmin = {};
            $("#editChainAdmin").modal('hide');
            $('.modal-backdrop').remove();
            $scope.getAllChainUsers();
        }

        function saveChainAdminFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        // end of saving chain module after editing...

        // start of delete/Activate Chain Admin Module...

        $scope.deleteUserConfirmation = function (id) {
            $scope.deActiveMessage = "";
            if ($scope.isShop) {
                $scope.deActiveMessage = "You want to Deactivate Shop Admin. Do you want to proceed?";
            }
            else {
                $scope.deActiveMessage = "You want to Deactivate Chain Admin. Do you want to proceed?";
            }
            
            $scope.deActiveExp = "deleteChainUser('" + id + "')";

        }

        $scope.activateUserConfirmation = function (id) {
            $scope.activeMessage = "";
            if ($scope.isShop) {
                $scope.activeMessage = "You want to Activate Shop Admin. Do you want to proceed?";
            }
            else {
                $scope.activeMessage = "You want to Activate Chain Admin. Do you want to proceed?";
            }
            $scope.activeExp = "activateChainUser('" + id + "')";
        }


        $scope.deleteChainUser = function (id) {
            ApiService.get(BFNConstants.urls.deleteChainAdmin + "?id=" + id, null, delActChainUsersSucceded, delActChainUsersFailed);
        }

        $scope.activateChainUser = function (id) {
            ApiService.get(BFNConstants.urls.activateChainAdmin + "?id=" + id, null, delActChainUsersSucceded, delActChainUsersFailed);
        }

        function delActChainUsersSucceded(response) {
            $scope.getAllChainUsers();
        }

        function delActChainUsersFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // end of delete/Activate chain users

        //end of chain Admin Module



        //Request Failed Function

        function requestFailed(response) {

            let email = $scope.newAdmin.Email;
            setDefaultHeading();
            $scope.newShopUser = {};
            $scope.newAdmin = {};
            $scope.newAdmin.Email = email;
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
            }
            else
                console.log(response.statusText);
        }

        function requestBlurFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
                notificationService.displayError(response.data.Message);
            }
            else
                console.log(response.statusText);
        }

        // end of Request function failed

        //Start to open/Close Dialog

        $scope.closeUserDialog = function () {
            $scope.newAdmin = {};
            $scope.searchedUser = false;
        }

        $scope.clickAddUserDialog = function () {
            $scope.btnAddUser = "Save";
            $scope.newAdmin = {};
            setDefaultHeading();
            if ($scope.isShop) {
                //in case of shop view or add shop
                $scope.userHeading = "Add Shop Admin";
            } else if($scope.isCompany) {
                $scope.userHeading = "Add Company Admin";
            } else {
                $scope.userHeading = "Add Chain Admin";
                }

        }

        function setUserHeading() {
            $scope.btnAddUser = "Assign";
            $scope.searchedUser = true;
            if($scope.isShop){
                $scope.userHeading = "Assign Shop Admin";
            }
            else if ($scope.isCompany) {
                $scope.userHeading = "Assign Company Admin";
            } else {
                $scope.userHeading = "Assign Chain Admin";
            }
        }

        function setDefaultHeading() {

            $scope.btnAddUser = "Save";
            $scope.searchedUser = false;
            if ($scope.isShop) {
                $scope.userHeading = "Add Shop Admin";
            }
            else if ($scope.isCompany) {
                $scope.userHeading = "Add Company Admin";
            } else {
                $scope.userHeading = "Add Chain Admin";
            }
        }

        //End of Dialog...

        // load city and postal code start

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
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#addUser-postal").getSelectedItemData().CityName;
                        $("#addUser-city").val(value).trigger("change");
                    }
                }
            };
            $("#addUser-postal").easyAutocomplete(options);
            var options2 = {
                data: response.data,
                getValue: "CityName",
                list: {
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#addUser-city").getSelectedItemData().PostNumber;
                        $("#addUser-postal").val(value).trigger("change");
                    }
                }
            };
            $("#addUser-city").easyAutocomplete(options2);
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

        $scope.getAllPostCodeEditUser = function () {
            let apiUrl = "api/CityPostCode/getAllCityPostCodes";
            ApiService.get(apiUrl, null, getAllPostEditUserSucceded, getAllCityPostCodesFailed);
        };

        function getAllPostEditUserSucceded(response) {
            $scope.allCityPostCodes = response.data;
            var options = {
                data: response.data,
                getValue: "PostNumber",
                list: {
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#editUser-postal").getSelectedItemData().CityName;
                        $("#editUser-city").val(value).trigger("change");
                    }
                }
            };
            $("#editUser-postal").easyAutocomplete(options);
            var options2 = {
                data: response.data,
                getValue: "CityName",
                list: {
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#editUser-city").getSelectedItemData().PostNumber;
                        $("#editUser-postal").val(value).trigger("change");
                    }
                }
            };
            $("#editUser-city").easyAutocomplete(options2);
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

        //End ot load city and postal code.



        // On load function of User Module
        if ($stateParams.id) {
            $scope.id = $stateParams.id;
        }
        else if ($stateParams.companyId) {
            $scope.id = $stateParams.companyId;
            $scope.isCompany = true;
        }
        else if ($stateParams.CompanyId) {
            $scope.id = $stateParams.CompanyId;
            $scope.isCompany = true;
        }
        else {
            $scope.id = undefined;
            $scope.isCompany = false;
        }
        $scope.newChainUser = {};

        $scope.getAllChainUsers();

        $scope.getAllCityPostCodes();


        // end of on load function of user module...

    }

})(angular.module('Common.Core'));