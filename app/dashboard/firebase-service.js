(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .factory('FirebaseService', FirebaseService);

  FirebaseService.$inject = ['$q', '$ionicPlatform','$firebaseArray'];
  function FirebaseService($q, $ionicPlatform, $firebaseArray) {
    return {
      getArray: getArray
    };
    function getArray(ref) {
      if(!ref) ref = firebase.database().ref();
      return $firebaseArray(ref);
    }
  }
})();
