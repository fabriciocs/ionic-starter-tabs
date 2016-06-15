(function () {
  'use strict';

  angular
    .module('app.map')
    .controller('Map', Map);
  Map.$inject = ['GeolocationService', '$firebaseArray','$ionicLoading', '$rootScope'];
  function Map(GeolocationService, $firebaseArray, $ionicLoading, $rootScope) {
    var vm = this;
    var markers = [];
    $rootScope.activateMaps = activate;
    activate();


    function activate(){
      $ionicLoading.show();
      if(!vm.map) makeMap();
      else remakeMap();
      loadMarkers();
      $ionicLoading.show();
    }
    function remakeMap(){
      google.maps.event.trigger(vm.map, 'resize');
      vm.map.setZoom(vm.map.getZoom() );
      $ionicLoading.hide();
    }
    function clearMarkers(){
      markers.forEach(function(marker){
        marker.setMap(null);
      });
      markers = [];
    }
    function loadMarkers(){
      $ionicLoading.show();
      getList().$loaded().then(function(list){
        clearMarkers();
        list.forEach(function (item){
          var latLon = createLatLon(item.latLon.latitude, item.latLon.longitude);
          var marker = createMarker(latLon,  vm.map);
          markers.push(marker);
          var infoWindow = createInfoWindow(item.address, item.imageData, item.description);
          marker.addListener('click', function() {
            infoWindow.open( vm.map, marker);
          });
        });
        $ionicLoading.hide();
      }).catch(function(err){
        $ionicLoading.hide();
        alert("Erro ao obter dados -> "+err.message);
      });
    }
    function makeMap(){
      $ionicLoading.show();
      GeolocationService.get().then(function(location){
        vm.map = getMap(createLatLon(location.latLon.latitude, location.latLon.longitude));
        $ionicLoading.hide();
      }).catch(function(err){
        $ionicLoading.hide();
        alert("Por favor, habilite a localização para continuar -> "+err.message);
      });
    }

    function getList(){
      var ref = firebase.database().ref().child("notificacoes");
      var list = $firebaseArray(ref);
      return list;
    }

    function getMap(latLon){
      var mapOptions = {
        center: latLon,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
      return map;
    }

    function createLatLon(latitude, longitude){
      return new google.maps.LatLng(latitude, longitude);
    }

    function createMarker(latLon, map){
      return new google.maps.Marker({
        position: latLon,
        map: map
      });
    }

    function createInfoWindow(address, image, description){
      return new google.maps.InfoWindow({
        content: '<div id="content"><h4 id="firstHeading" class="firstHeading">'
        +address+'</h4><div id="bodyContent"><div style="text-align: center"><img style="width: 50%" src="'+image+'" BORDER="0" ALIGN="center"></div><div><p>'+description+'</p></div></div></div>'
      });
    }
  }
})();
