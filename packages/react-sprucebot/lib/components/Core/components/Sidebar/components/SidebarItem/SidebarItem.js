"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../../../../../Button/Button"));

var isCurrentParent = function isCurrentParent(props) {
  var items = props.items;

  if (items) {
    if (items.find(function (item) {
      return item.isCurrent;
    })) {
      return true;
    }

    items.forEach(function (item) {
      if (item.items) {
        if (item.items.find(function (item) {
          return item.isCurrent;
        })) {
          return true;
        }
      }
    });
  }

  return false;
};

var SidebarItem = function SidebarItem(props) {
  var text = props.text,
      href = props.href,
      action = props.action,
      icon = props.icon,
      isCurrent = props.isCurrent,
      items = props.items;
  var parentClass = (0, _classnames.default)('sidebar-item', {
    'sidebar-item--is-current': isCurrent,
    'sidebar-item--is-current-parent': items && isCurrentParent({
      items: items
    })
  });
  return _react.default.createElement("li", {
    className: parentClass
  }, _react.default.createElement("div", {
    className: "sidebar-item__inner"
  }, _react.default.createElement("a", {
    className: "sidebar-item__link",
    href: href
  }, icon && _react.default.cloneElement(icon, {
    className: (0, _classnames.default)('sidebar-item__icon', icon.props && icon.props.className)
  }), _react.default.createElement("span", {
    className: "sidebar-item__text"
  }, text)), action && _react.default.createElement(_Button.default, action)), items && items.length > 0 && _react.default.createElement("ul", {
    className: "sidebar__sub-list"
  }, items.map(function (item, idx) {
    var subClass = (0, _classnames.default)('sidebar__sub-list-item', {
      'sidebar-item--is-current': item.isCurrent,
      'sidebar-item--is-current-parent': item.items && isCurrentParent({
        items: item.items
      })
    });
    return _react.default.createElement("li", {
      key: idx,
      className: subClass
    }, _react.default.createElement("div", {
      className: "sidebar-item__inner"
    }, _react.default.createElement("a", {
      href: item.href,
      className: "sidebar-item__link"
    }, item.text)), item.items && isCurrentParent({
      items: item.items
    }) && _react.default.createElement("ul", {
      className: "sidebar__sub-list"
    }, item.items.map(function (item, idx) {
      var subSubClass = (0, _classnames.default)('sidebar__sub-list-item', {
        'sidebar-item--is-current': item.isCurrent
      });
      return _react.default.createElement("li", {
        key: idx,
        className: subSubClass
      }, _react.default.createElement("div", {
        className: "sidebar-item__inner"
      }, _react.default.createElement("a", (0, _defineProperty2.default)({
        href: "sidebar-item__link"
      }, "href", item.href), item.text)));
    })));
  })));
};

SidebarItem.defaultProps = {
  icon: null,
  isCurrent: false,
  items: [],
  action: null
};
var _default = SidebarItem;
exports.default = _default;