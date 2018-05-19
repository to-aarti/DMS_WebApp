/**
 * Upload Controller
 */

angular
    .module('RDash')
    .controller('UploadCtrl', ['$scope', 'Upload', '$http', UploadCtrl]);

function UploadCtrl($scope, Upload, $http) {
    $scope.pageTitle = 'Upload New File';
    $scope.uploadingFiles = [];
    $scope.sharedVar.pageTitle = 'Upload';
    $scope.sharedVar.showAddButton = false;
    $scope.selectedCategoryId = '';

    var CX_CONSTANTS = {
        QUEUED: 'queued',
        CANCELED: 'canceled',
        DONE: 'done',
        FAILED: 'failed',
        INVALID: 'invalid'
    };
    var processedFilesCount = 0, totalValidUploadingFilesCount = 0;

    getCategories();

    function getCategories(){
        $scope.isProcessing = true;
        $http.get('http://dms-test.ap-south-1.elasticbeanstalk.com/categories/category/').then(
            function(response){
                $scope.categories = response.data;
                $scope.isProcessing = false;
            },
            function(response){
                $scope.isProcessing = false;
            }
        );
    };

    $scope.onAllRequestComplete = function() {

        // When all files processed at backend, set the flags value
        if(processedFilesCount == totalValidUploadingFilesCount) {
            $scope.isProcessing = false;
            $scope.isfilesUploaded = true;
            $scope.isFilesUploading = false;
        }
    };

    $scope.removeFileFromQueue = function(file) {
        $scope.validationError = false;
        processedFilesCount += 1;
        file.status = CX_CONSTANTS.CANCELED;
        $scope.uploadingFiles.splice($scope.uploadingFiles.indexOf(file), 1);
        if(!$scope.uploadingFiles.length){
            $scope.isProcessing = false;
            $scope.isFilesUploading = false;
            $scope.isfilesUploaded = false;
        }
    };

    $scope.uploadFiles = function(files) {
        $scope.fileSaved = false;
        $scope.isfilesUploaded = false;
        $scope.errorFiles = [];// Invalid files that are removed at frontend itself
        $scope.uploadingFiles = $scope.uploadingFiles ? $scope.uploadingFiles : [];// Valid files that are going to be upload

        if (files && files.length) {
            $scope.noFileSelected = false;
            $scope.validationError = false;
            totalValidUploadingFilesCount = totalValidUploadingFilesCount + files.length;
            var url = 'http://dms-test.ap-south-1.elasticbeanstalk.com/documents/document/';

            files.forEach(function(file) {
                $scope.isProcessing = true;
                file.status = CX_CONSTANTS.QUEUED;
                file.progress = 0;
                $scope.uploadingFiles.push(file);

                var payLoad = {};
                payLoad['uploaded_file'] = file;

                if ($scope.selectedCategoryId != ''){
                    payLoad['category'] = $scope.selectedCategoryId;
                }

                file.upload = Upload.upload({
                    method: 'POST',
                    url: url,
                    data: payLoad
                });

                file.upload.then(
                    function (response) {
                        // On Success
                        if (file.status !== CX_CONSTANTS.CANCELED) {
                            processedFilesCount += 1;
                            file.status = CX_CONSTANTS.DONE;
                            file.url = response.data.uploaded_file;
                            file.temp_storage_id = response.data.id;
                            $scope.onAllRequestComplete();
                        }

                    }, function (response) {
                        // On Failure
                        if (file.status !== CX_CONSTANTS.CANCELED) {
                            processedFilesCount += 1;
                            if (response.status === 400) {
                                if (response.data.non_field_errors) {
                                    file.status = CX_CONSTANTS.FAILED;
                                } else {
                                    file.status = CX_CONSTANTS.INVALID;
                                    file.errorText = response.data.uploaded_file[0];
                                }
                                $scope.errorFiles.push(file);
                                $scope.uploadingFiles.splice($scope.uploadingFiles.indexOf(file), 1);
                                $scope.totalFilesAttached -= 1;
                            }
                            $scope.onAllRequestComplete();
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
            });
        }
    };

    $scope.saveCallback = function() {

        // Return if files are still uploading
        if($scope.isFilesUploading){
            $scope.isFilesUploading = true;
            $scope.pushAlert('File Uploading is in Progress.');
            return;
        }
        //Return if no file selected to upload
        if ($scope.uploadingFiles === undefined || $scope.uploadingFiles.length === 0) {
            $scope.noFileSelected = true;
            $scope.infoMsg = "No File Selected.";
            return;
        }

        // Else collect ids of file to be uploaded
        var file_ids_to_save = [], payLoad = {};
        angular.forEach($scope.uploadingFiles, function(file){
            if(file.status === CX_CONSTANTS.DONE){
                file_ids_to_save.push(file.temp_storage_id);
            }
        });
        payLoad.ids = file_ids_to_save;

        // Send request
        $http.patch('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/bulk-save/', payLoad).then(
            function(response){
                $scope.fileSaved = true;
                $scope.pushAlert('Files Uploaded Successfully.');
            },
            function(response){
                $scope.pushAlert('Oopsiee! Some error has occurred. Please try again later.');
            }
        );
    };

    $scope.cancelCallback = function() {
        $scope.uploadingFiles = [];
    };
}