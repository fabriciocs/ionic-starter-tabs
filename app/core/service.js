(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('Message', Message);

  function Message($ionicLoading, LOADING){
    return {
      showError :  showError,
      wait: wait
    };

    function wait(msg, promise){
      if(!promise) throw new Error("Must be a promise");
      $ionicLoading.show({
        template : msg ? msg : ''
      });
      promise.finally(function(){
        $ionicLoading.hide();
      });
    }

    function showError(msg){
      $ionicLoading.show({
        template : msg ? msg : '',
        delay: LOADING.errorTime
      })
    }
  }
})();
