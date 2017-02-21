(function (window) {
  'use strict';

  $br = window.$br = (window.$br || {});
  $br.dom = {
    getFocusedElement: getFocusedElement,
    getNodes: getNodes,
    nodeLength: nodeLength,
    unwrapPara: unwrapPara,
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

  function unwrapPara(mainNode) {
    var nodes = getNodes(mainNode).filter(function(node) {
        return isDiv(node) && node !== mainNode &&
            node.childNodes && Array.from(node.childNodes).filter(function(child) {
                return isPara(child) || isVoid(child);
            }).length === node.childNodes.length;
    });

    return processParaNodes(nodes);

    function processParaNodes(nodes) {
        nodes.forEach(function(node) {
            var ancestor = node.parentNode;
            if (ancestor) {
                Array.from(node.childNodes).forEach(function(child) {
                    ancestor.insertBefore(child, node);
                });
                ancestor.removeChild(node);
            }
        });
    }
}

function isPara(node) {
    return node && node.nodeName && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
}

function isVoid(node) {
    return node && node.nodeName && /^BR|^IMG|^HR|^IFRAME|^BUTTON/.test(node.nodeName.toUpperCase());
}

function isText(node) {
    return node && node.nodeType === 3;
}

function isDiv (node) {
    return node && node.nodeName && node.nodeName.toUpperCase() === 'DIV';
}

function nodeLength(node) {
    if (isText(node)) {
        return node.nodeValue.length;
    }
    if (node) {
        return node.childNodes.length;
    }
    return 0;
}

function getNodes(mainNode, pred) {
    return getChildNodes(mainNode);

    function getChildNodes(node) {
        var children = [];
        if (typeof pred === 'function') {
          if (pred(node)) {
            children.push(node);
          }
        } else {
          children.push(node);
        }
        if (node.childNodes) {
            var childNodes = Array.from(node.childNodes);
            childNodes.forEach(function(child) {
                children = children.concat(getChildNodes(child));
            });
        }
        return children;
    }
}

})(window);
