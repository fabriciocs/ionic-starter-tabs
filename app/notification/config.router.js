(function () {
    'use strict';

    angular
        .module('app.notification')
        .config(Configure);

    Configure.$inject = ['$stateProvider'];

    function Configure($stateProvider) {
        $stateProvider
            .state('tab.settings-notification', {
                url: '/settings/notification',
                views: {
                    'tab-settings': {
                        templateUrl: 'notification/notification.html',
                        controller: 'Notification',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();