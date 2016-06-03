(function () {
    'use strict';

    angular
        .module('app.account')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'account/account.html',
                        controller: 'Account',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();