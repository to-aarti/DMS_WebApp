(function(){
    'use strict';

    angular.module('RDash').filter('formattedDateTime', function() {
        return function(value) {
            if (value){
                return moment.utc(value, "YYYY-MM-DDThh:mm:ss").local().format("h:mm a, Do MMMM, YYYY");
            }
            return '';
        };
    });

    angular.module('RDash').filter('formattedSize', function() {
        return function(sizeInByte, defaultValue) {
            if(sizeInByte){
                if (sizeInByte/1024 < 1024) {
                    return Math.round(sizeInByte / 1024 * 100) / 100 + 'KB';
                } else {
                    return Math.round(sizeInByte / (1024 * 1024)  * 100) / 100 + 'MB';
                }
            }
            return defaultValue;
        };
    });

})();
