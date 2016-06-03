(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);
        
    function exception() {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                console.error(message, reason);
            };
        }
    }
})();