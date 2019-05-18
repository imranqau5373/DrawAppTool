(function (app) {
    'use strict';

    function ContactPersonIndexCtrl($scope, $location, $rootScope, ApiService, notificationService, $httpParamSerializer) {
        $scope.listAllContactPersons = {};
        $scope.SearchModel = {
            searchName: "",
            searchAddress: "",
            searchPhoneNo: "",
            searchEmail: ""
        };

        $scope.getAllContactPersons = function () {
       
            var qs = $httpParamSerializer($scope.pagingInfo);

            ApiService.get(BFNConstants.urls.getAllContactPersons + "?" + qs, null, GetAllContactPersonsSucceded, GetAllContactPersonsFailed);

        };

        /* *** Start *** */
        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: 8,
            sortBy: "ContactPersonName",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.search = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.pagingInfo.filterList["ContactPersonName"] = $scope.SearchModel.searchName;
                    break;
                case 2:
                    $scope.pagingInfo.filterList["ContactPersonAddress"] = $scope.SearchModel.searchAddress;
                    break;

            }

            $scope.getAllContactPersons();
        };

        $scope.sort = function (sortBy, reverse) {
          
            $scope.pagingInfo.sortBy = sortBy;
            $scope.pagingInfo.reverse = reverse;
            $scope.getAllContactPersons();

        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            $scope.getAllContactPersons();
        };

        $scope.clearSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchName = "";
                        $scope.pagingInfo.filterList["ContactPersonName"] = "";
                        $scope.getAllContactPersons();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchAddress = "";
                        $scope.pagingInfo.filterList["ContactPersonAddress"] = "";
                        $scope.getAllContactPersons();
                    }
                    break;               
            }            
        };
        /* *** End *** */

        $scope.getAllContactPersons();

        function GetAllContactPersonsSucceded(response) {
            $scope.listAllContactPersons = response.data.Data;
            $scope.pagingInfo.totalItems = response.data.TotalRecords;
        }

        function GetAllContactPersonsFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Unable Get All Contact Persons Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
    }
    ContactPersonIndexCtrl.$inject = ['$scope', '$location', '$rootScope', 'ApiService', 'notificationService', "$httpParamSerializer"];
    app.controller('ContactPersonIndexCtrl', ContactPersonIndexCtrl);
})(angular.module('BFN'));
