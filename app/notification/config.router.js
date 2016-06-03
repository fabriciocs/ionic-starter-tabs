(function () {
    'use strict';

    angular
        .module('app.notification')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.notification', {
                url: '/notification',
                views: {
                    'tab-notification': {
                        templateUrl: 'notification/tab-notification.html',
                        controller: 'Notification',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();