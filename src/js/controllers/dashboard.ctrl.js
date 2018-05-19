/**
 * Master Controller
 */

angular.module('RDash')
    .controller('DashboardCtrl', ['$scope', '$http', '$state', DashboardCtrl]);

function DashboardCtrl($scope, $http, $state) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.isProcessing = false;
    $scope.isFilterApplied = false;
    $scope.sharedVar.showAddButton = true;
    $scope.sharedVar.showFilters = true;
    $scope.listText = 'All Documents';
    $scope.sharedVar.addButton = 'New Document';
    $scope.sharedVar.pageTitle = 'Dashboard';
    $scope.sharedVar.hideSecondHeader = false;
    $scope.sharedVar.hideFilters = false;
    $scope.isProcessing = true;
    $scope.allDocuments = [];

    $scope.sharedVar.addNew = function(){
        $state.go('upload');
    };

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

    getAllFiles();


    function getAllFiles(){
        $scope.isProcessing = true;
        var url = 'http://dms-test.ap-south-1.elasticbeanstalk.com/documents/document/', queryParams = '';
        if ($scope.filters.searchText){
            queryParams = queryParams + 'file_name=' + $scope.filters.searchText + '&';
        }
        if ($scope.filters.category){
            queryParams = queryParams + 'category=' + $scope.filters.category + '&';
        }
        if ($scope.filters.file_type){
            queryParams = queryParams + 'file_type=' + $scope.filters.file_type ;
        }

        if (queryParams !== ''){
            $scope.isFilterApplied = true;
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
        console.log($scope.filters.searchText);
        getAllFiles();
    };

    $scope.deleteDocument = function(index, id){
        $http.delete('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/document/:id'.replace(':id', id)).then(
            function(response){
                $scope.allDocuments.splice(index, 1);
                $scope.pushAlert('Document moved to trash.');
            },
            function(response){
            }
        );
    };
    function getCategoryId(name){
        var categoryId = '';
        angular.forEach($scope.categories, function(cat){
            if (cat.name === name){
                categoryId =  cat.id;
            }
        });
        return categoryId;
    }

    $scope.updateDocument = function(doc){
        $http.patch('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/document/:id'.replace(':id', doc.id), {category: getCategoryId($scope.selectedDoc.category)}).then(
            function(){
                $scope.isProcessing = false;
                doc.category = $scope.selectedDoc.category;
                $scope.pushAlert('Category updated successfully.', 'success');
                $scope.cancel();
            },
            function(){
                $scope.pushAlert('Oopsie! Some error has occurred.', 'success');
                $scope.isProcessing = false;
            }
        );
    };

    $scope.openPanel = function(index, doc){
        $scope.selectedDoc = {
            category: doc.category ? doc.category : ''
        };
        $scope.originalDoc = doc;
        $scope.openPanelForm = true;
    };

    $scope.cancel = function(){
        $scope.selectedDoc = null;
        $scope.openPanelForm = false;
    }


}