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
