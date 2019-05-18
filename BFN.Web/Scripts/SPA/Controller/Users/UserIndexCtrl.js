

(function (app) {
    'use strict';

    app.controller('UserIndexCtrl', UserIndexCtrl);

    UserIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function UserIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        $scope.getAllUsers = true;
        setSideBarMenu();
        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/User/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
        }
        else {
            window.location = "/"
        }

        function AuthorizationResultSucceded(response) {

        }

        function RequestFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#userLink').addClass('active');
        }

        //End of Authorization ...



    }

})(angular.module('Common.Core'));