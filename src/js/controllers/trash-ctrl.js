/**
 * Master Controller
 */

angular.module('RDash')
    .controller('TrashCtrl', ['$scope', '$http', TrashCtrl]);

function TrashCtrl($scope, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.pageTitle = 'Deleted Documents';
    $scope.sharedVar.pageTitle = 'Trash';
    $scope.sharedVar.hideSecondHeader = false;
    $scope.sharedVar.hideFilters = false;
    $scope.sharedVar.showAddButton = false;
    $scope.isProcessing = true;
    $scope.allDocuments = [];

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

    getTrash();


    function getTrash(){
        $scope.isProcessing = true;
        var url = 'http://dms-test.ap-south-1.elasticbeanstalk.com/documents/trash', queryParams = '';
        if ($scope.filters.searchText){
            queryParams = queryParams + 'file_name=' + $scope.filters.searchText + '&' ;
        }
        if ($scope.filters.category){
            queryParams = queryParams + 'category=' + $scope.filters.category + '&' ;
        }
        if ($scope.filters.file_type){
            queryParams = queryParams + 'file_type=' + $scope.filters.file_type ;
        }

        if (queryParams !== ''){
            url = url + '?' + queryParams;
        }

        $http.get(url).then(
            function(response){
                $scope.allDocuments = response.data;
                $scope.isProcessing = false;
            },
            function(response){
                $scope.isProcessing = false;
            }
        );
    }

    $scope.sharedVar.applySearch = function(){
        getTrash();
    };

    $scope.deleteDocument = function(index, id){
        $http.delete('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/trash/:id'.replace(':id', id)).then(
            function(){
                $scope.allDocuments.splice(index, 1);
                $scope.isProcessing = false;
                $scope.pushAlert('Document deleted permanently.', 'success');
            },
            function(){
                $scope.isProcessing = false;
            }
        );
    };

    $scope.restoreDocument = function(index, id){
        $http.patch('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/trash/:id'.replace(':id', id), {active: true}).then(
            function(){
                $scope.allDocuments.splice(index, 1);
                $scope.isProcessing = false;
                $scope.pushAlert('Document restored successfully.', 'success');
            },
            function(){
                $scope.pushAlert('Oopsie!  Some error has occured.', 'danger');
                $scope.isProcessing = false;
            }
        );
    };
}