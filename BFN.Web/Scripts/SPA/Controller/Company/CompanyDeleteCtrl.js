

(function (app) {
    'use strict';

    app.controller('CompanyDeleteCtrl', CompanyDeleteCtrl);

    CompanyDeleteCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];

    function CompanyDeleteCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {
        $scope.deleteCompany = {};
        $scope.id = $routeParams.id;

        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed)
        }
        else {
            $location.url('/');
        }

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

        //End of Authorization ...

        $scope.getCompany = function () {
            ApiService.get(BFNConstants.urls.getCompany + "?id=" + $scope.id, null, GetCompanySucceded, GetCompanyFailed);

        };

        function GetCompanySucceded(response) {
            $scope.deleteCompany = response.data;
            $scope.deleteCompany.CompanyCVR = parseFloat($scope.deleteCompany.CompanyCVR, 10);
            $scope.deleteCompany.CompanyBankAccountNo = parseFloat($scope.deleteCompany.CompanyBankAccountNo, 10);
        }

        function GetCompanyFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to get Company Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }


    }

})(angular.module('Common.Core'));