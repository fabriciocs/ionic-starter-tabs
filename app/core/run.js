(function () {
  'use strict';

  angular
    .module('app.core')
    .run(Run);

  Run.$inject = ['$ionicPlatform','FIREBASE_CONFIG','$rootScope','$state', '$firebaseAuth'];

  function Run($ionicPlatform, FIREBASE_CONFIG, $rootScope, $state, $firebaseAuth) {
    var service = {
      onReady: onReady
    };

    $ionicPlatform.ready(
      service.onReady()
    );


    $rootScope.logout = function(){
      $firebaseAuth().$signOut();
      $state.go("tab.account-auth", {}, {reload: true});
    };


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

      $firebaseAuth().$onAuthStateChanged(function(user) {
        $rootScope.isLogged = user;
      });

    }
  }
})();
