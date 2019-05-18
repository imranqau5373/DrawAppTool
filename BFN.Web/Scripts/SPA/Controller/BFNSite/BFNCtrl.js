(function (app) {

    function BFNCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService) {
        debugger;
        $scope.contactUs = {};

        $scope.saveMessage = function () {
            ApiService.post(BFNConstants.urls.contactUsUrl, $scope.contactUs, saveMessageSucceded, saveMessageFailed);

        };

        function saveMessageSucceded(response) {
            $scope.contactUs = {};
            window.location.href = "/";

        }

        function saveMessageFailed(response) {
            console.log(response);
        }

    }

    BFNCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService'];
    app.controller("BFNCtrl", BFNCtrl);

})(angular.module("BFN"));