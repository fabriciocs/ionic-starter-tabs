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
