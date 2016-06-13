(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['$ionicPlatform','$cordovaCamera','GeolocationService', '$firebaseArray','$ionicLoading'];
  function Dashboard($ionicPlatform, $cordovaCamera, GeolocationService, $firebaseArray, $ionicLoading) {
    var vm = this;
    vm.title = "Enviar";
    vm.send = send;
    var latLon;

    function send(){
      $ionicLoading.show();
      GeolocationService.get().then(function(location){
        vm.address = location.address;
        latLon = location.latLon;
        var ref = firebase.database().ref().child("notificacoes");
        var list = $firebaseArray(ref);
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
          $ionicLoading.hide();
          alert("Dados enviados com sucesso");
          vm.descricao = "";
          vm.address = "";
          vm.imgURI = null;
        }).catch(function(err){
          $ionicLoading.hide();
          alert("Erro ao enviar os dados -> "+err.message);
        });
      }).catch(function(err){
        $ionicLoading.hide();
        alert("Por favor, habilite a localização para continuar -> "+err.message);
      });
    }

    vm.takePicture = takePicture;

    function takePicture() {
      $ionicLoading.show();
      $ionicPlatform.ready(function(){
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
          $ionicLoading.hide();
        }, function(err) {
          $ionicLoading.hide();
          alert("Não foi possível obter foto");
        });
      });
    }

  }
})();
