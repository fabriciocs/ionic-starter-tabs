(function () {
    'use strict';

    angular
        .module('app.sample')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider

            .state('tab.sample', {
                url: '/sample',
                views: {
                    'tab-sample': {
                        templateUrl: 'sample/tab-sample.html',
                        controller: 'Sample',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();