(function () {
    'use strict';

    angular
        .module('app.layout')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'layout/tabs.html'
            })
    }

})();