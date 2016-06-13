(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .factory('GeolocationService', GeolocationService);

  GeolocationService.$inject = ['$q', '$ionicPlatform','$cordovaGeolocation'];
  function GeolocationService($q, $ionicPlatform, $cordovaGeolocation) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    return {
      get: get
    };
    function get() {
      return $ionicPlatform.ready()
        .then(function () {
          var deferred = $q.defer();
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (pos) {
              deferred.resolve(pos);
            }).catch(deferred.reject);
          return deferred.promise;
        })
        .then(function (pos) {
          return [new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), pos.coords];
        })
        .then(function (latLon) {
          var deferred = $q.defer();
          var geocoder = new google.maps.Geocoder;
          geocoder.geocode({'location': latLon[0]}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[1]) {
              var resolve = {
                address: results[1].formatted_address,
                latLon: latLon[1]
              };
              deferred.resolve(resolve);
            } else {
              deferred.reject(false);
            }
          });
          return deferred.promise;
        });
    }
  }
})();
