(function () {
    'use strict';

    angular.module('app', [
        'ionic',
        'app.core',
        'app.account',
        'app.auth',
        'app.dashboard',
        'app.layout',
    ]);
})();

(function () {
    'use strict';

    angular.module('app.auth', []);
})();
(function () {
    'use strict';

    angular.module('app.dashboard', []);
})();
(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngCordova', 'firebase',
            'blocks.exception','ngCordovaOauth'
        ]);

})();

(function() {
    'use strict';

    angular.module('app.layout', []);
})();
(function () {
    'use strict';

    angular.module('blocks.exception', []);
})();
(function () {
  'use strict';

  angular
    .module('app.auth')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$firebaseAuth'];
  function AuthService($firebaseAuth) {
    var auth = $firebaseAuth();
    return {
      ref : function(){return auth}
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('Auth', Auth);

  Auth.$inject = ['$state', '$firebaseAuth','FIREBASE_CONFIG','$cordovaOauth'];
  function Auth($state, $firebaseAuth, FIREBASE_CONFIG, $cordovaOauth) {
    var vm = this;
    var auth = $firebaseAuth();
    vm.signIn = signIn;


    activate();
    function activate() {
    }

    function signIn() {
      vm.firebaseUser = null;
      vm.error = null;
      $cordovaOauth.google(FIREBASE_CONFIG.clientId, ["email"]).then(function(result) {
        var credential = firebase.auth.GoogleAuthProvider.credential(result.id_token);
        auth.$signInWithCredential(credential).then(function(firebaseUser) {
          vm.firebaseUser = firebaseUser;
          $state.transitionTo('tab.avengers');
        }).catch(function(error) {
          vm.error = error;
          console.log(error);
        });
      }, function(error) {
        m.error = error;
        console.log("Error -> " + error);
      });
      /**/
    }
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
            controllerAs: 'vm',
            resolve: {
              "currentAuth": ["AuthService", function(AuthService) {
                return AuthService.ref().$requireSignIn();
              }]
            }
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

    Dashboard.$inject = ['$q', 'currentAuth'];
    function Dashboard($q, currentAuth) {
        var vm = this;
        activate();

        function activate() {
            
        }
    }
})();

(function () {
    'use strict';

    angular.module('app.core')
        .config(Configure);

    Configure.$inject = ['$ionicConfigProvider', '$urlRouterProvider'];

    function Configure($ionicConfigProvider, $urlRouterProvider) {

        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.ios.backButton.text('Voltar');
        $ionicConfigProvider.backButton.previousTitleText(false);
      
        $urlRouterProvider.otherwise('/tab/dashboard');


    }

})();

(function () {
  'use strict';

  angular
    .module('app.core')
    .constant('API_URL', '')
    .constant('APP_VERSION', '1.2.8')
    .constant('FIREBASE_CONFIG', {
      clientId: '298632192699-tqh8c89o19v0i4cgb5ppa2cv3ek076mg.apps.googleusercontent.com',
      apiKey: "AIzaSyCet6pxM64G1Y9vaRCEE1cJqorAnnuo1u8",
      authDomain: "mais-cidadao-4ec99.firebaseapp.com",
      databaseURL: "https://mais-cidadao-4ec99.firebaseio.com",
      storageBucket: ""
      })
})();

(function () {
  'use strict';

  angular
    .module('app.core')
    .run(Run);

  Run.$inject = ['$ionicPlatform','FIREBASE_CONFIG','$rootScope','$state'];

  function Run($ionicPlatform, FIREBASE_CONFIG, $rootScope, $state) {
    var service = {
      onReady: onReady
    };

    $ionicPlatform.ready(
      service.onReady()
    );

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        console.log("runs", arguments);
        $state.go("tab.account-auth", {}, {reload: true});
      }
    });

    return service;

    function onReady() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      firebase.initializeApp(FIREBASE_CONFIG);
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