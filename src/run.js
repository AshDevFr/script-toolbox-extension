(function () {
  'use script';

  var scriptsList = [];

  function getScripts(callback) {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
      root.getDirectory('src/scripts', {create: false}, function(scriptsDir) {
        var reader = scriptsDir.createReader();
        reader.readEntries(function(results) {
          callback(results.map(function(file){
            return 'src/scripts/' + file.name;
          }));
        });
      });
    });
  }

  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request === 'getScriptList')
      sendResponse({scripts: scriptsList});
  });

  getScripts(function (scripts) {
    console.log('Script list', scripts);
    scriptsList = scripts;
  });
})();
