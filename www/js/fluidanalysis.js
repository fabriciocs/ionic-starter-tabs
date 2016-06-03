(function () {
    'use strict';

    angular.module('app', [
        'ionic',
        'app.core',
        'app.account',
        'app.auth',
        'app.dashboard',
        'app.layout',
        'app.notification',
        'app.sample',
        'app.setting'
    ]);
})();
(function () {
    'use strict';

    angular.module('app.account', []);
})();
(function () {
    'use strict';

    angular.module('app.auth', []);
})();
(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngCordova', 'ngDatabase',
            'blocks.exception'
        ]);

})();
(function () {
    'use strict';

    angular.module('app.dashboard', []);
})();
(function() {
    'use strict';

    angular.module('app.layout', [
        
    ]);
})();
(function () {
    'use strict';

    angular.module('app.notification', [

    ]);
})();
(function () {
    'use strict';

    angular.module('app.sample', [

    ]);
})();
(function () {
    'use strict';

    angular.module('app.setting', [

    ]);
})();
(function () {
    'use strict';

    angular.module('blocks.exception', []);
})();
(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('Account', Account);

    function Account() {
        var vm = this;

        vm.settings = {
            enableFriends: true
        };

    }
})();
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
                        templateUrl: 'account/tab-account.html',
                        controller: 'Account',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();
(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('Auth', Auth);

    Auth.$inject = ['$scope'];
    function Auth($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();
(function () {
    'use strict';

    angular.module('app.core')
        .config(Configure);

    Configure.$inject = ['$ionicConfigProvider', '$urlRouterProvider', 'ngdbProvider'];

    function Configure($ionicConfigProvider, $urlRouterProvider, ngdbProvider) {

        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.ios.backButton.text('Voltar');
        $ionicConfigProvider.backButton.previousTitleText(false);

        var chatsRepository = {
            id: 'ID',
            name: 'STRING',
            lastText: 'STRING',
            face: 'STRING'
        };

        ngdbProvider.setRepository('chats', chatsRepository)

        $urlRouterProvider.otherwise('/tab/dash');


    }

})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('API_URL', '')
        .constant('APP_VERSION', '1.2.8');
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception'];
    function dataservice($http, $location, $q, exception) {

        var isPrimed = false;
        var primePromise;

        var service = {
            getAvengersCast: getAvengersCast,
            getAvengerCount: getAvengerCount,
            getAvengers: getAvengers,
            ready: ready
        };

        return service;

        function getAvengers() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

            function getAvengersComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function getAvengerCount() {
            var count = 0;
            return getAvengersCast()
                .then(getAvengersCastComplete)
                .catch(exception.catcher('XHR Failed for getAvengerCount'));

            function getAvengersCastComplete(data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAvengersCast() {
            var cast = [
                { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man' },
                { name: 'Chris Hemsworth', character: 'Thor' },
                { name: 'Chris Evans', character: 'Steve Rogers / Captain America' },
                { name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk' },
                { name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow' },
                { name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye' },
                { name: 'Gwyneth Paltrow', character: 'Pepper Potts' },
                { name: 'Samuel L. Jackson', character: 'Nick Fury' },
                { name: 'Paul Bettany', character: 'Jarvis' },
                { name: 'Tom Hiddleston', character: 'Loki' },
                { name: 'Clark Gregg', character: 'Agent Phil Coulson' }
            ];
            return $q.when(cast);
        }

        function prime() {
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function () { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .run(Run);

    Run.$inject = ['$ionicPlatform'];

    function Run($ionicPlatform) {
        var service = {
            onReady: onReady
        }

        $ionicPlatform.ready(
            service.onReady()
        );

        return service;

        function onReady() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        }
    }
})();
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
                        templateUrl: 'dashboard/tab-dashboard.html',
                        controller: 'Dashboard',
                        controllerAs: 'vm'
                    }
                }
            })
    }

})();
(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard',Dashboard);

    function Dashboard() {
        var vm = this;

        activate();

        function activate() { }
    }
})();
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
(function() {
'use strict';

    angular
        .module('app.notification')
        .controller('Notification', Notification);

    Notification.$inject = ['$scope'];
    function Notification($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();
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
(function() {
'use strict';

    angular
        .module('app.sample')
        .controller('Sample', Sample);

    Sample.$inject = ['$scope'];
    function Sample($scope) {
        var vm = this;
      
        activate();

        function activate() { }
    }
})();
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
(function () {
    'use strict';

    angular
        .module('app.setting')
        .controller('Setting', Setting);

    Setting.$inject = ['$scope'];
    function Setting($scope) {
        var vm = this;

        activate();

        function activate() { }
    }
})();
(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);
        
    function exception() {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                console.error(message, reason);
            };
        }
    }
})();