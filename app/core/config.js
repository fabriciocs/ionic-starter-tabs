(function () {
    'use strict';

    angular.module('app.core')
        .config(Configure);

    Configure.$inject = ['$ionicConfigProvider', '$urlRouterProvider', 'ngdbProvider'];

    function Configure($ionicConfigProvider, $urlRouterProvider, ngdbProvider) {

        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.ios.backButton.text('Voltar');
        $ionicConfigProvider.backButton.previousTitleText(false);

        var chatsRepository = {
            id: 'ID',
            name: 'STRING',
            lastText: 'STRING',
            face: 'STRING'
        };

        ngdbProvider.setRepository('chats', chatsRepository)

        $urlRouterProvider.otherwise('/tab/dash');


    }

})();