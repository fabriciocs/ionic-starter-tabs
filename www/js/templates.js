angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/auth.html',
    '<ion-view hide-back-button="true" view-title="Acesse"><ion-content><div class="padding"><button class="button button-block button-assertive" ng-click="vm.signIn()">Google</button></div><em>{{vm.firebaseUser | json}}</em> <em>{{vm.error | json}}</em></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard/dashboard.html',
    '<ion-view view-title="{{vm.title}}"><ion-content><div class="list card"><div class="item item-icon-left"><i class="icon ion-ios-telephone"></i><h2>Fale com a ouvidoria</h2><p>estamos anciosos para te ouvir</p></div><div class="item item-body"><img class="full-image" src="{{vm.imgURI}}" ng-if="vm.imgURI"><div><button class="button icon ion-camera button-full" ng-click="vm.takePicture()"></button></div><p><label class="item item-input item-floating-label"><span class="input-label">Descrição</span> <textarea type="text" placeholder="Descrição" ng-model="vm.descricao"></textarea></label></p></div><div class="item footer"><button class="icon icon-right ion-android-send button button-assertive button-full" ng-click="vm.send()">Enviar</button></div></div></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/tabs.html',
    '<ion-tabs class="tabs-light tabs-icon-only tabs-color-active-assertive"><ion-tab title="Account" icon-off="ion-ios-person-outline" icon-on="ion-ios-person" href="#/tab/account/auth"><ion-nav-view name="tab-account"></ion-nav-view></ion-tab><ion-tab title="Dashboard" icon-off="ion-ios-home-outline" icon-on="ion-ios-home" href="#/tab/dashboard"><ion-nav-view name="tab-dashboard"></ion-nav-view></ion-tab><ion-tab title="Map" icon-off="ion-map" icon-on="ion-map" href="#/tab/map"><ion-nav-view name="tab-map"></ion-nav-view></ion-tab></ion-tabs>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('map/map.html',
    '<ion-view view-title="{{vm.title}}"><ion-content><div id="map"></div></ion-content></ion-view>');
}]);
