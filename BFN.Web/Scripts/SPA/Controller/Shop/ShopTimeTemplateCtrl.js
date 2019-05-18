

(function (app) {
    'use strict';

    app.controller('ShopTimeTemplateCtrl', ShopTimeTemplateCtrl);

    ShopTimeTemplateCtrl.$inject = ['$scope', '$filter', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer', 'moment'];

    function ShopTimeTemplateCtrl($scope, $filter, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer, $moment) {


        /* **** **** */
        $.mask.definitions['a'] = "[0-2]";
        $.mask.definitions['b'] = "[0-9]";
        $.mask.definitions['c'] = "[0-5]";
        $.mask.definitions['d'] = "[0-9]";
        $(".timepicker").mask("ab:cd", { autoclear: false });
        /* **** **** */
        //Star to declare local Variables.

        $scope.newTimeTemplate = {};
        $scope.TemplateHeading = "";
        $scope.newTemplateHours = {};
        $scope.defaultTimeTemplate = {};
        $scope.defaultTimeTemplateHours = {};
        $scope.isHoliday = false;

        // End to declare local Variables..

        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Shop/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
        }
        else {
            $location.url('/');
        }

        function AuthorizationResultSucceded(response) {
            $scope.getShopTimeTemplates();
            
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

        /* *** Start Time Template Paging, Sorting & Filtering *** */

        $scope.SearchTemplateModel = {
            searchTimeTemplateName: "",
            searchTimeTemplateDesc: "",
            searchTimeTemplateStartDate: "",
            searchTimeTemplateEndDate: ""
        };

        $scope.shopTimeTemplatePagingInfo = {
            shopId: $scope.id,
            page: 1,
            itemsPerPage: BFNConstants.viewListingPaging,
            sortBy: "TemplateName",
            reverse: false,
            filterList: {},
            totalItems: 0
        };

        $scope.filterApplied = [];

        $scope.searchShopTimeTemplate = function (filterType) {
            switch (filterType) {
                case 1:
                    $scope.shopTimeTemplatePagingInfo.filterList["TemplateName"] = $scope.SearchModel.searchTimeTemplateName;
                    if ($scope.filterApplied.indexOf("TemplateName") === -1) {
                        $scope.filterApplied.push("TemplateName");
                    }
                    break;
                case 2:
                    $scope.shopTimeTemplatePagingInfo.filterList["TemplateDescription"] = $scope.SearchModel.searchTimeTemplateDesc;
                    if ($scope.filterApplied.indexOf("TemplateDescription") === -1) {
                        $scope.filterApplied.push("TemplateDescription");
                    }
                    break;

                case 3:
                    $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonNumber"] = $scope.SearchModel.searchContactPersonNumber;
                    if ($scope.filterApplied.indexOf("ContactPersonNumber") === -1) {
                        $scope.filterApplied.push("ContactPersonNumber");
                    }
                    break;
                case 4:
                    $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonEmail"] = $scope.SearchModel.searchContactPersonEmail;
                    if ($scope.filterApplied.indexOf("ContactPersonEmail") === -1) {
                        $scope.filterApplied.push("ContactPersonEmail");
                    }
                    break;
            }

            $scope.getShopTimeTemplates();
        };

        $scope.sortTimeTemplate = function (sortBy, reverse) {

            $scope.shopTimeTemplatePagingInfo.sortBy = sortBy;
            $scope.shopTimeTemplatePagingInfo.reverse = reverse;
            $scope.getShopTimeTemplates();

        };

        $scope.selectTimePage = function (page) {
            $scope.shopTimeTemplatePagingInfo.page = page;
            $scope.getShopTimeTemplates();
        };

        $scope.clearTimeTemplateSearch = function (serachType) {
            switch (serachType) {
                case 1:
                    {
                        $scope.SearchModel.searchContactPersonName = "";
                        $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonName"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonName");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopTimeTemplates();
                    }
                    break;
                case 2:
                    {
                        $scope.SearchModel.searchContactPersonAddress = "";
                        $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonAddress"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonAddress");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopTimeTemplates();
                    }
                    break;
                case 3:
                    {
                        $scope.SearchModel.searchContactPersonNumber = "";
                        $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonNumber"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonNumber");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopTimeTemplates();
                    }
                    break;
                case 4:
                    {
                        $scope.SearchModel.searchContactPersonEmail = "";
                        $scope.shopTimeTemplatePagingInfo.filterList["ContactPersonEmail"] = "";
                        var index = $scope.filterApplied.indexOf("ContactPersonEmail");
                        $scope.filterApplied.splice(index, 1);
                        $scope.getShopTimeTemplates();
                    }
                    break;

            }

        };

        function closeDropDown() {
            $(".show").each(function () {
                $(this).toggleClass("show");
            });
        }

        /* *** End Time Template Paging, Sorting & Filtering *** */


        // Start to get All Time Templates of Shop

        $scope.getShopTimeTemplates = function () {
            var qs = $httpParamSerializer($scope.shopTimeTemplatePagingInfo);
            ApiService.get(BFNConstants.urls.getShopTimeTemplates + "?" + qs + "&id=" + $scope.id, null, getShopTimeTemplatesSucceded, requestFailed);
        }

        function getShopTimeTemplatesSucceded(response) {
            $scope.GetShopTimeTemplateAndHours();
            $scope.viewTimeTemplate = {};
            closeDropDown();
            $scope.viewTimeTemplate = response.data.ShopTimeTemplates;
            $scope.shopTimeTemplatePagingInfo.totalItems = response.data.TotalRecords;
            $scope.shopTimeTemplatePagingInfo.startPageRecordNumber = response.data.StartPageRecordNumber + 1;
            $scope.shopTimeTemplatePagingInfo.endPageRecordNumber = response.data.EndPageRecordNumber;
        }

        //End to get all time templates of shop...


        //Start to save New Time Template of Shop

        $scope.setTemplateHeading = function () {
            $scope.TemplateHeading = "Add Shop Time Template";
            $scope.newTimeTemplate = {};
            $scope.openingHours = {};
            $scope.checked_mon = false;
            $scope.checked_tue = false;
            $scope.checked_wed = false;
            $scope.checked_thu = false;
            $scope.checked_fri = false;
            $scope.checked_sat = false;
            $scope.checked_sun = false;
            $scope.getDefaultShopTimeTemplate();

            $(".timepicker").mask("ab:cd", { autoclear: false });
        }

        $scope.addShopTimeTemplate = function () {
            debugger;

            if ($scope.newTimeTemplate.TemplateDateFrom > $scope.newTimeTemplate.TemplateDateTo) {
                notificationService.displayError('Start date must be less than end date.');
            }
            else if (($scope.openingHours.monStart && !$scope.openingHours.monEnd) ||
                (!$scope.openingHours.monStart && $scope.openingHours.monEnd)) {
                notificationService.displayError('Please enter Monday missing Start/End time.');
            }
            else if ($scope.openingHours.monStart && !validateTime($scope.openingHours.monStart)) {
                notificationService.displayError('Please enter valid Time for Monday start.');
            }
            else if ($scope.openingHours.monEnd && !validateTime($scope.openingHours.monEnd)) {
                notificationService.displayError('Please enter valid Time for Monday end.');
            }
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.monStart && $scope.openingHours.monStart >= $scope.openingHours.monEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.tueStart && $scope.openingHours.tueStart >= $scope.openingHours.tueEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.wedStart && $scope.openingHours.wedStart >= $scope.openingHours.wedEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.thuStart && $scope.openingHours.thuStart >= $scope.openingHours.thuEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.friStart && $scope.openingHours.friStart >= $scope.openingHours.friEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.satStart && $scope.openingHours.satStart >= $scope.openingHours.satEnd) {
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
            else if (!$scope.newTimeTemplate.IsHoliday && $scope.openingHours.sunStart && $scope.openingHours.sunStart >= $scope.openingHours.sunEnd) {
                notificationService.displayError('Sunday start hours should be less than end time.');
            }
            else {
                $scope.newTimeTemplate.LastUpdatedDate = $scope.newTimeTemplate.CreatedDate = BFNConstants.getDateTime();
                $scope.newTimeTemplate.ShopId = $scope.id;
                $scope.newTimeTemplate.IsActive = true;
                if ($scope.newTimeTemplate.Id) {
                    $scope.newTimeTemplate.LastUpdatedBy = $cookies.get('userIdBFN');
                    $scope.newTimeTemplate.TemplateDateFrom = moment($scope.newTimeTemplate.TemplateDateFrom).format("MM/DD/YYYY HH:mm");
                    $scope.newTimeTemplate.TemplateDateTo = moment($scope.newTimeTemplate.TemplateDateTo).format("MM/DD/YYYY HH:mm");
                    ApiService.post(BFNConstants.urls.updateShopTimeTemplates, $scope.newTimeTemplate, updateShopTimeTemplatesSucceded, requestFailed);
                }
                else {
                    $scope.newTimeTemplate.IsDefault = false;
                    $scope.newTimeTemplate.CreatedBy = $cookies.get('userIdBFN');
                    $scope.newTimeTemplate.LastUpdatedBy = $cookies.get('userIdBFN');
                    $scope.newTimeTemplate.TemplateDateFrom = moment($scope.newTimeTemplate.TemplateDateFrom).format("MM/DD/YYYY HH:mm");
                    $scope.newTimeTemplate.TemplateDateTo = moment($scope.newTimeTemplate.TemplateDateTo).format("MM/DD/YYYY HH:mm");
                    ApiService.post(BFNConstants.urls.addShopTimeTemplates, $scope.newTimeTemplate, addShopTimeTemplatesSucceded, requestFailed);
                }
            }
            
        }


        function addShopTimeTemplatesSucceded(response) {            
            $scope.templateId = response.data.Id;

            $scope.checked_mon = false;
            $scope.checked_tue = false;
            $scope.checked_wed = false;
            $scope.checked_thu = false;
            $scope.checked_fri = false;
            $scope.checked_sat = false;
            $scope.checked_sun = false;
            if (!$scope.newTimeTemplate.IsHoliday) {
                $scope.newTimeTemplate = {};
                $scope.addOpenHours();
            }
            else {
                $("#addShopTimeTemplate").modal('hide');
                $scope.openingHours = {};
                $scope.getShopTimeTemplates();
            }
           
        }

        function updateShopTimeTemplatesSucceded(response) {
            $scope.templateId = response.data.Id;
            if (!$scope.newTimeTemplate.IsHoliday) {
                $scope.newTimeTemplate = {};
                $scope.addOpenHours();
            }
            else {
                $("#addShopTimeTemplate").modal('hide');
                $scope.openingHours = {};
                $scope.getShopTimeTemplates();
            }
        }



        //End to Save New Time Template of Shop...


        //Request Failed Function

        function requestFailed(response) {
            console.log(response);
            $scope.checked_mon = false;
            $scope.checked_tue = false;
            $scope.checked_wed = false;
            $scope.checked_thu = false;
            $scope.checked_fri = false;
            $scope.checked_sat = false;
            $scope.checked_sun = false;
            if (response.status == '400') {
                notificationService.displayError(response.data.Message);
                console.log(response.data);
            }
            else
                console.log(response.statusText);
        }

        // end of Request function failed


        /* *** Add opening hours section start here *** */
        $scope.openingHours = {};
        $scope.addOpenHours = function () {
            debugger;
            $scope.openingHours.templateId = $scope.templateId;
            $scope.openingHours.CreatedBy = $cookies.get('userIdBFN');
            $scope.openingHours.LastUpdatedBy = $cookies.get('userIdBFN');
            /*if ($scope.openingHours.monStart != null) {
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
            }*/
            ApiService.post(BFNConstants.urls.addShopTimeTemplateHours, $scope.openingHours, addOpeningHoursSucceded, addOpeningHoursFailed);
        };
        function addOpeningHoursSucceded(response) {
            $("#addShopTimeTemplate").modal('hide');
            $scope.openingHours = {};
            $scope.getShopTimeTemplates();

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

        //Active/Deactive Time Template start 

        // Update Opening Hours

        $scope.updateOpenHours = function () {

            $scope.openingHours.templateId = $scope.templateId;
            $scope.openingHours.LastUpdatedBy = $cookies.get('userIdBFN');
            if ($scope.openingHours.monStart != null) {
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
            ApiService.post(BFNConstants.urls.updateShopTimeTemplateHours, $scope.openingHours, addOpeningHoursSucceded, addOpeningHoursFailed);
        };


        // End of Opening Hours...


        $scope.deactiveShopTimeTemplate = function (id) {
            ApiService.get(BFNConstants.urls.delShopTimeTemplates + "?id=" + id, null, $scope.getShopTimeTemplates, requestFailed);
        }


        $scope.activeShopTimeTemplate = function (id) {
            ApiService.get(BFNConstants.urls.actShopTimeTemplates + "?id=" + id, null, $scope.getShopTimeTemplates, requestFailed);
        }

        //.. Activate/Deactivate Time Template End..


        // Start to view and edit Time Template

        $scope.viewShopTimeTemplate = function (id) {
            ApiService.get(BFNConstants.urls.getTimeTemplate + "?id=" + id, null, viewShopTimeTemplateSucceed, requestFailed);
        }

        function viewShopTimeTemplateSucceed(response) {
            $scope.TemplateHeading = "Edit Shop Time Template";
            $scope.newTimeTemplate = response.data.TimeTemplate;
            $scope.newTimeTemplate.TemplateDateFrom = new Date($scope.newTimeTemplate.TemplateDateFrom);
            $scope.newTimeTemplate.TemplateDateTo = new Date($scope.newTimeTemplate.TemplateDateTo);
            $scope.newTemplateHours = response.data.TemplateHours;
            SetTemplateHours($scope.newTemplateHours);
            $(".timepicker").mask("ab:cd", { autoclear: false });
            $timeout(function () {
                $("#edit-shop-template").click();
            }, 0);
        }

        function SetTemplateHours(TemplateHours) {
            for (let i = 0; i < TemplateHours.length; i++) {
                /*if (TemplateHours[i].Day == "Monday") {
                    $scope.checked_mon = true;
                    $scope.openingHours.monStart = new Date (new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.monEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Tuesday") {
                    $scope.checked_tue = true;
                    $scope.openingHours.tueStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.tueEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Wednesday") {
                    $scope.checked_wed = true;
                    $scope.openingHours.wedStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.wedEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Thursday") {
                    $scope.checked_thu = true;
                    $scope.openingHours.thuStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.thuEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Friday") {
                    $scope.checked_fri = true;
                    $scope.openingHours.friStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.friEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.openingHours.satStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.satEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Sunday") {
                    $scope.checked_sun = true;
                    $scope.openingHours.sunStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.sunEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }*/
                if (TemplateHours[i].Day == "Monday") {
                    $scope.openingHours.monStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.monEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Tuesday") {
                    $scope.openingHours.tueStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.tueEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Wednesday") {
                    $scope.openingHours.wedStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.wedEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Thursday") {
                    $scope.openingHours.thuStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.thuEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Friday") {
                    $scope.openingHours.friStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.friEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.openingHours.satStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.satEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Sunday") {
                    $scope.openingHours.sunStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.sunEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
            }

        }

        // End to View and Edit Time Template...

        //Default time Template View
        $scope.GetShopTimeTemplateAndHours = function () {
            ApiService.get(BFNConstants.urls.getDefaultTimeTemplate + "?shopid=" + $scope.id, null, defaultShopTimeTemplateSucceed, requestFailed);
        }

        function defaultShopTimeTemplateSucceed(response) {
            debugger;
            let locale = "en-us";
            $scope.defaultTimeTemplate = response.data.TimeTemplate;
            $scope.defaultTimeTemplate.TemplateDateFrom = new Date($scope.defaultTimeTemplate.TemplateDateFrom).getDate() +" "+ new Date($scope.defaultTimeTemplate.TemplateDateFrom).toLocaleString(locale, { month: "long" });
            
            $scope.defaultTimeTemplate.TemplateDateTo = new Date($scope.defaultTimeTemplate.TemplateDateTo).getDate() + " " + new Date($scope.defaultTimeTemplate.TemplateDateTo).toLocaleString(locale, { month: "long" });
            $scope.defaultTimeTemplateHours = response.data.TemplateHours;
            SetDeafultTemplateHours($scope.defaultTimeTemplateHours);
        }


        function SetDeafultTemplateHours(TemplateHours) {
            debugger;
            for (let i = 0; i < TemplateHours.length; i++) {
                if (TemplateHours[i].Day == "Monday") {
                    $scope.defaultTimeTemplateHours.monStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.monEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Tuesday") {
                    $scope.defaultTimeTemplateHours.tueStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.tueEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Wednesday") {
                    $scope.defaultTimeTemplateHours.wedStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.wedEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Thursday") {
                    $scope.defaultTimeTemplateHours.thuStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.thuEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Friday") {
                    $scope.defaultTimeTemplateHours.friStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.friEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.defaultTimeTemplateHours.satStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.satEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Sunday") {
                    $scope.defaultTimeTemplateHours.sunStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.defaultTimeTemplateHours.sunEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
            }

        }
        $scope.closeTemplate = function () {
            $scope.checked_mon = false;
            $scope.checked_tue = false;
            $scope.checked_wed = false;
            $scope.checked_thu = false;
            $scope.checked_fri = false;
            $scope.checked_sat = false;
            $scope.checked_sun = false;
        }

        //End to view Default Time Template

        // Star to show/Hide Hours Template

        //$scope.onHoliday = function () {
        //    debugger;
        //    if ($scope.isHoliday == false) {
        //        $scope.isHoliday = true;
        //        newTimeTemplate.IsHoliday = true;
        //    } else {
        //        $scope.isHoliday = false;
        //        newTimeTemplate.IsHoliday = false;
        //    }
        //}

        //End to show/Hide Hours Template

        // Default time Template Fill start
        $scope.getDefaultShopTimeTemplate = {};
        $scope.getDefaultShopTimeTemplate = function () {
            ApiService.get(BFNConstants.urls.getDefaultShopTimeTemplate + "?shopid=" + $scope.id, null, getDefaultShopTimeTemplateSucceed, requestFailed);
        }

        function getDefaultShopTimeTemplateSucceed(response) {

            //$scope.defaultTimeTemplateHours = response.data.TemplateHours;
            SetDeafultShopTemplateHours(response.data.TemplateHours);
        }
        function SetDeafultShopTemplateHours(TemplateHours) {
            for (let i = 0; i < TemplateHours.length; i++) {
                /*if (TemplateHours[i].Day == "Monday") {

                    $scope.openingHours.monStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.monEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Tuesday") {

                    $scope.openingHours.tueStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.tueEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Wednesday") {

                    $scope.openingHours.wedStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.wedEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Thursday") {

                    $scope.openingHours.thuStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.thuEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Friday") {

                    $scope.openingHours.friStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.friEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.openingHours.satStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.satEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }
                else if (TemplateHours[i].Day == "Sunday") {

                    $scope.openingHours.sunStart = new Date(new Date().toDateString() + ' ' + TemplateHours[i].OpenTime);/// $filter('date')(new Date(TemplateHours[i].OpenTime), 'HH:mm');
                    $scope.openingHours.sunEnd = new Date(new Date().toDateString() + ' ' + TemplateHours[i].CloseTime);
                }*/

                if (TemplateHours[i].Day == "Monday") {
                    $scope.openingHours.monStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.monEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Tuesday") {
                    $scope.openingHours.tueStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.tueEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Wednesday") {
                    $scope.openingHours.wedStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.wedEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Thursday") {
                    $scope.openingHours.thuStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.thuEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Friday") {
                    $scope.openingHours.friStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.friEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Saturday") {
                    $scope.checked_sat = true;
                    $scope.openingHours.satStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.satEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
                else if (TemplateHours[i].Day == "Sunday") {
                    $scope.openingHours.sunStart = TemplateHours[i].OpenTimeHours + ":" + TemplateHours[i].OpenTimeMins;
                    $scope.openingHours.sunEnd = TemplateHours[i].CloseTimeHours + ":" + TemplateHours[i].CloseTimeMins;
                }
            }

        }

        function validateTime(timeStr)
        {
            let valid = false;
            if (timeStr)
            {
                valid = (timeStr.search(/^\d{2}:\d{2}$/) != -1) &&
                                        (timeStr.substr(0, 2) >= 0 && timeStr.substr(0, 2) < 24) &&
                                        (timeStr.substr(3, 2) >= 0 && timeStr.substr(3, 2) <= 59);
            }
            return valid;
        }


        //End to Fill Default Time Template
    }

})(angular.module('Common.Core'));