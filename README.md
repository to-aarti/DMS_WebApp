# Webapp_DMS
Document Management System

### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

### Installation
1. Clone the repository: `git clone https://github.com/aarti-gupta/Webapp_DMS.git`
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on [http://localhost:8888](http://localhost:8888).

### App flow

1. There are four main parts of the App.
    * Dashboard
        * Upload New Documents
        * Apply Search and Filters
        * Change or Assign Category of a Document
        * Download, Delete Operation
    * Categories
        * Create, Update, Delete Operation
    * Un-classified Documents
        * Assign category to a Document
        * Download, Delete Operations
    * Trash
        * Restore
        * Download
        * Permanent Delete
        * Apply Search and Filters

2. Images

* Dashboard - All Uploaded Documents List Page.

![Dashboard](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Dashboard_1.png)

* On clicking "New Document" button on Dashboard List page, you will redirect to this page. Here you can upload new Documents.

![Upload Document](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Upload-document_1(a).png)

* On clicking "Edit" Icon on a document on Dashboard List Page, you will redirect to this page. Here you can change/assign category of a document.

![Change Category](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Change-category-to-existing-doc_1(b).png)

* Categories List Page

![Categories](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Category_2.png)

* On clicking "Add Category" button on Categories list Page, you will redirect her. Here you can crete a new category.

![Add New Category](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Add-new-category_2(a).png)

* On clicking "Edit" Icon on a category on Categories List Pagee, you will redirect her. Here you can edit a new category.

![Edit Category](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Edit-category_2(b).png)

* On clicking "Edit" Icon on a category on Unclassified List Pagee, you will redirect her. Here you can assign category to the documents which are not yet classified.

![Assign Category](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Assign-category-to-un-classified-doc.png)

* ### Trash List Page You can perform Restore, Permanent Delete, Download actions here.

![Trash](https://github.com/aarti-gupta/Webapp_DMS/blob/master/src/img/Trash.png)

