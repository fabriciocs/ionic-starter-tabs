(function () {
    'use strict';

    angular
        .module('app.avengers')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.avengers', {
                url: '/avengers',
                views: {
                    'tab-avengers': {
                        templateUrl: 'avengers/avengers.html',
                        controller: 'Avengers',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();