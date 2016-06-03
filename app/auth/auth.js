(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('Auth', Auth);

    Auth.$inject = ['$scope'];
    function Auth($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();