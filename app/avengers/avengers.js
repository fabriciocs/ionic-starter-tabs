(function() {
'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    Avengers.$inject = ['dataservice'];
    function Avengers(dataservice) {
        var vm = this;
        vm.avengers = [];
        vm.title = 'Avengers';
      
        activate();

        function activate() {
            return getAvengers().then(function() {
                console.info('Activated Avengers View');
            });
        }
        
        function getAvengers() {
            return dataservice.getAvengers().then(function(data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
        
    }
})();