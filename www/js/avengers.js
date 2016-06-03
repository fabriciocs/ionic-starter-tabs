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
        'app.avengers',
        'app.settings'
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

    angular.module('app.avengers', []);
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

    angular.module('app.layout', []);
})();
(function () {
    'use strict';

    angular.module('app.settings', []);
})();
(function () {
    'use strict';

    angular.module('app.notification', []);
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

        activate();

        function activate() { }
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
                        templateUrl: 'account/account.html',
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
(function() {
'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    Avengers.$inject = ['dataservice'];
    function Avengers(dataservice) {
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers';
      
        activate();

        function activate() {
            return getAvengers().then(function() {
                console.info('Activated Avengers View');
            });
        }
        
        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
        
    }
})();
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
(function () {
    'use strict';

    angular.module('app.core')
        .config(Configure);

    Configure.$inject = ['$ionicConfigProvider', '$urlRouterProvider', 'ngdbProvider'];

    function Configure($ionicConfigProvider, $urlRouterProvider, ngdbProvider) {

        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.ios.backButton.text('Voltar');
        $ionicConfigProvider.backButton.previousTitleText(false);

        var avengersCastRepository = {
            id: 'ID',
            name: 'STRING',
            character: 'STRING'
        };

        ngdbProvider.setRepository('avengers', avengersCastRepository)

        $urlRouterProvider.otherwise('/tab/dashboard');


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

    dataservice.$inject = ['$http', '$state', '$q', 'exception'];
    function dataservice($http, $state, $q, exception) {

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
            return $http.get('avengers.json')
                .then(getAvengersComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $state.go('/tab/dashboard');
                });

            function getAvengersComplete(results, status, headers, config) {
                return results.data.cast;
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
                        templateUrl: 'dashboard/dashboard.html',
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
        .controller('Dashboard', Dashboard);
    
    Dashboard.$inject = ['$q', 'dataservice'];
    function Dashboard($q, dataservice) {
        var vm = this;
        
        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Dashboard';


        activate();

        function activate() {
            var promises = [getAvengerCount(), getAvengersCast()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                console.info('Activated Dashboard View');
            });
        }
        
        function getAvengerCount() {
            return dataservice.getAvengerCount().then(function(data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return dataservice.getAvengersCast().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
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
(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    Settings.$inject = ['$scope'];
    function Settings($scope) {
        var vm = this;

        activate();

        function activate() { }
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
(function () {
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