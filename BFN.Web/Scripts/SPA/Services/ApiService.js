(function (app) {
    'use strict';

    app.factory('ApiService', ApiService);

    ApiService.$inject = ['$http', '$location', '$rootScope', '$cookies', 'notificationService'];

    function ApiService($http, $location, $rootScope, $cookies, notificationService) {
        var service = {
            get: get,
            masterget: masterget,
            post: post,
            setaccesstoken: setaccesstoken,
            userLogin : userLogin
        };

        var accesstoken = '';
        var isauthorize = true;
        var unauthorizemsg = '';
        var loadingBarSettings = { ignoreLoadingBar: true };
        function setaccesstoken() {
            
            accesstoken = $cookies.get('token');
        }

        function userLogin(url, data, success, failure) {
            return $http.post(url, data)
            .then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == '401') {
                    notificationService.displayError('Authentication required.');
                    $rootScope.previousState = $location.path();
                    $location.path('/');
                }
                else if (failure != null) {
                    failure(error);
                }
            });
        }

        function get(url, config, success, failure) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get('token');
            return $http({
                method: "GET",
                url: url
            }, loadingBarSettings).then(function (result) {
                        success(result);
                    }, function (error) {
                        //$cookies.remove('token');
                        if (error.status == '401') {
                            notificationService.displayError('Authentication required.');
                            failure(error);
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        //function get2(url, config, success, failure) {
        //    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get('token');
        //    return $http({
        //        method: "GET",
        //        url: url
        //    }, loadingBarSettings));
        //}


        function masterget(url) {
            return $http({
                method: "GET",
                url: url,
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    'Authorization': "Bearer " + $cookies.get('token'),
                }
            })
        }

        function post(url, data, success, failure) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get('token');
            return $http.post(url, data)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            //notificationService.displayError('Authentication required.');
                            //$rootScope.previousState = $location.path();
                            //$location.path('/');
                            failure(error);
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        return service;
    }

})(angular.module('Common.Core'));