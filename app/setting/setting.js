(function () {
    'use strict';

    angular
        .module('app.setting')
        .controller('Setting', Setting);

    Setting.$inject = ['$scope'];
    function Setting($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();