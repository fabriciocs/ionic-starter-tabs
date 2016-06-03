(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    Settings.$inject = ['$scope'];
    function Settings($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();