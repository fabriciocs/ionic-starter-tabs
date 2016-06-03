(function () {
    'use strict';

    angular
        .module('app.core')
        .run(Run);

    Run.$inject = ['$ionicPlatform'];

    function Run($ionicPlatform) {
        var service = {
            onReady: onReady
        }

        $ionicPlatform.ready(
            service.onReady()
        );

        return service;

        function onReady() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        }
    }
})();