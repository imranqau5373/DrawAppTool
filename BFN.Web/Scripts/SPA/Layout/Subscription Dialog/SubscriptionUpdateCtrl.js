
(function (app) {
    'use strict';

    app.controller('SubscriptionUpdateCtrl', SubscriptionUpdateCtrl);

    SubscriptionUpdateCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer', 'moment'];

    function SubscriptionUpdateCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer, $moment) {
        
        $scope.btnHeading = "Update";
        $scope.viewShopSubscriptionData = {};
        $scope.subscriptionOptions = [
            { value: 1, option: 'All year'},
            { value: 2, option: 'Only weekends, max 120 days'},
            { value: 3, option: 'Only summer, max 150 days'},
            { value: 4, option: 'All year + magazines and books from BK'},
            { value: 5, option: 'Only weekends, max 120 days + magazines and books from BK'},
            { value: 6, option: 'Only summer, max 150 days + magazines and books from BK'},
            { value: 7, option: 'All year only magazines and books from BK'},
            { value: 8, option: 'Only weekend only magazines and books from BK' }];

        $scope.getShopSubscriptionData = function () {
            ApiService.get(BFNConstants.urls.getShop + "?id=" + $scope.id, null, GetShopSucceded, GetShopFailed);
        };
        function GetShopSucceded(response) {
            $scope.viewShopSubscriptionData = response.data;
        }
        function GetShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Shop data..');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // Add Subscription Information
        $scope.addSubscriptionInfo = function () {
            $scope.viewShopSubscriptionData.Id = $scope.id;
            if ($scope.viewShopSubscriptionData.DailyNewsPaper == false)
            {
                $scope.viewShopSubscriptionData.NewsPaperDeliveryOptionId = null;
            }
            ApiService.post(BFNConstants.urls.saveShopSubscriptionInfo, $scope.viewShopSubscriptionData, addSubscriptionInfoSucceded, addSubscriptionInfoFailed);
        };
        function addSubscriptionInfoSucceded(response) {
            debugger;
            $scope.viewShopSubscriptionData = {};
            $scope.viewShop.DailyNewsPaper = response.data.DailyNewsPaper;
            $scope.viewShop.Magazines = response.data.Magazines;
            $scope.viewShop.Publisher = response.data.Publisher;
            $scope.viewShop.ForeignNewspapers = response.data.ForeignNewspapers;
            $scope.viewShop.ForeignWeeklyMagazines = response.data.ForeignWeeklyMagazines;
            $scope.viewShop.ForeignPublishers = response.data.ForeignPublishers;
            $scope.getShopDeliveryOptionData();
            $("#subscriptionupdate").modal('hide');
        }
        function addSubscriptionInfoFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        //End of Subscription Information...

        //Module to End Handover Shop.

        $scope.closeSubscriptionDailog = function () {
            $scope.btnHeading = "Update";
        }

        /// Get Delivery option update Start /////////
        $scope.getShopDeliveryOptionData = function () {
            ApiService.get(BFNConstants.urls.getShopDeliveryOption + "?ShopId=" + $scope.id, null, GetShopDeliveryOptionSucceded, GetShopDeliveryOptionFailed);
        };
        function GetShopDeliveryOptionSucceded(response) {
            debugger;
            $scope.viewShop.DeliveryOptionName = response.data.DeliveryOptionName;
        }
        function GetShopDeliveryOptionFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Shop data..');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /// Get Delivery option update Start /////////
    }

})(angular.module('Common.Core'));