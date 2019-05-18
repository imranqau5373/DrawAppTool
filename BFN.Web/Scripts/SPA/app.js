

(function () {
    'use strict';

    angular.module('BFN', ['Common.Core', 'ui.router'])
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.hashPrefix('#!');

        $stateProvider.state("BFNSite", {
            url: "/",
            title: "BFN",
            templateUrl: "Scripts/SPA/Controller/BFNSite/bfn-site.html",
            controller: "BFNCtrl"
        }).state("BFNHome", {
            url: "/Home",
            title: "BFN",
            templateUrl: "Scripts/SPA/Controller/BFNHome/Index.html",
            controller: ""
        })
        .state("BFNHome.AddCompanyWithAdmin", {
            url: "/company/:CompanyId",
            title: "Company",
            templateUrl: "Scripts/SPA/Controller/Company/company-add.html",
            controller: "CompanyCtrl"
        })
        .state("BFNHome.AddCustomer", {
            url: "/AddCustomer",
            title: "Add Customer",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-add.html",
            controller: "CustomerAddCtrl"
        })
        .state("BFNHome.ViewCustomer", {
            url: "/ViewCustomer/:Id",
            title: "View Customer",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-view.html",
            controller: "CustomerViewCtrl"
        })
        .state("BFNHome.CustomerIndex", {
            url: "/CustomerIndex",
            title: "Customer Index",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-index.html",
            controller: "CustomerIndexCtrl"
        })
        .state("BFNHome.AddCommite", {
            url: "/AddCommite",
            title: "Add Commite",
            templateUrl: "Scripts/SPA/Controller/CommiteRecord/commite-add.html",
            controller: "CommiteAddCtrl"
        })
        .state("BFNHome.CommiteIndex", {
            url: "/CommiteIndex",
            title: "Commite Index",
            templateUrl: "Scripts/SPA/Controller/CommiteRecord/Commite-index.html",
            controller: "CommiteIndexCtrl"
        })

        .state("BFNHome.CommiteView", {
            url: "/CommiteView/:Id",
            title: "Commite View",
            templateUrl: "Scripts/SPA/Controller/CommiteRecord/Commite-view.html",
            controller: "CommiteViewCtrl"
        })

        .state("BFNHome.CommiteMember", {
            url: "/CommiteView/:CommiteId/AddMember",
            title: "Add Commite Member",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-add.html",
            controller: "CustomerAddCtrl"
        })

        .state("BFNHome.CommiteViewMember", {
            url: "/CommiteView/:CommiteId/ViewMember/:MemberId",
            title: "View Commite Member",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-view.html",
            controller: "CustomerViewCtrl"
        })

        .state("BFNHome.CommiteEditMember", {
            url: "/CommiteView/:CommiteId/EditMember/:MemberId",
            title: "Edit Commite Member",
            templateUrl: "Scripts/SPA/Controller/CustomerRecord/customer-add.html",
            controller: "CustomerEditCtrl"
        })
        
        .state("BFNHome.PaymentIndex", {
            url: "/PaymentIndex",
            title: "Payment Index",
            templateUrl: "Scripts/SPA/Controller/Payment Record/payment-index.html",
            controller: "PaymentIndexCtrl"
        })
        .state("BFNHome.AddPayment", {
            url: "/AddPayment",
            title: "Add Payment",
            templateUrl: "Scripts/SPA/Controller/Payment Record/payment-add.html",
            controller: "PaymentAddCtrl"
        })
        .state("BFNHome.PaymentView", {
            url: "/PaymentView/:Id",
            title: "Payment View",
            templateUrl: "Scripts/SPA/Controller/Payment Record/payment-view.html",
            controller: "PaymentViewCtrl"
        })
        .state("BFNHome.ReportIndex", {
            url: "/ReportIndex",
            title: "Report Index",
            templateUrl: "Scripts/SPA/Controller/Report/report-index.html",
            controller: "ReportIndexCtrl"
        })
        .state("BFNLogin", {
            url: "/Login",
            title: "Login",
            templateUrl: "Scripts/SPA/Controller/Account/login.html",
            controller: "LoginCtrl"
        })
        $locationProvider.html5Mode(true);
    }


})();