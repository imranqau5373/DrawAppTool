


(function (app) {
    'use strict';

    app.controller('ShopAddCtrl', ShopAddCtrl);

    ShopAddCtrl.$inject = ['$scope', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$timeout', '$cookies', '$stateParams','moment'];

    function ShopAddCtrl($scope, $location, $routeParams, $rootScope, ApiService, notificationService, $timeout, $cookies, $stateParams,moment) {


        /* **** **** */
        $.mask.definitions['a'] = "[0-2]";
        $.mask.definitions['b'] = "[0-9]";
        $.mask.definitions['c'] = "[0-5]";
        $.mask.definitions['d'] = "[0-9]";
        $(".timepicker").mask("ab:cd", { autoclear: false });
        /* **** **** */
        ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, AuthorizationResultFailed);
        $scope.newShop = {};
        $scope.nextShop = {};
        $scope.userHeading = "Add Shop Admin";
        $scope.userEdit = "Edit Shop Admin";
        $scope.userView = "View Shop Admin";
        $scope.userRole = "ShopAdmin";
        $scope.companyId = $stateParams.companyId;
        $scope.chainId = $stateParams.chainId;
        $scope.shopId = $stateParams.shopId;
        
        $scope.listAllCompanies = {};
        $scope.selected = undefined;
        $scope.isShop = true;
        $scope.userRole = "ShopAdmin";
        $scope.getCompName = false;
        $scope.allCompanyDetails = {};
        $scope.openingHours = {};
        $scope.allCompanyNames = {};
        $scope.shopSubscriptionInfo = {};

        function setSideBarMenu() {
            var url = window.location;
            $('.sidebar-nav .nav').find('.active').removeClass('active');
            $('#shopLink').addClass('active');
        }

        setSideBarMenu();
        
        //getAllCompaniesNames();

        $scope.addShop = function () {
            if ($scope.newShop.ShopCityName.indexOf("(") > 0)
            {
                $scope.newShop.ShopCityName = $scope.newShop.ShopCityName.substring(0, $scope.newShop.ShopCityName.indexOf("("));
            }
            
            let getCompanyName = false;
            $scope.newShop.CreatedBy = $cookies.get('userIdBFN');
            $scope.newShop.LastUpdatedBy = $cookies.get('userIdBFN');
            /* *** Verify Company Name **** */
            angular.forEach($scope.allCompanyNames, function (value) {
                if (value.CompanyName == $('#CompanyName').val()) {
                    getCompanyName = true;
                }
            });
            if (!angular.isDefined($scope.newShop.CompanyId)) {
                notificationService.displayError('Please select valid company name.');
            }
            else if(!angular.isDefined($scope.newShop.ShopName)){
                notificationService.displayError('Please enter valid shop name.');
            }
            else if(!angular.isDefined($scope.newShop.ShopAddress)) {
                notificationService.displayError('Please enter valid shop address.');
            }
            else if (!getCompanyName) {
                notificationService.displayError('Please select valid company name.');
            }
            else {
                debugger;
                $scope.newShop.InagurationDate = $scope.newShop.InagurationDate == null ? null : moment($scope.newShop.InagurationDate).format("MM/DD/YYYY HH:mm");
                $scope.newShop.TerminatinonDate = $scope.newShop.TerminatinonDate == null ? null : moment($scope.newShop.TerminatinonDate).format("MM/DD/YYYY HH:mm");
                if ($scope.newShop.InagurationDate != null && $scope.newShop.TerminatinonDate != null) {
                    if (new Date($scope.newShop.InagurationDate) > new Date($scope.newShop.TerminatinonDate)) {
                        notificationService.displayError('Inaguration Date must be less then or equal to TerminatinonDate');
                    }
                    else {
                        ApiService.post(BFNConstants.urls.addShop, $scope.newShop, addShopSucceded, addShopFailed);
                    }
                }
                else {
                    ApiService.post(BFNConstants.urls.addShop, $scope.newShop, addShopSucceded, addShopFailed);
                }
                  
            }            
        };

        function addShopSucceded(response) {

            notificationService.displaySuccess('New Shop Added Successfully.');
            $scope.addShop = {};
            $scope.nextShop = response.data;
            $scope.addDefaultOpenHours();
            /*if ($stateParams.id != null) {
                window.location.href = "Home/viewCompany/"+$stateParams.id;
            }
            else if ($stateParams.chainId != null) {
                window.location.href = "Home/viewChain/" + $stateParams.chainId;
            }
            else {
                window.location.href = "Home/shop";
            }*/

            /*angular.element('#ohPart').css('pointer-events', 'fill');
            angular.element('#shopPart').css('pointer-events', 'none');
            $timeout(function () {
                $("#ohPart").click();
            }, 0);
            */
            $("#shop").css("display", "none");
            $("#opening-hours").css("display", "block");
        }

        function addShopFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }       

        function AuthorizationResultSucceded(response) {
            if ($stateParams.companyId && $stateParams.c) {
                $scope.getCompName = true;
                $scope.getCompany();                
            }
            $scope.getAllCompaniesNames();
            $scope.getAllCityPostCodes();
            $scope.getAllCategories();
        }

        function AuthorizationResultFailed(response) {
            console.log(response);
            if (response.status == '400') {
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }


        /* *** Get Compnay details in case of Company *** */

        $scope.getCompany = function () {
            ApiService.get(BFNConstants.urls.getCompany + "?id=" + $stateParams.companyId, null, getCompanySucceded, getCompanyFailed);

        };
        function getCompanySucceded(response) {

            
            $scope.allCompanyDetails = response.data;
            $("#CompanyName").val($scope.allCompanyDetails.CompanyName);
            $("#CompanyId").val($scope.allCompanyDetails.Id);
            $scope.newShop.CompanyId = $scope.allCompanyDetails.Id;
        }
        function getCompanyFailed(response) {
            //need to handle scenario if user session is expried and try to add chain.
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Get Compnay details in case of Company *** */

        /* *** Add Default opening hours section start here *** */
        $scope.defaultOpeningHours = {};
        $scope.addDefaultOpenHours = function () {
            debugger;
            $scope.defaultOpeningHours.LastUpdatedDate = $scope.defaultOpeningHours.CreatedDate = BFNConstants.getDateTime();
            $scope.defaultOpeningHours.ShopId = $scope.nextShop.Id;
            $scope.defaultOpeningHours.CreatedBy = $cookies.get('userIdBFN');
            $scope.defaultOpeningHours.LastUpdatedBy = $cookies.get('userIdBFN');
            ApiService.post(BFNConstants.urls.addShopOpeningHours, $scope.defaultOpeningHours, addDefaultOpeningHoursSucceded, addDefaultOpeningHoursFailed);
        };
        function addDefaultOpeningHoursSucceded(response) {

            //notificationService.displaySuccess('New Shop Added Successfully.');
            $scope.addShop = {};
            $scope.openingHours.monStart = '09:00';
            $scope.openingHours.monEnd = '17:00';
            $scope.openingHours.tueStart = '09:00';
            $scope.openingHours.tueEnd = '17:00';
            $scope.openingHours.wedStart = '09:00';
            $scope.openingHours.wedEnd = '17:00';
            $scope.openingHours.thuStart = '09:00';
            $scope.openingHours.thuEnd = '17:00';
            $scope.openingHours.friStart = '09:00';
            $scope.openingHours.friEnd = '17:00';
            $scope.openingHours.TemplateId = response.data.Id;
        }
        function addDefaultOpeningHoursFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Add Default opening hours section ends here *** */

        /* *** Add opening hours section start here *** */
                
        $scope.addOpenHours = function () {
            debugger;
            $scope.openingHours.ShopId = $scope.nextShop.Id;
            $scope.openingHours.CreatedBy = $cookies.get('userIdBFN');
            $scope.openingHours.LastUpdatedBy = $cookies.get('userIdBFN');
            if (($scope.openingHours.monStart && !$scope.openingHours.monEnd) || 
                (!$scope.openingHours.monStart && $scope.openingHours.monEnd))
            {
                notificationService.displayError('Please enter Monday missing Start/End time.');
            }
            else if ($scope.openingHours.monStart && !validateTime($scope.openingHours.monStart)) {
                notificationService.displayError('Please enter valid Time for Monday start.');
            }
            else if ($scope.openingHours.monEnd && !validateTime($scope.openingHours.monEnd)) {
                notificationService.displayError('Please enter valid Time for Monday end.');
            }
            else if ($scope.openingHours.monStart && $scope.openingHours.monStart >= $scope.openingHours.monEnd)
            {
                notificationService.displayError('Monday start hours should be less than end time.');
            }
            else if (($scope.openingHours.tueStart && !$scope.openingHours.tueEnd) ||
                     (!$scope.openingHours.tueStart && $scope.openingHours.tueEnd)) {
                notificationService.displayError('Please enter Tuesday missing Start/End time.');
            }
            else if ($scope.openingHours.tueStart && !validateTime($scope.openingHours.tueStart)) {
                notificationService.displayError('Please enter valid Time for Tuesday start.');
            }
            else if ($scope.openingHours.tueEnd && !validateTime($scope.openingHours.tueEnd)) {
                notificationService.displayError('Please enter valid Time for Tuesday end.');
            }
            else if ($scope.openingHours.tueStart && $scope.openingHours.tueStart >= $scope.openingHours.tueEnd) {
                notificationService.displayError('Tuesday start hours should be less than end time.');
            }
            else if (($scope.openingHours.wedStart && !$scope.openingHours.wedEnd) ||
                 (!$scope.openingHours.wedStart && $scope.openingHours.wedEnd)) {
                notificationService.displayError('Please enter Wednesday missing Start/End time.');
            }
            else if ($scope.openingHours.wedStart && !validateTime($scope.openingHours.wedStart)) {
                notificationService.displayError('Please enter valid Time for Wednesday start.');
            }
            else if ($scope.openingHours.wedEnd && !validateTime($scope.openingHours.wedEnd)) {
                notificationService.displayError('Please enter valid Time for Wednesday end.');
            }
            else if ($scope.openingHours.wedStart && $scope.openingHours.wedStart >= $scope.openingHours.wedEnd) {
                notificationService.displayError('Wednesday start hours should be less than end time.');
            }
            else if (($scope.openingHours.thuStart && !$scope.openingHours.thuEnd) ||
                 (!$scope.openingHours.thuStart && $scope.openingHours.thuEnd)) {
                notificationService.displayError('Please enter Thursday missing Start/End time.');
            }
            else if ($scope.openingHours.thuStart && !validateTime($scope.openingHours.thuStart)) {
                notificationService.displayError('Please enter valid Time for Thursday start.');
            }
            else if ($scope.openingHours.thuEnd && !validateTime($scope.openingHours.thuEnd)) {
                notificationService.displayError('Please enter valid Time for Thursday end.');
            }
            else if ($scope.openingHours.thuStart && $scope.openingHours.thuStart >= $scope.openingHours.thuEnd) {
                notificationService.displayError('Thursday start hours should be less than end time.');
            }
            else if (($scope.openingHours.friStart && !$scope.openingHours.friEnd) ||
                 (!$scope.openingHours.friStart && $scope.openingHours.friEnd)) {
                notificationService.displayError('Please enter Friday missing Start/End time.');
            }
            else if ($scope.openingHours.friStart && !validateTime($scope.openingHours.friStart)) {
                notificationService.displayError('Please enter valid Time for Friday start.');
            }
            else if ($scope.openingHours.friEnd && !validateTime($scope.openingHours.friEnd)) {
                notificationService.displayError('Please enter valid Time for Friday end.');
            }
            else if ($scope.openingHours.friStart && $scope.openingHours.friStart >= $scope.openingHours.friEnd) {
                notificationService.displayError('Friday start hours should be less than end time.');
            }
            else if (($scope.openingHours.satStart && !$scope.openingHours.satEnd) ||
                 (!$scope.openingHours.satStart && $scope.openingHours.satEnd)) {
                notificationService.displayError('Please enter Saturday missing Start/End time.');
            }
            else if ($scope.openingHours.satStart && !validateTime($scope.openingHours.satStart)) {
                notificationService.displayError('Please enter valid Time for Saturday start.');
            }
            else if ($scope.openingHours.satEnd && !validateTime($scope.openingHours.satEnd)) {
                notificationService.displayError('Please enter valid Time for Saturday end.');
            }
            else if ($scope.openingHours.satStart && $scope.openingHours.satStart >= $scope.openingHours.satEnd) {
                notificationService.displayError('Saturday start hours should be less than end time.');
            }
            else if (($scope.openingHours.sunStart && !$scope.openingHours.sunEnd) ||
                 (!$scope.openingHours.sunStart && $scope.openingHours.sunEnd)) {
                notificationService.displayError('Please enter Sunday missing Start/End time.');
            }
            else if ($scope.openingHours.sunStart && !validateTime($scope.openingHours.sunStart)) {
                notificationService.displayError('Please enter valid Time for Sunday start.');
            }
            else if ($scope.openingHours.sunEnd && !validateTime($scope.openingHours.sunEnd)) {
                notificationService.displayError('Please enter valid Time for Sunday end.');
            }
            else if ($scope.openingHours.sunStart && $scope.openingHours.sunStart >= $scope.openingHours.sunEnd) {
                notificationService.displayError('Sunday start hours should be less than end time.');
            }
            else {
                /*if ($scope.openingHours.monStart != null)
                {
                    let startTimeMon = $scope.openingHours.monStart.getHours() + ":" + $scope.openingHours.monStart.getMinutes();
                    $scope.openingHours.monStart = startTimeMon;
                    let endTimeMon = $scope.openingHours.monEnd.getHours() + ":" + $scope.openingHours.monEnd.getMinutes();
                    $scope.openingHours.monEnd = endTimeMon;
                }
                if ($scope.openingHours.tueStart != null) {
                    let startTimeTue = $scope.openingHours.tueStart.getHours() + ":" + $scope.openingHours.tueStart.getMinutes();
                    $scope.openingHours.tueStart = startTimeTue;
                    let endTimeTue = $scope.openingHours.tueEnd.getHours() + ":" + $scope.openingHours.tueEnd.getMinutes();
                    $scope.openingHours.tueEnd = endTimeTue;
                }
                if ($scope.openingHours.wedStart != null) {
                    let startTimeWed = $scope.openingHours.wedStart.getHours() + ":" + $scope.openingHours.wedStart.getMinutes();
                    $scope.openingHours.wedStart = startTimeWed;
                    let endTimeWed = $scope.openingHours.wedEnd.getHours() + ":" + $scope.openingHours.wedEnd.getMinutes();
                    $scope.openingHours.wedEnd = endTimeWed;
                }
                if ($scope.openingHours.thuStart != null) {
                    let startTimeThu = $scope.openingHours.thuStart.getHours() + ":" + $scope.openingHours.thuStart.getMinutes();
                    $scope.openingHours.thuStart = startTimeThu;
                    let endTimeThu = $scope.openingHours.thuEnd.getHours() + ":" + $scope.openingHours.thuEnd.getMinutes();
                    $scope.openingHours.thuEnd = endTimeThu;
                }
                if ($scope.openingHours.friStart != null) {
                    let startTimeFri = $scope.openingHours.friStart.getHours() + ":" + $scope.openingHours.friStart.getMinutes();
                    $scope.openingHours.friStart = startTimeFri;
                    let endTimeFri = $scope.openingHours.friEnd.getHours() + ":" + $scope.openingHours.friEnd.getMinutes();
                    $scope.openingHours.friEnd = endTimeFri;
                }
                if ($scope.openingHours.satStart != null) {
                    let startTimeSat = $scope.openingHours.satStart.getHours() + ":" + $scope.openingHours.satStart.getMinutes();
                    $scope.openingHours.satStart = startTimeSat;
                    let endTimeSat = $scope.openingHours.satEnd.getHours() + ":" + $scope.openingHours.satEnd.getMinutes();
                    $scope.openingHours.satEnd = endTimeSat;
                }
                if ($scope.openingHours.sunStart != null) {
                    let startTimeSun = $scope.openingHours.sunStart.getHours() + ":" + $scope.openingHours.sunStart.getMinutes();
                    $scope.openingHours.sunStart = startTimeSun;
                    let endTimeSun = $scope.openingHours.sunEnd.getHours() + ":" + $scope.openingHours.sunEnd.getMinutes();
                    $scope.openingHours.sunEnd = endTimeSun;
                }
                */
                ApiService.post(BFNConstants.urls.addShopTimeTemplateHours, $scope.openingHours, addOpeningHoursSucceded, addOpeningHoursFailed);
                //ApiService.post(BFNConstants.urls.addShopOpeningHours, $scope.openingHours, addOpeningHoursSucceded, addOpeningHoursFailed);
            }
        };
        function addOpeningHoursSucceded(response) {
            $scope.addShop = {};
            $("#opening-hours").css("display", "none");
            $("#subscription-info").css("display", "block");
        }

        function addOpeningHoursFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Add opening hours section ends here *** */


        // Add Subscription Information
        $scope.addSubscriptionInfo = function () {
            debugger;
            $scope.shopSubscriptionInfo.Id = $scope.nextShop.Id;
            ApiService.post(BFNConstants.urls.saveShopSubscriptionInfo, $scope.shopSubscriptionInfo, addSubscriptionInfoSucceded, addSubscriptionInfoFailed);
        };
        function addSubscriptionInfoSucceded(response) {

            $scope.shopSubscriptionInfo = {};
            $("#subscription-info").css("display", "none");
            $("#delivery-info").css("display", "block");
        }
        function addSubscriptionInfoFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }


        //End of Subscription Information...

        /* *** Add Delivery Info section start here *** */
        $scope.addDeliveryInfoModel = {};
        $scope.addDeliveryInfo = function () {

            $scope.nextShop.ShopCodeLockInfo = $scope.addDeliveryInfoModel.ShopCodeLockInfo;
            $scope.nextShop.ShopInformation = $scope.addDeliveryInfoModel.ShopInformation;

            ApiService.post(BFNConstants.urls.saveShop, $scope.nextShop, addDeliveryInfoSucceded, addDeliveryInfoFailed);
        };
        function addDeliveryInfoSucceded(response) {

            $scope.addShop = {};
            $scope.nextShop.ShopId = response; //response.data;
            $("#delivery-info").css("display", "none");
            $("#admins").css("display", "block");
        }
        function addDeliveryInfoFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Shop Not Created Successfully.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        
        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        $scope.contactPersonTabOpen = function () {
            /*angular.element('#cpPart').css('pointer-events', 'fill');
            angular.element('#shopAdminPart').css('pointer-events', 'none');
            $timeout(function () {
                $("#cpPart").click();
            }, 0);
            */
            $("#admins").css("display", "none");
            $("#cp").css("display", "block");
        }
        /* *** Add Shop Admin ends here *** */

        /* *** Add Contact person starts here *** */

            $scope.newContactPerson = {};
            $scope.newShopContactPerson = {};
            $scope.addContactPerson = function () {
                ApiService.post(BFNConstants.urls.addContactPerson, $scope.newContactPerson, addContactPersonSucceded, addContactPersonFailed);
            };

            function addContactPersonSucceded(response) {
               
                $scope.newShopContactPerson = response.data;
                $scope.addShopContactPerson();
                //notificationService.displaySuccess('New contact person Created Successfully.');
                //$scope.newContactPerson = {};
            }
            function addContactPersonFailed(response) {
                console.log(response);
                if (response.status == '400') {
                    notificationService.displayError('Contact person Not Created Successfully.');
                    console.log(response.data);
                }
                else
                    console.log(response.statusText);
            }
            $scope.addShopContactPerson = function () {
   
                $scope.newShopContactPerson.ShopId = $scope.nextShop.Id;
                $scope.newShopContactPerson.ContactPersonId = $scope.newShopContactPerson.Id;
                ApiService.post(BFNConstants.urls.addShopContactPerson, $scope.newShopContactPerson, addShopContactPersonSucceded, addShopContactPersonFailed);
            }

            function addShopContactPersonSucceded(response) {
                $scope.newShopContactPerson = {};
                $scope.getShopContactperson();
            }

            function addShopContactPersonFailed(response) {
                //need to handle scenario if user session is expried and try to add chain.
                console.log(response);
                if (response.status == '400') {
                    notificationService.displayError(response.data.Message);
                    console.log(response.data);
                }
                else
                    console.log(response.statusText);
            }
            $scope.getShopContactperson = function () {
                ApiService.get(BFNConstants.urls.getShop + "?id=" + $scope.nextShop.Id, null, getContactPersonSucceded, getContactPersonFailed);

            };
            function getContactPersonSucceded(response) {

                $scope.newContactPerson = {};
                $scope.ShopContactPersons = response.data.ShopContactPersons;
                $("#addContactPerson").modal('hide');
            }
            function getContactPersonFailed(response) {
                //need to handle scenario if user session is expried and try to add chain.
                console.log(response);
                if (response.status == '400') {
                    notificationService.displayError(response.data.Message);
                    console.log(response.data);
                }
                else
                    console.log(response.statusText);
            }
        /* *** Add Contact person ends here *** */

        //Last button to save shop 

            $scope.btnSaveShop = function () {
                //window.location = "Home/viewShop/" + $scope.nextShop.Id;
                $location.url('/Home/viewShop/' + $scope.nextShop.Id);
                //if ($stateParams.chainId != null && $stateParams.chainId != undefined) {
                //    window.location = "Home/viewShop/" + $scope.nextShop.Id;
                //}
                //else {
                //    window.location = "Home/shop";
                //}
            }

        /* *** Verify correct name entered Start*** */
            $scope.getAllCompaniesNames = function () {
                var url = location.href;
                debugger;
                var id = url.substring(url.lastIndexOf('/') + 1);
                var val = url.substring(url.lastIndexOf('/') - 2);
                var apiUrl = "";
                if (id > 0 && val.indexOf("c") <= 0) {
                    apiUrl = "api/Company/getAllChainCompanies/?id=" + id;
                } else if (val.indexOf("c") > 0 && id > 0) {
                    apiUrl = "api/Company/getCompanyName/?id=" + id;
                } else {
                    apiUrl = "api/Company/getAllCompaniesNames";
                }
                ApiService.get(apiUrl,null, getAllCompaniesNamesSucceded, getAllCompaniesNamesFailed);
            };

            function getAllCompaniesNamesSucceded(response) {
                $scope.allCompanyNames = response.data;
                var options = {
                    data: response.data,
                    getValue: "CompanyName",
                    list: {
                        maxNumberOfElements: 12,
                        match: {
                            enabled: true
                        },
                        onSelectItemEvent: function () {
                            var value = $("#CompanyName").getSelectedItemData().Id;
                            $("#CompanyId").val(value).trigger("change");
                        }
                    }
                };
                $("#CompanyName").easyAutocomplete(options);
            }
            function getAllCompaniesNamesFailed(response) {
                console.log(response);
                if (response.status == '400') {
                    notificationService.displayError('Not able to save Shop Data.');
                    console.log(response.data);
                }
                else
                    console.log(response.statusText);
            }
        /* *** Verify correct name entered End*** */

        function validateTime(timeStr) {
            let valid = false;
            if (timeStr) {
                valid = (timeStr.search(/^\d{2}:\d{2}$/) != -1) &&
                                        (timeStr.substr(0, 2) >= 0 && timeStr.substr(0, 2) < 24) &&
                                        (timeStr.substr(3, 2) >= 0 && timeStr.substr(3, 2) <= 59);
            }
            return valid;
        }
        

        /* *** Get post code auto complete Start*** */
        $scope.getAllCityPostCodes = function () {
            debugger;
            let apiUrl = "api/CityPostCode/getAllCityPostCodes";
            ApiService.get(apiUrl, null, getAllCityPostCodesSucceded, getAllCityPostCodesFailed);
        };

        function getAllCityPostCodesSucceded(response) {
            $scope.allCityPostCodes = response.data;
            var options = {
                data: response.data,
                getValue: "PostNumber",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#chain-postal").getSelectedItemData().CityName;
                        $("#chain-city").val(value).trigger("change");
                    }
                }
            };
            $("#chain-postal").easyAutocomplete(options);
            var options2 = {
                data: response.data,
                getValue: "CityName",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#chain-city").getSelectedItemData().PostNumber;
                        $("#chain-postal").val(value).trigger("change");
                    }
                }
            };
            $("#chain-city").easyAutocomplete(options2);
        }
        function getAllCityPostCodesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Get post code auto complete End*** */
        
        /* *** Get Category auto complete Start*** */
        $scope.getAllCategories = function () {
            debugger;
            let apiUrl = "api/Category/getAllCategories";
            ApiService.get(apiUrl, null, getAllCategoriesSucceded, getAllCategoriesFailed);
        };

        function getAllCategoriesSucceded(response) {
            $scope.allCityPostCodes = response.data;
            var options = {
                data: response.data,
                getValue: "CategoryName",
                list: {
                    maxNumberOfElements: 12,
                    match: {
                        enabled: true
                    },
                    onSelectItemEvent: function () {
                        var value = $("#CategoryName").getSelectedItemData().Id;
                        $("#ShopFrellationsNummerCategoryId").val(value).trigger("change");
                    }
                }
            };
            $("#CategoryName").easyAutocomplete(options);
        }
        function getAllCategoriesFailed(response) {
            console.log(response);
            if (response.status == '400') {
                notificationService.displayError('Not able to save Shop Data.');
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }
        /* *** Get Category auto complete End*** */

        //.. end of save shop
    }

})(angular.module('Common.Core'));