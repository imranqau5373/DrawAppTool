

(function (app) {
    'use strict';

    app.controller('ShopAllCtrl', ShopAllCtrl);

    ShopAllCtrl.$inject = ['$scope','$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', "$httpParamSerializer", '$cookies'];

    function ShopAllCtrl($scope,$timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $httpParamSerializer, $cookies) {

        $scope.viewAllShops = {};
        $scope.SearchModel = {
            searchShopBFNNumber: "",
            searchShopName: "",
            searchShopAddress: "",
            searchCompanyName: "",
            searchLastUpdatedDate: ""
        };
        if ($cookies.get('token') != null) {
            $scope.AuthorizeResponse = ApiService.masterget('/api/Shop/IsAuthorized'); //, null, AuthorizationResultSucceded, AuthorizationResultFailed
            $scope.AuthorizeResponse.then(function mySucces(response) {
                AuthorizationResultSucceded(response);
            }
            , function myError(response) {
                AuthorizationResultFailed(response);
            });
        }
        else {
            $location.url('/');
        }
        function AuthorizationResultSucceded(response) {
            $scope.getAllShops();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.getAllShops = function () {
            var qs = $httpParamSerializer($scope.pagingInfo);
            //$scope.myPromise = ApiService.get(BFNConstants.urls.getAllShops + "?" + qs, null, GetAllShopsSucceded, GetAllShopsFailed);
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllShops + "?" + qs);
            $scope.myProm.then(function mySucces(response) {                
                GetAllShopsSucceded(response);                
            }
            , function myError(response) {
                GetAllShopsFailed(response);
            });

        };
        /* *** Start *** */
        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.listingPaging,
            sortBy: "ShopBFNNumber",
            reverse: false,
            filterList: {},
            totalItems: 0
        };
        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["ShopBFNNumber"] = $scope.SearchModel.searchShopBFNNumber;
                    if ($scope.filterApplied.indexOf("ShopBFNNumber") === -1) {
                        $scope.filterApplied.push("ShopBFNNumber");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["ShopName"] = $scope.SearchModel.searchShopName;
                    if ($scope.filterApplied.indexOf("ShopName") === -1) {
                        $scope.filterApplied.push("ShopName");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["ShopAddress"] = $scope.SearchModel.searchShopAddress;
                    if ($scope.filterApplied.indexOf("ShopAddress") === -1) {
                        $scope.filterApplied.push("ShopAddress");
                    }
                    break;
                case 4:
                    $scope.pagingInfo.filterList["CompanyName"] = $scope.SearchModel.searchCompanyName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
            }

            $scope.getAllShops();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllShops();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllShops();
        };

        $scope.clearSearch = function (serachType) {
            $scope.pagingInfo.sortBy = "ShopBFNNumber";
            $scope.pagingInfo.reverse = false;
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchShopBFNNumber = "";
                        $scope.pagingInfo.filterList["ShopBFNNumber"] = "";
                        var index = $scope.filterApplied.indexOf("ShopBFNNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllShops();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchShopName = "";
                        $scope.pagingInfo.filterList["ShopName"] = "";
                        var index = $scope.filterApplied.indexOf("ShopName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllShops();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchShopAddress = "";
                        $scope.pagingInfo.filterList["ShopAddress"] = "";
                        var index = $scope.filterApplied.indexOf("ShopAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllShops();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchCompanyName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllShops();
                    }
                    break;
                case 5:
                    {
                        $scope.SearchModel.searchLastUpdatedDate = "";
                        $scope.pagingInfo.filterList["LastUpdatedDate"] = "";
                        var index = $scope.filterApplied.indexOf("LastUpdatedDate");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllShops();
                    }
                    break;
            }

        };
        /* *** End *** */

        //Start to get all Shops

        function GetAllShopsSucceded(response) {
            debugger;
            $scope.viewAllShops = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
            $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
            closeDropDown();
        }

        function GetAllShopsFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not Get All Shops Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        //End to get All Shops

        //Default time Template View
        $scope.viewDefaultTemplate = function (id) {
            debugger;
            ApiService.get(BFNConstants.urls.getDefaultTimeTemplate + "?shopid=" + id, null, defaultShopTimeTemplateSucceed, requestFailed);
        }

        function defaultShopTimeTemplateSucceed(response) {
            debugger;
            $scope.defaultTimeTemplate = response.data.TimeTemplate;
            $scope.defaultTimeTemplate.TemplateDateFrom = new Date($scope.defaultTimeTemplate.TemplateDateFrom).toDateString();
            $scope.defaultTimeTemplate.TemplateDateTo = new Date($scope.defaultTimeTemplate.TemplateDateTo).toDateString();
            $scope.defaultTimeTemplateHours = response.data.TemplateHours;
            SetDeafultTemplateHours($scope.defaultTimeTemplateHours);
            $timeout(function () {
                $("#view-defaultTemplate").click();
            }, 0);
        }


        function SetDeafultTemplateHours(TemplateHours) {
            for (let i = 0; i < TemplateHours.length; i++) {
                /*if (TemplateHours[i].Day == "Monday") {

                    $scope.defaultTimeTemplateHours.monStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.monEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Tuesday") {

                    $scope.defaultTimeTemplateHours.tueStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.tueEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Wednesday") {

                    $scope.defaultTimeTemplateHours.wedStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.wedEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Thursday") {

                    $scope.defaultTimeTemplateHours.thuStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.thuEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Friday") {

                    $scope.defaultTimeTemplateHours.friStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.friEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.defaultTimeTemplateHours.satStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.satEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Sunday") {

                    $scope.defaultTimeTemplateHours.sunStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.defaultTimeTemplateHours.sunEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }*/
                if (TemplateHours[i].Day == "Monday") {
                    $scope.defaultTimeTemplateHours.monStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.monEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Tuesday") {
                    $scope.defaultTimeTemplateHours.tueStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.tueEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Wednesday") {
                    $scope.defaultTimeTemplateHours.wedStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.wedEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Thursday") {
                    $scope.defaultTimeTemplateHours.thuStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.thuEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Friday") {
                    $scope.defaultTimeTemplateHours.friStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.friEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.defaultTimeTemplateHours.satStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.satEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Sunday") {
                    $scope.defaultTimeTemplateHours.sunStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.sunEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
            }

        }

        //End to view Default Time Template


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

        // end of Request function failed

    }

})(angular.module('Common.Core'));