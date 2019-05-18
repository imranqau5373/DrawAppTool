

(function (app) {
    'use strict';

    app.controller('PaymentIndexCtrl', PaymentIndexCtrl);

    PaymentIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function PaymentIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {
        debugger;
        $scope.listAllPayments = {};

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


        $scope.getAllPayments = function () {
            $scope.myProm = ApiService.masterget(BFNConstants.urls.getAllPayments);
            $scope.myProm.then(function mySucces(response) {
                GetAllPaymentsSucceded(response);
            }
            , function myError(response) {
                requestFailed(response);
            });

        }

        function GetAllPaymentsSucceded(response) {
            debugger;
            $scope.listAllPayments = response.data;


        }

        $scope.getAllPayments();



    }

})(angular.module('Common.Core'));