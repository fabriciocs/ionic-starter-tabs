(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['$q', 'currentAuth','$ionicPlatform','$cordovaCamera','$cordovaGeolocation','GeolocationService', 'FirebaseService'];
  function Dashboard($q, currentAuth, $ionicPlatform, $cordovaCamera, $cordovaGeolocation, GeolocationService, FirebaseService) {
    var vm = this;

    vm.send = send;
    var latLon;

    GeolocationService.then(function(location){
      vm.title = location.address;
      vm.address = location.address;
      latLon= location.latLon;
    }).catch(function(err){
      console.log(err);
    });

    function send(){
      var ref = firebase.database().ref().child("notificacoes");
      var list = FirebaseService.getArray(ref);
      list.$add({
        description : vm.descricao,
        address: vm.address,
        latLon: {
          latitude: latLon.latitude,
          longitude: latLon.longitude,
          accuracy: latLon.accuracy
        },
        imageData : vm.imgURI
      }).then(function(){
        alert("Dados enviados com sucesso");
      }).catch(function(err){
        alert("Erro: "+err.Message);
        console.log(err);
      });
    }

    $ionicPlatform.ready(function(){
      vm.takePicture = takePicture;
      vm.getCurrentPosition = getCurrentPosition;
      function getCurrentPosition() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            vm.lat = position.coords.latitude;
            vm.long = position.coords.longitude
          }, function (err) {
            alert("Não foi possível obter a localização");
          });
      }

      function takePicture() {
        var options = {
          quality : 90,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          vm.image = imageData;
          vm.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          alert("Não foi possível obter foto");
        });
      }
    });

    function activate() {
    }


  }
})();
