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