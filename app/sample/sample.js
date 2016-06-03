(function() {
'use strict';

    angular
        .module('app.sample')
        .controller('Sample', Sample);

    Sample.$inject = ['$scope'];
    function Sample($scope) {
        var vm = this;
      
        activate();

        function activate() { }
    }
})();