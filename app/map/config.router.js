(function () {
  'use strict';

  angular
    .module('app.map')
    .config(Configure);

  Configure.$inject = ['$stateProvider'];

  function Configure($stateProvider) {
    $stateProvider
      .state('tab.map', {
        url: '/map',
        views: {
          'tab-map': {
            templateUrl: 'map/map.html',
            controller: 'Map',
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
