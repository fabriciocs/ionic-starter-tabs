(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice','currentAuth'];
    function Dashboard($q, dataservice, currentAuth) {
        var vm = this;
        console.log(currentAuth);

        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Dashboard';


        activate();

        function activate() {
            var promises = [getAvengerCount(), getAvengersCast()];
            return $q.all(promises).then(function() {
                console.info('Activated Dashboard View');
            });
        }

        function getAvengerCount() {
            return dataservice.getAvengerCount().then(function(data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return dataservice.getAvengersCast().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
    }
})();
