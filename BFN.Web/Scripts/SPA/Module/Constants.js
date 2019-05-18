var BFNConstants = BFNConstants || {};
(function () {
    
    BFNConstants.urls = BFNConstants.urls || {};
    BFNConstants.urls.apiBaseUrl = getApiUrl();

    //Reports URL

    BFNConstants.urls.generateReport = BFNConstants.urls.apiBaseUrl + "/Reports/generateReport";

    //Customers URL

    BFNConstants.urls.getAllCustomers = BFNConstants.urls.apiBaseUrl + "/CustomerRec/getAllCustomers";
    BFNConstants.urls.addCustomer = BFNConstants.urls.apiBaseUrl + "/CustomerRec/addCustomer";
    BFNConstants.urls.updateCustomer = BFNConstants.urls.apiBaseUrl + "/CustomerRec/updateCustomer";
    BFNConstants.urls.getCustomer = BFNConstants.urls.apiBaseUrl + "/CustomerRec/getCustomer";


    //Commite URL

    BFNConstants.urls.getAllCommites = BFNConstants.urls.apiBaseUrl + "/CommiteRec/getAllCommites";
    BFNConstants.urls.addCommite = BFNConstants.urls.apiBaseUrl + "/CommiteRec/addCommite";
    BFNConstants.urls.updateCommite = BFNConstants.urls.apiBaseUrl + "/CommiteRec/updateCommite";
    BFNConstants.urls.getCommite = BFNConstants.urls.apiBaseUrl + "/CommiteRec/getCommite";
    BFNConstants.urls.getCommiteMembers = BFNConstants.urls.apiBaseUrl + "/CommiteRec/getCommiteMembers";
    BFNConstants.urls.getSerialNumber = BFNConstants.urls.apiBaseUrl + "/CommiteRec/getSerialNumber";

    
    BFNConstants.urls.addCommiteMembers = BFNConstants.urls.apiBaseUrl + "/CommiteRec/addCommiteMembers";


    //Installments URL

    BFNConstants.urls.getCommiteInstallment = BFNConstants.urls.apiBaseUrl + "/CommiteRec/getCommiteInstallment";

    //Payments URL

    BFNConstants.urls.getCustomersForPayment = BFNConstants.urls.apiBaseUrl + "/PaymentRec/getCustomersForPayment";
    BFNConstants.urls.addPayment = BFNConstants.urls.apiBaseUrl + "/PaymentRec/addPayment";
    BFNConstants.urls.getAllPayments = BFNConstants.urls.apiBaseUrl + "/PaymentRec/getAllPayments";
    BFNConstants.urls.getCustomerPayments = BFNConstants.urls.apiBaseUrl + "/PaymentRec/getCustomerPayments";
    BFNConstants.urls.getMembersForAssign = BFNConstants.urls.apiBaseUrl + "/PaymentRec/getMembersForAssign";
    BFNConstants.urls.getPaymentReport = BFNConstants.urls.apiBaseUrl + "/PaymentRec/getPaymentReport";
    


    

    










    // BFN sites URL....

    BFNConstants.urls.contactUsUrl = BFNConstants.urls.apiBaseUrl + "/BFNSite/contactUs";

    //Paging size defined
    /* *** Two page sizes are defined here, as first is for main listing page, second is for view page listings *** */
    BFNConstants.listingPaging = 10;
    BFNConstants.viewListingPaging = 5;


    function getApiUrl() {
        var apiUrls = {
            'dev': 'http://zubaircommite.azurewebsites.net/api',
            'local': 'http://localhost:58676/api'
        };
        var currentHost = document.location.host;
        if (currentHost == "localhost:58676") {
            return apiUrls.local;
        } else {
            return apiUrls.dev;
        }
    };

    function getLoginUrl() {
        var apiUrls = {
            'dev': 'http://zubaircommite.azurewebsites.net',
            'local': 'http://localhost:58676'
        };
        var currentHost = document.location.host;
        if (currentHost == "localhost:58676") {
            return apiUrls.local;
        } else {
            return apiUrls.dev;
        }
    };

    BFNConstants.getDateTime = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }

    BFNConstants.getFromDate = function (dateObj) {
        var today = new Date(dateObj);
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }

    BFNConstants.randomText = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
})();