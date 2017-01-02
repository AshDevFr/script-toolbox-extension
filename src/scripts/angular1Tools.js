(function (window) {
  'use strict';

  $br = window.$br = (window.$br || {});
  $br.ng = godMode();

  function getWatchers(root) {
    root = angular.element(root || document.documentElement);
    var watcherCount = 0;

    function getElemWatchers(element) {
      var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
      var scopeWatchers = getWatchersFromScope(element.data().$scope);
      var watchers = scopeWatchers.concat(isolateWatchers);
      angular.forEach(element.children(), function (childElement) {
        watchers = watchers.concat(getElemWatchers(angular.element(childElement)));
      });
      return watchers;
    }

    function getWatchersFromScope(scope) {
      if (scope) {
        return scope.$$watchers || [];
      } else {
        return [];
      }
    }

    return getElemWatchers(root);
  }

  function ngScope (element) {
    return angular.element(element).scope();
  }

  function ngService (service, element) {
    return angular.element(element || document.body).injector().get(service);
  }

  function godMode () {
    if (window.angular)
      return {
        getWatchers: getWatchers,
        scope: ngScope,
        service: ngService,
        $anchorScroll: ngService('$anchorScroll'),
        $animate: ngService('$animate'),
        $animateCss: ngService('$animateCss'),
        $cacheFactory: ngService('$cacheFactory'),
        $compile: ngService('$compile'),
        $controller: ngService('$controller'),
        $document: ngService('$document'),
        $exceptionHandler: ngService('$exceptionHandler'),
        $filter: ngService('$filter'),
        $http: ngService('$http'),
        $httpBackend: ngService('$httpBackend'),
        $httpParamSerializer: ngService('$httpParamSerializer'),
        $httpParamSerializerJQLike: ngService('$httpParamSerializerJQLike'),
        $interpolate: ngService('$interpolate'),
        $interval: ngService('$interval'),
        $jsonpCallbacks: ngService('$jsonpCallbacks'),
        $locale: ngService('$locale'),
        $location: ngService('$location'),
        $log: ngService('$log'),
        $parse: ngService('$parse'),
        $q: ngService('$q'),
        $rootElement: ngService('$rootElement'),
        $rootScope: ngService('$rootScope'),
        $sce: ngService('$sce'),
        $sceDelegate: ngService('$sceDelegate'),
        $templateCache: ngService('$templateCache'),
        $templateRequest: ngService('$templateRequest'),
        $timeout: ngService('$timeout'),
        $window: ngService('$window'),
        $xhrFactory: ngService('$xhrFactory')
      };
    return {};
  }
})(window);
