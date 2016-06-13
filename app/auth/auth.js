(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('Auth', Auth);

  Auth.$inject = ['$state', '$firebaseAuth','FIREBASE_CONFIG','$cordovaOauth', '$ionicLoading'];
  function Auth($state, $firebaseAuth, FIREBASE_CONFIG, $cordovaOauth, $ionicLoading) {
    var vm = this;
    var auth = $firebaseAuth();
    vm.signIn = signIn;


    activate();
    function activate() {
    }

    function signIn() {
      vm.firebaseUser = null;
      vm.error = null;
      $ionicLoading.show();
      $cordovaOauth.google(FIREBASE_CONFIG.clientId, ["email"]).then(function(result) {
        var credential = firebase.auth.GoogleAuthProvider.credential(result.id_token);
        auth.$signInWithCredential(credential).then(function(firebaseUser) {
          vm.firebaseUser = firebaseUser;
          $ionicLoading.hide();
          $state.transitionTo('tab.dashboard');
        }).catch(function(error) {
          vm.error = error;
          $ionicLoading.hide();
          alert(error);
        });
      }, function(error) {
        m.error = error;
        $ionicLoading.hide();
        alert("Error -> " + error);
      });
      /**/
    }
  }
})();
