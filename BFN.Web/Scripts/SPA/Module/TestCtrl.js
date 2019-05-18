

(function (app) {
    'use strict';

    app.controller('TestCtrl', TestCtrl);

    TestCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer'];

    function TestCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer) {

        /* *** End *** */

        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Controller/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
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

        //End of Authorization ...

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



    }

})(angular.module('Common.Core'));