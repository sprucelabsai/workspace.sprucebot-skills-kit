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
  getTop: function getTop(node) {
    return node && node.getBoundingClientRect ? node.getBoundingClientRect().top : null;
  },
  getBottom: function getBottom(node) {
    return node && node.getBoundingClientRect ? node.getBoundingClientRect().bottom : null;
  },
  getLeft: function getLeft(node) {
    return node && node.getBoundingClientRect ? node.getBoundingClientRect().left : null;
  },
  getRight: function getRight(node) {
    return node && node.getBoundingClientRect ? node.getBoundingClientRect().right : null;
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