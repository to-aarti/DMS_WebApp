'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html'
            })
            .state('upload', {
                url: '/upload',
                templateUrl: 'templates/upload-page.html'
            })
            .state('unclassified', {
                url: '/unclassified-documents',
                templateUrl: 'templates/unclassified-documents.html'
            })
            .state('trash', {
                url: '/trash',
                templateUrl: 'templates/trash.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html'
            })
            .state('add-category', {
                url: '/add-category',
                templateUrl: 'templates/add-category.html'
            })
            .state('edit-category', {
                url: '/edit-category/:id',
                templateUrl: 'templates/add-category.html',
                params: {
                    category: null
                }
            })
    }
]);