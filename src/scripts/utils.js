(function (window) {
  'use strict';

  var watchers = {};

  $br = window.$br = (window.$br || {});
  $br.utils = {
    newUid: newUid,
    watch: watch,
    watchers: watchers
  };

  function newUid() {
    return Math.random().toString(36).substring(7)
  }

  function watch(selector, callback) {
    var newWatcher = {
      selector: selector,
      callback: callback,
      value: null
    };
    var uid = newUid();

    watchers[uid] = newWatcher;

    return function () {
      if(uid) {
        delete watchers[uid];
      }
    }
  }

  function processWatchers() {
    Object.keys(watchers).forEach(function(key) {
      var watcher = watchers[key];
      var oldValue = watcher.value;
      watcher.value = watcher.selector();
      watcher.callback(watcher.value, oldValue);
    });
  }

  window.setInterval(processWatchers, 500);
})(window);
