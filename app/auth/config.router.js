(function () {
    'use strict';

    angular
        .module('app.account')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.account-auth', {
                url: '/account/auth',
                views: {
                    'tab-account': {
                        templateUrl: 'auth/auth.html',
                        controller: 'Auth',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();