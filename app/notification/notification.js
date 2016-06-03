(function () {
    'use strict';

    angular
        .module('app.notification')
        .controller('Notification', Notification);

    Notification.$inject = ['$scope'];
    function Notification($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();