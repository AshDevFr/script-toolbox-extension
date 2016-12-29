(function () {
  'use script';

  function injectScript (path) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(path);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
  }

  chrome.runtime.sendMessage('getScriptList', function(response) {
    (response.scripts || []).forEach(injectScript);
  });
})();
