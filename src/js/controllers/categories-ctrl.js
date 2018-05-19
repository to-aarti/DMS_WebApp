/**
 * Master Controller
 */

angular.module('RDash')
    .controller('CategoryCtrl', ['$scope', '$state', '$http',  CategoryCtrl]);

function CategoryCtrl($scope, $state, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.sharedVar.addButton = 'New Category';
    $scope.sharedVar.pageTitle = 'Categories';
    $scope.sharedVar.showAddButton = true;
    $scope.sharedVar.hideFilters = true;
    $scope.sharedVar.hideSecondHeader = false;
    $scope.isProcessing = true;
    $scope.categories = [];

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

    $scope.sharedVar.addNew = function(){
        $state.go('add-category');
    };

    $scope.editCategory = function(category){
        $state.go('edit-category', {category: category, id: category.id});
    };

    $scope.deleteCategory = function(index, id){
        $http.delete('http://dms-test.ap-south-1.elasticbeanstalk.com/categories/category/:id'.replace(':id', id)).then(
            function(){
                $scope.categories.splice(index, 1);
                $scope.isProcessing = false;
                $scope.pushAlert('Category deleted successfully.');
            },
            function(){
                $scope.isProcessing = false;
            }
        );
    };



}