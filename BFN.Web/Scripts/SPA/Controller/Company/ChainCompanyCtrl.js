

(function (app) {
    'use strict';

    app.controller('ChainCompanyCtrl', ChainCompanyCtrl);

    ChainCompanyCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];

    function ChainCompanyCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {
        $scope.deleteCompany = {};
        $scope.chainId = $routeParams.ChainId;
        $scope.companyId = $routeParams.ChainId;



        ApiService.get('/api/Company/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed);

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

        $scope.getCompany = function () {
            ApiService.get(BFNConstants.urls.getCompany + "?id=" + $scope.chainId, null, GetCompanySucceded, GetCompanyFailed);

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