(function () {
    'use strict';

    angular
        .module('app.settings')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'settings/settings.html',
                        controller: 'Settings',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();