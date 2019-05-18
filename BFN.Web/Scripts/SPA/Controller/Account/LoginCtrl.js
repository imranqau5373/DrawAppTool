(function (app) {
    'use strict';

    app.controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$location', '$rootScope', 'ApiService', 'notificationService', '$cookies'];

    function LoginCtrl($scope, $location, $rootScope, ApiService, notificationService, $cookies) {
        //debugger;
        $scope.loginData = {};
        $scope.loginError = false;
        if ($cookies.get('token') != null) {
            //if user is properly login and first time come on page of login or try to access login. if already login.
            //$rootScope.$broadcast('updateLogin',{ loginValue: true, userName: response.data.userName});
            window.location.href = "/Home/AddCustomer";
            //$location.url('/Home/chainIndex');
        }
        else {
            //if user is logout or session is expired.
            $rootScope.$broadcast('updateLogin', { loginValue: false, userName: '' });
            $cookies.put('logout', true);
            $scope.iserror = true;
            
        }

        $scope.userLogin = function () {
            debugger;
            var data = "grant_type=password&username=" + $scope.loginData.Email + "&password=" + $scope.loginData.Password;
            $scope.myPromise = ApiService.userLogin(BFNConstants.urls.userLogin, data, userLoginSucceded, userLoginFailed);
        };

        function userLoginSucceded(response) {
            notificationService.displaySuccess('User Login Successfully.');
            $cookies.put('token', response.data.access_token);
            $cookies.put('isloggedin', 'true');
            $cookies.put('userBFN', response.data.userName.replace(/\"/g, ""));
            $cookies.put('userIdBFN', response.data.Id);
            $cookies.put('token-expire-identity', response.data[".expires"]);
            $cookies.put('logout', false);
            $scope.loginData = {};
            ApiService.setaccesstoken();
            //$scope.Setisloggedin();
            $rootScope.$broadcast('updateLogin', { loginValue: true, userName: $cookies.get('userBFN') });
            //$location.url('/Home/chainIndex');
            window.location.href = "/Home/chainIndex";
        }

        function userLoginFailed(response) {
            debugger;
            console.log(response);
            if (response.status == '400') {
                $scope.loginError = true;
                notificationService.displayError('User Name or Password is incorrect.');
            }
            else
                notificationService.displayError('Not Able to Login.');
        }


    }

})(angular.module('Common.Core'));