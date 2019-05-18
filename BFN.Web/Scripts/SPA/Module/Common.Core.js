(function () {
    'use strict';

    angular.module('Common.Core', ['ngRoute', 'ngCookies', "angularUtils.directives.dirPagination", "cgBusy", 'angular-loading-bar', 'angularMoment'])
        .config(["paginationTemplateProvider", function (paginationTemplateProvider) {
        paginationTemplateProvider.setPath("/Scripts/dirPagination.tpl.html");
    }]);
})();