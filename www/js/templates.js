angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('account/account.html',
    '<ion-view view-title="Account"><ion-content></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/auth.html',
    '<ion-view hide-back-button="true" view-title="Auth"><ion-content><div class="padding"><button class="button button-block button-assertive" ng-click="vm.signIn()">Google</button></div><em>{{vm.firebaseUser | json}}</em> <em>{{vm.error | json}}</em></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('avengers/avengers.html',
    '<ion-view view-title="{{vm.title}}"><ion-content><div ng-if="vm.avengers.length" class="item-input-inset"><label class="item-input-wrapper light-bg"><i class="icon ion-android-search placeholder-icon"></i><form><input type="search" placeholder="Find Avengers by name" autocomplete="off" autocorrect="off" ng-model="vm.filter.name"></form></label></div><ion-list><ion-item class="item-icon-right" collection-repeat="c in vm.avengers | filter:vm.filter track by c.id" type="item-text-wrap"><h2>{{c.name}}</h2><p>{{c.character | limitTo: 2000 }}</p><i class="icon ion-chevron-right icon-accessory"></i><ion-option-button class="button-positive"><i class="icon ion-ios-information-outline"></i></ion-option-button></ion-item></ion-list></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('dashboard/dashboard.html',
    '<ion-view view-title="{{vm.title}}"><ion-content><div class="row"><div class="col"><ul><li><div class="text-center"><span class="bold">Stark Tower</span> New York, New York</div></li><li><div class="text-center"><span class="bold">{{vm.avengerCount}}</span> Cast</div></li></ul></div></div><div class="row"><div class="col"><div><div data-cc-widget-header="" title="Avengers Movie Cast" allow-collapse="true"></div><div class="text-left"><table><thead><tr class="row"><th class="col">Name</th><th class="col">Character</th></tr></thead><tbody><tr class="row" data-ng-repeat="a in vm.avengers"><td class="col"><small>{{a.name}}</small></td><td class="col"><small>{{a.character}}</small></td></tr></tbody></table></div></div></div></div><div class="row"><div class="col"><div data-cc-widget-header="" title="{{vm.news.title}}" allow-collapse="true"></div><div class="text-center"><small>{{vm.news.description}}</small></div></div></div></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('layout/tabs.html',
    '<ion-tabs class="tabs-light tabs-icon-only tabs-color-active-assertive"><ion-tab title="Dashboard" icon-off="ion-ios-home-outline" icon-on="ion-ios-home" href="#/tab/dashboard"><ion-nav-view name="tab-dashboard"></ion-nav-view></ion-tab><ion-tab title="Avengers" icon-off="ion-ios-world-outline" icon-on="ion-ios-world" href="#/tab/avengers"><ion-nav-view name="tab-avengers"></ion-nav-view></ion-tab><ion-tab title="Account" icon-off="ion-ios-person-outline" icon-on="ion-ios-person" href="#/tab/account/auth"><ion-nav-view name="tab-account"></ion-nav-view></ion-tab><ion-tab title="Settings" icon-off="ion-ios-cog-outline" icon-on="ion-ios-cog" href="#/tab/settings"><ion-nav-view name="tab-settings"></ion-nav-view></ion-tab></ion-tabs>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('notification/notification.html',
    '<ion-view view-title="Notification"><ion-content></ion-content></ion-view>');
}]);

angular.module('ionic').run(['$templateCache', function($templateCache) {
  $templateCache.put('settings/settings.html',
    '<ion-view view-title="Settings"><ion-content></ion-content></ion-view>');
}]);
