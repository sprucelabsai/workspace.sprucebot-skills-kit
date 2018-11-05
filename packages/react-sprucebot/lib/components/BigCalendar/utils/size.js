"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  bodyWidth: function bodyWidth() {
    return document.body.clientWidth;
  },
  bodyHeight: function bodyHeight() {
    return document.body.clientHeight;
  },
  getLocalTop: function getLocalTop(node) {
    return node.getBoundingClientRect().top;
  },
  getTop: function getTop(node) {
    return this.getPosition(node).y;
  },
  getLocalBottom: function getLocalBottom(node) {
    return node.offsetTop;
  },
  getBottom: function getBottom(node) {
    return this.getLocalTop(node) + node.offsetHeight;
  },
  getLeft: function getLeft(node) {
    return this.getPosition(node).x;
  },
  getRight: function getRight(node) {
    return this.getLeft(node) + this.getWidth(node);
  },
  getWidth: function getWidth(node) {
    return node && node.offsetWidth ? node.offsetWidth : null;
  },
  getHeight: function getHeight(node) {
    return node && node.offsetHeight ? node.offsetHeight : null;
  },
  getScrollWidth: function getScrollWidth(node) {
    return node && node.scrollWidth ? node.scrollWidth : null;
  },
  getScrollHeight: function getScrollHeight(node) {
    return node && node.scrollHeight ? node.scrollHeight : null;
  },
  getPosition: function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
    var count = 0;

    while (el) {
      if (el.tagName == 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
        xPos += el.offsetLeft - xScroll + el.clientLeft;
        yPos += el.offsetTop - yScroll + el.clientTop;
      } else {
        var scrollLeft = count > 0 ? el.scrollLeft : 0;
        var scrollTop = count > 0 ? el.scrollTop : 0; // for all other non-BODY elements

        xPos += el.offsetLeft - scrollLeft + el.clientLeft;
        yPos += el.offsetTop - scrollTop + el.clientTop;
      }

      count++;
      el = el.offsetParent;
    }

    return {
      x: xPos,
      y: yPos
    };
  },
  getMaxScrollTop: function getMaxScrollTop(node) {
    var height = this.getHeight(node);
    var scrollHeight = this.getScrollHeight(node);
    var maxScroll = scrollHeight - height;
    return maxScroll;
  },
  getMaxScrollLeft: function getMaxScrollLeft(node) {
    var width = this.getWidth(node);
    var scrollWidth = this.getScrollWidth(node);
    var maxScroll = scrollWidth - width;
    return maxScroll;
  },
  isScrolledAllTheWayRight: function isScrolledAllTheWayRight(node) {
    var width = this.getWidth(node);
    var scrollWidth = this.getScrollWidth(node);
    var scrollLeft = node.scrollLeft;
    var maxScroll = scrollWidth - width;
    return scrollLeft >= maxScroll;
  },
  isScrolledAllTheWayLeft: function isScrolledAllTheWayLeft(node) {
    var scrollLeft = node.scrollLeft;
    return scrollLeft <= 0;
  }
};
exports.default = _default;