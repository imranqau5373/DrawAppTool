

(function (app) {
    'use strict';

    app.controller('CompanyIndexCtrl', CompanyIndexCtrl);

    CompanyIndexCtrl.$inject = ['$scope','$cookies','$location', '$rootScope', 'ApiService', 'notificationService', '$httpParamSerializer'];

    function CompanyIndexCtrl($scope,$cookies, $location, $rootScope, ApiService, notificationService, $httpParamSerializer) {
        $scope.listAllCompanies = {};


        /* *** Start *** */

        $scope.SearchModel = {
            searchCVR: "",
            searchChainName: "",
            searchChainAddress: "",
            searchChainCompanies: ""
        };


        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: BFNConstants.listingPaging,
            sortBy: "CompanyCVR",
            reverse: false,
            filterList: {},
            totalItems: 0
        };
        $scope.filterApplied = [];

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["CompanyCVR"] = $scope.SearchModel.searchCVR;
                    if ($scope.filterApplied.indexOf("CompanyCVR") === -1) {
                        $scope.filterApplied.push("CompanyCVR");
                    }
                    break;
                case 2:
                    $scope.pagingInfo.filterList["CompanyName"] = $scope.SearchModel.searchChainName;
                    if ($scope.filterApplied.indexOf("CompanyName") === -1) {
                        $scope.filterApplied.push("CompanyName");
                    }
                    break;
                case 3:
                    $scope.pagingInfo.filterList["CompanyAddress"] = $scope.SearchModel.searchChainAddress;
                    if ($scope.filterApplied.indexOf("CompanyAddress") === -1) {
                        $scope.filterApplied.push("CompanyAddress");
                    }
                    break;
            }

            $scope.getAllCompanies();
        };

        $scope.sort = function (sortBy, reverse) {

            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllCompanies();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllCompanies();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchCVR = "";
                        $scope.pagingInfo.filterList["CompanyCVR"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyCVR");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchChainName = "";
                        $scope.pagingInfo.filterList["CompanyName"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchChainAddress = "";
                        $scope.pagingInfo.filterList["CompanyAddress"] = "";
                        var index = $scope.filterApplied.indexOf("CompanyAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getAllCompanies();
                    }
                    break;
            }

        };
        /* *** End *** */


        if ($cookies.get('token') != null) {
            ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            $scope.getAllCompanies();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        $scope.getAllCompanies = function () {
            var qs = $httpParamSerializer($scope.pagingInfo);
            //$scope.myPromise = ApiService.get(BFNConstants.urls.getAllCompanies + "?" + qs, null, GetAllCompanySucceded, GetAllCompanyFailed);
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllCompanies + "?" + qs);
            $scope.myProm.then(function mySucces(response) {
                GetAllCompanySucceded(response);
            }
            , function myError(response) {
                GetAllCompanyFailed(response);
            });
        };

        function GetAllCompanySucceded(response) {
            $scope.listAllCompanies = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
            $scope.pagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.pagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
            closeDropDown();
        }

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
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

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('.sidebar-nav .nav li a').each(function () {
                if (this.href == url) {
                    $(this).parent().addClass('active');
                }
            });
        }


    }

})(angular.module('Common.Core'));