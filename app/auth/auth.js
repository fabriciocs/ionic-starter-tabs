(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('Auth', Auth);

  Auth.$inject = ['$state', '$firebaseAuth','FIREBASE_CONFIG','$cordovaOauth', 'Message'];
  function Auth($state, $firebaseAuth, FIREBASE_CONFIG, $cordovaOauth, Message) {
    var vm = this;
    var auth = $firebaseAuth();
    vm.access = {};
    vm.signIn = signIn;
    vm.signOut = signOut;
    vm.register = register;

    function signOut(){
      auth.$signOut();
    }

    function register(){
      if(vm.access.password === vm.access.confirmPassword){
        Message.wait("Fazendo Registro", auth.$createUserWithEmailAndPassword(vm.access.email, vm.access.password)
          .then(function(firebaseUser) {
            vm.firebaseUser = firebaseUser;
            $state.transitionTo('tab.dashboard');
          })
          .catch(function(error) {
            vm.error = error;
            alert(error);
          }));
      }

    }


    activate();
    function activate() {
    }

    function signIn() {
      vm.firebaseUser = null;
      vm.error = null;
      Message.wait("Fazendo Login",auth.$signInWithEmailAndPassword(vm.access.email, vm.access.password).then(function(firebaseUser) {
        vm.firebaseUser = firebaseUser;
        $state.transitionTo('tab.dashboard');
      }).catch(function(error) {
        vm.error = error;
        alert(error);
      }));
    }
  }
})();
