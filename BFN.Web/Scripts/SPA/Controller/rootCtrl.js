(function (app) {
    'use strict';

    app.controller('rootCtrl', rootCtrl);

    rootCtrl.$inject = ['$scope', '$location', '$rootScope', 'ApiService', 'notificationService', '$cookies'];

    function rootCtrl($scope, $location, $rootScope, ApiService, notificationService, $cookies) {
        if ($cookies.get('isloggedin') == 'false') {
            $scope.islogin = false;
            $scope.onload = false;
        }
        else {
            $scope.islogin = true;
            $scope.user = $cookies.get("userBFN");
        }

        $rootScope.$on('updateLogin', function (ev, args) {
            $scope.islogin = args.loginValue;
            $scope.user = args.userName;
        });

        $scope.Setisloggedin = function () {
            if ($cookies.get('isloggedin') == 'false') {
                $scope.islogin = false;
                $scope.onload = false;
            }
            else {
                $scope.islogin = true;
                $scope.user = $cookies.get("userBFN");
            }
        };

        $scope.logout = function () {
            debugger;
            //not able to call logout url. need to check why i am not able to logout.
            ApiService.get(BFNConstants.urls.userLogout, null, userLogoutSucceded, userLogoutFailed);
            //window.location = "/";
        };

        $scope.getClass = function () {
            //var url = window.location;
            //$('.sidebar-nav .nav').find('.active').removeClass('active');
            //$(this).parent().addClass('active');
        }

        function userLogoutSucceded(response) {
            debugger;
            console.log(response);
            $cookies.remove('token');
            $cookies.put('isloggedin', false);
            $cookies.put('logout', true);
            window.location.href = "/";
        }

        function userLogoutFailed(response) {
            console.log(response);
            $cookies.remove('token');
            $cookies.put('isloggedin', false);
            $cookies.put('logout', true);
            window.location.href = "/";
        }

    }

})(angular.module('Common.Core'));