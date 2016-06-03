(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('Account', Account);

    function Account() {
        var vm = this;

        vm.settings = {
            enableFriends: true
        };

    }
})();