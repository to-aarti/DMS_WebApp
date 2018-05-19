/**
 * Master Controller
 */

angular.module('RDash')
    .controller('UnClassifiedCtrl', ['$scope', '$http', UnClassifiedCtrl]);

function UnClassifiedCtrl($scope, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.sharedVar.pageTitle = 'UnClassified Documents';
    $scope.sharedVar.hideFilters = true;
    $scope.sharedVar.hideSecondHeader = true;
    $scope.isProcessing = true;
    $scope.allDocuments = [];
    $scope.openPanelForm = false;

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

    getUnClassifiedDocuments();

    function getUnClassifiedDocuments(){
        $scope.isProcessing = true;
        $http.get('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/un-classified').then(
            function(response){
                $scope.allDocuments = response.data;
                $scope.isProcessing = false;
            },
            function(response){
                $scope.isProcessing = false;
            }
        );
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

    $scope.updateDocument = function(doc){
        $http.patch('http://dms-test.ap-south-1.elasticbeanstalk.com/documents/document/:id'.replace(':id', doc.id), {category: doc.category}).then(
            function(){
                $scope.isProcessing = false;
                $scope.allDocuments.splice($scope.index, 1);
                $scope.index = null;
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
        $scope.selectedDoc = doc;
        $scope.index = index;
        $scope.openPanelForm = true;
    };

    $scope.cancel = function(){
        $scope.selectedDoc = null;
        $scope.openPanelForm = false;
    }
}