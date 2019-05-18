

(function (app) {
    'use strict';

    app.controller('ShopContactPersonCtrl', ShopContactPersonCtrl);

    ShopContactPersonCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function ShopContactPersonCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.Heading = "";
        $scope.newShopPerson = {};
        $scope.btnContactHeading = "Save";
        $scope.searchedEmail = false;
        $scope.addMode = true;

        $scope.setAddHeading = function () {
            $scope.Heading = "Add Contact Person";
            $scope.newShopPerson = {};
            $scope.newShopPerson.IsActive = false;
            $scope.searchedEmail = false;
            $scope.btnContactHeading = "Save";
            $scope.addMode = true;
        }




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
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#contact-postal").getSelectedItemData().CityName;
                        $("#contact-city").val(value).trigger("change");
                    }
                }
            };
            $("#contact-postal").easyAutocomplete(options);
            var options2 = {
                data: response.data,
                getValue: "CityName",
                list: {
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#contact-city").getSelectedItemData().PostNumber;
                        $("#contact-postal").val(value).trigger("change");
                    }
                }
            };
            $("#contact-city").easyAutocomplete(options2);
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

        // Start to get Shop Contact person 

        $scope.getShopContactPerson = function () {
            var qs = $httpParamSerializer($scope.shopContactPagingInfo);
            if ($scope.id) {
                ApiService.get(BFNConstants.urls.getShopContactPerson + "?" + qs + "&ShopId=" + $scope.id,
    null, GetShopContactPersonSucceded, requestFailed);
            } else if ($scope.nextShop.Id) {
                ApiService.get(BFNConstants.urls.getShopContactPerson + "?" + qs + "&ShopId=" + $scope.nextShop.Id,
    null, GetShopContactPersonSucceded, requestFailed);
            }

        }


        function GetShopContactPersonSucceded(response) {
            closeDropDown();
            $scope.viewContactPerson = response.data.Data;
            $scope.shopContactPagingInfo.totalItems = response.data.TotalRecords;
            $scope.shopContactPagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.shopContactPagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
        }

        // End to get Shop Contact person...



        /* *** Start Contact Person Paging, Sorting & Filtering *** */

        $scope.SearchCPModel = {
            searchContactPersonName: "",
            searchContactPersonAddress: "",
            searchContactPersonNumber: "",
            searchContactPersonEmail: ""
        };

        $scope.shopContactPagingInfo = {
            shopId: $scope.id,
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "ContactPersonName",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.filterApplied = [];

        $scope.searchShopContactPerson = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.shopContactPagingInfo.filterList["ContactPersonName"] = $scope.SearchCPModel.searchContactPersonName;
                    if ($scope.filterApplied.indexOf("ContactPersonName") === -1) {
                        $scope.filterApplied.push("ContactPersonName");
                    }
                    break;
                case 2:
                    $scope.shopContactPagingInfo.filterList["ContactPersonAddress"] = $scope.SearchCPModel.searchContactPersonAddress;
                    if ($scope.filterApplied.indexOf("ContactPersonAddress") === -1) {
                        $scope.filterApplied.push("ContactPersonAddress");
                    }
                    break;

                case 3:
                    $scope.shopContactPagingInfo.filterList["ContactPersonNumber"] = $scope.SearchCPModel.searchContactPersonNumber;
                    if ($scope.filterApplied.indexOf("ContactPersonNumber") === -1) {
                        $scope.filterApplied.push("ContactPersonNumber");
                    }
                    break;
                case 4:
                    $scope.shopContactPagingInfo.filterList["ContactPersonEmail"] = $scope.SearchCPModel.searchContactPersonEmail;
                    if ($scope.filterApplied.indexOf("ContactPersonEmail") === -1) {
                        $scope.filterApplied.push("ContactPersonEmail");
                    }
                    break;
            }

            $scope.getShopContactPerson();
        };

        $scope.sortCP = function (sortBy, reverse) {

            $scope.shopContactPagingInfo.sortBy = sortBy;
            $scope.shopContactPagingInfo.reverse = reverse;
            $scope.getShopContactPerson();

        };

        $scope.selectCPPage = function (page) {
            $scope.shopContactPagingInfo.page = page;
            $scope.getShopContactPerson();
        };

        $scope.clearContactPersonSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchCPModel.searchContactPersonName = "";
                        $scope.shopContactPagingInfo.filterList["ContactPersonName"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopContactPerson();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchCPModel.searchContactPersonAddress = "";
                        $scope.shopContactPagingInfo.filterList["ContactPersonAddress"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopContactPerson();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchCPModel.searchContactPersonNumber = "";
                        $scope.shopContactPagingInfo.filterList["ContactPersonNumber"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopContactPerson();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchCPModel.searchContactPersonEmail = "";
                        $scope.shopContactPagingInfo.filterList["ContactPersonEmail"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonEmail");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopContactPerson();
                    }
                    break;

            }

        };

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        /* *** End Contact Person Paging, Sorting & Filtering *** */



        // Add Contact Person

        $scope.addContactPerson = function () {
            //if it wants to assign existing shop user to any shop.
            if ($scope.newShopPerson.Id && $scope.searchedEmail) {
                $scope.newShopContactPerson = {};
                $scope.addShopContactPerson();
            }
            else if ($scope.newShopPerson) {
                if ($scope.newShopPerson.Id) {
                    $scope.newShopPerson.LastUpdatedDate = BFNConstants.getDateTime();
                    $scope.newShopPerson.LastUpdatedBy = $cookies.get('userIdBFN');
                    $scope.newShopPerson.IsActive = true;
                    ApiService.post(BFNConstants.urls.editContactPerson, $scope.newShopPerson, editContactPersonSucceded, requestFailed);
                }
                else {
                    $scope.newShopPerson.LastUpdatedDate = $scope.newShopPerson.CreatedDate = BFNConstants.getDateTime();
                    $scope.newShopPerson.IsActive = true;
                    $scope.newShopPerson.CreatedBy = $cookies.get('userIdBFN');
                    $scope.newShopPerson.LastUpdatedBy = $cookies.get('userIdBFN');
                    ApiService.post(BFNConstants.urls.addContactPerson, $scope.newShopPerson, addContactPersonSucceded, requestFailed);
                }
            }


        };

        function addContactPersonSucceded(response) {
            $scope.newShopPerson = {};
            $scope.newShopContactPerson = response.data;
            $scope.addShopContactPerson();
            $("#addContactPerson").modal('hide');
            //notificationService.displaySuccess('New contact person Created Successfully.');
            //$scope.newContactPerson = {};
        }

        function editContactPersonSucceded(response) {
            $scope.newShopPerson = {};
            $scope.getShopContactPerson();
            $("#addContactPerson").modal('hide');
         
        }
        function addContactPersonFailed(response) {
            console.log(response);
            $("#addContactPerson").modal('hide');
            if (response.status == '400') {
                notificationService.displayError('Contact person Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        $scope.addShopContactPerson = function () {
            if ($scope.id) {
                //add contact person from shop view.
                $scope.newShopContactPerson.ShopId = $scope.id;
            } else {
                // add contact person from add Shop Wizard
                $scope.newShopContactPerson.ShopId = $scope.nextShop.Id;
            }
            //Assign Shop to existing users.
            if ($scope.newShopPerson.Id) {
                $scope.newShopContactPerson.ContactPersonId = $scope.newShopPerson.Id;
            } else {
                $scope.newShopContactPerson.ContactPersonId = $scope.newShopContactPerson.Id;
            }
            ApiService.post(BFNConstants.urls.addShopContactPerson, $scope.newShopContactPerson, addShopContactPersonSucceded, requestFailed);
        }

        function addShopContactPersonSucceded(response) {
            $scope.newShopContactPerson = {};
            $scope.btnContactHeading = "Save";
            $scope.searchedEmail = false;
            $scope.getShopContactPerson();
            $("#addContactPerson").modal('hide');
        }

        //End of Add Contact Person

        //View to Contact Person Start


        $scope.viewShopContactPerson = function (id) {
            $scope.Heading = "Edit Contact Person";
            $scope.addMode = false;
            ApiService.get(BFNConstants.urls.getContactPerson + "?id=" + id, null, viewShopContactPersonSucceded, requestFailed);
        }

        function viewShopContactPersonSucceded(response) {
            $scope.newShopPerson = {};
            $scope.newShopPerson = response.data;
            if (response.data.ContactPersonNumber > 0) {
                $scope.newShopPerson.ContactPersonNumber = parseFloat(response.data.ContactPersonNumber);
            }
            $timeout(function () {
                $("#view-contact-person").click();
            }, 0);
        }

        //End to view Contact Person End..

        //Activate/Deactive Contact Person Start...

        $scope.deactiveShopContactPerson = function (id) {
            ApiService.get(BFNConstants.urls.deactiveContactPerson + "?id=" + id, null, $scope.getShopContactPerson, requestFailed);
        }


        $scope.activeShopContactPerson = function (id) {
            ApiService.get(BFNConstants.urls.activeContactPerson + "?id=" + id, null, $scope.getShopContactPerson, requestFailed);
        }



        //Activate/Deactive Contact Person End...

        //Request Failed Function

        function requestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function requestBlurFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }


        // end of Request function failed

        //Search Contact Person Via Email


        $scope.searchEmail = function (email) {
            debugger;
            if (_.isEmpty(email)) {
                notificationService.displayError("Please Enter an Email Address");
            }
            else {
                ApiService.get(BFNConstants.urls.searchContactEmail + "?email=" + email, null, serachContactEmailSucceed, requestFailed);
            }

        }
        $scope.onBlurSearchEmail = function (email) {
            debugger;
            if (!$scope.searchedEmail && $scope.addMode) {
                if (_.isEmpty(email)) {
                    notificationService.displayError("Please Enter an Email Address");
                }
                else {
                    ApiService.get(BFNConstants.urls.searchContactEmail + "?email=" + email, null, serachOnBlurContactEmailSucceed, requestBlurFailed);
                }
            }
            else {

            }
        }

        function serachContactEmailSucceed(response) {
            $scope.newShopPerson = {};
            $scope.newShopPerson = response.data.contactPerson;
            if ($scope.newShopPerson != null) {
                $scope.btnContactHeading = "Assign";
                $scope.Heading = "Assign Contact Person";
                $scope.searchedEmail = true;
                if (response.data.ContactPersonNumber > 0) {
                    $scope.newShopPerson.ContactPersonNumber = parseFloat(response.data.contactPerson.ContactPersonNumber);
                }
            }
            else {
                $scope.newShopPerson = {};
                $scope.newShopPerson.ContactPersonEmail = response.data.email;
                $scope.btnContactHeading = "Save";
                $scope.Heading = "Add Contact Person";
                $scope.searchedEmail = false;
                notificationService.displayError("No record found against this email");
            }

        }

        function serachOnBlurContactEmailSucceed(response) {
            $scope.newShopPerson = {};
            $scope.newShopPerson = response.data.contactPerson;
            if ($scope.newShopPerson != null) {
                $scope.btnContactHeading = "Assign";
                $scope.Heading = "Assign Contact Person";
                $scope.searchedEmail = true;
                if (response.data.contactPerson.ContactPersonNumber > 0) {
                    $scope.newShopPerson.ContactPersonNumber = parseFloat(response.data.contactPerson.ContactPersonNumber);
                }
            }
            else {
                $scope.newShopPerson = {};
                $scope.newShopPerson.ContactPersonEmail = response.data.email;
                $scope.btnContactHeading = "Save";
                $scope.Heading = "Add Contact Person";
                $scope.searchedEmail = false;
            }

        }


        $scope.closeAddContactPerson = function () {
            $scope.newShopPerson = {};
            $scope.btnContactHeading = "Save";
            $scope.searchedEmail = false;
        }
        //End of Contact Person


        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            //ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
            AuthorizationResultSucceded();
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded() {
            $scope.getShopContactPerson();
            $scope.getAllCityPostCodes();
        }

        function RequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Authorization ...







    }

})(angular.module('Common.Core'));