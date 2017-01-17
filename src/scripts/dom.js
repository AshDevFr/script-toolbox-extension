(function (window) {
  'use strict';

  $br = window.$br = (window.$br || {});
  $br.dom = {
    getFocusedElement: getFocusedElement,
    watchFocusedElement: watchFocusedElement
  };

  function getFocusedElement() {
    return document.activeElement;
  }

  function watchFocusedElement() {
    return $br.utils.watch(getFocusedElement, function (nv, ov) {
      if (nv != ov) {
        console.log(nv);
      }
    });
  }
})(window);
