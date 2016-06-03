(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.dashboard', {
                url: '/dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'dashboard/dashboard.html',
                        controller: 'Dashboard',
                        controllerAs: 'vm'
                    }
                }
            })
    }

})();