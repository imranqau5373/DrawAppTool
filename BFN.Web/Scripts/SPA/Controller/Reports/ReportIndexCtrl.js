

(function (app) {
    'use strict';

    app.controller('ReportIndexCtrl', ReportIndexCtrl);

    ReportIndexCtrl.$inject = ['$scope', '$parse', '$cookies', '$timeout', '$location', '$routeParams', '$rootScope', 'ApiService', 'notificationService', '$stateParams', '$httpParamSerializer', '$http'];

    function ReportIndexCtrl($scope, $parse, $cookies, $timeout, $location, $routeParams, $rootScope, ApiService, notificationService, $stateParams, $httpParamSerializer, $http) {
        $scope.report = {};
        debugger;
        $scope.typeOptions = [
            { name: 'Today', value: 'Today' },
            { name: 'Yesterday', value: 'Yesterday' },
            { name: 'Last 7 days', value: 'Last 7 days' },
            { name: 'Last 30 days', value: 'Last 30 days' },
            { name: 'Custom period', value: 'Custom period' }
        ];

        $scope.eventTypes = [
            { name: 'Creation', text: 'Creation notifications', selected: true },
            { name: 'Change', text: 'Update/change notifications', selected: true },
            { name: 'Holiday', text: ' Holiday notifications', selected: true },
            { name: 'Ownership', text: 'Ownership notifications', selected: true },
            { name: 'Reopening', text: 'Reopening notifications', selected: true },
            { name: 'Removal', text: 'Removal notifications', selected: true },
            
        ];

        $scope.report.eventTypes = $scope.eventTypes;

        $scope.report.selectedOption = { type: $scope.typeOptions[0].value };
        $scope.generateReport = function () {
            debugger;
            $scope.report.SelectedEvents = [];
            for (var i = 0; i < $scope.eventTypes.length; i++) {
                if ($scope.eventTypes[i].selected) {
                    $scope.report.SelectedEvents.push($scope.eventTypes[i].name);
                }
            }
            if ($scope.report.selectedOption == 'Custom period') {
                if (new Date($scope.report.startDate) > new Date($scope.report.endDate)) {
                    notificationService.displayError('Start date must be less than end date.');
                }
                else {
                    $scope.report.startDate = $scope.report.startDate == null ? null : moment($scope.report.startDate).format("MM/DD/YYYY HH:mm");
                    $scope.report.endDate = $scope.report.endDate == null ? null : moment($scope.report.endDate).format("MM/DD/YYYY HH:mm");
                    generateExcelReports();
                }
               
            } else {
                if ($scope.report.selectedOption == undefined) {
                    notificationService.displayError('Please select the option.');
                }
                else if ($scope.report.selectedOption.type) {
                    notificationService.displayError('Please select the option.');
              
                }
                else {
                    generateExcelReports();
                }
            }
           
            
        }

        function generateExcelReports() {
            $http.post(BFNConstants.urls.generateReport, $scope.report, { responseType: 'arraybuffer' })
                .success(function (data, status, headers) {
                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || 'Report.xlsx';

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try {
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], { type: contentType });
                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch (ex) {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], { type: contentType });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], { type: octetStreamMime });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }
            })
                .error(function (data, status) {
                console.log("Request failed with status: " + status);

                // Optionally write the error out to scope
                $scope.errorDetails = "Request failed with status: " + status;
            });
        }

        $scope.changeOption = function () {
            $('#startDate').val('dd/mm/yyyy');
            $('#endDate').val('dd/mm/yyyy')
        }







        //Authoriaztion Start

        if ($cookies.get('token') != null) {
            ApiService.get('/api/Reports/IsAuthorized', null, AuthorizationResultSucceded, RequestFailed)
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