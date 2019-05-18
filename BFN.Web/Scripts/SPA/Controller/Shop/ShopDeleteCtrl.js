






(function (app) {
    'use strict';

    app.controller('ShopDeleteCtrl', ShopDeleteCtrl);

    ShopDeleteCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];

    function ShopDeleteCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {

        ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed);
        function AuthorizationResultSucceded(response) {
            $scope.getCompany();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }


    }

})(angular.module('Common.Core'));