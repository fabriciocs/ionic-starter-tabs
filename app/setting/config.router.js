(function () {
    'use strict';

    angular
        .module('app.setting')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.setting', {
                url: '/setting',
                views: {
                    'tab-setting': {
                        templateUrl: 'setting/tab-setting.html',
                        controller: 'Setting',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();