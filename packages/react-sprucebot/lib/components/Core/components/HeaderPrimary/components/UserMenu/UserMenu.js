"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _velocityReact = require("velocity-react");

var _Avatar = _interopRequireDefault(require("../../../../../Avatar/Avatar"));

var _Button = _interopRequireDefault(require("../../../../../Button/Button"));

var _ListItem = _interopRequireDefault(require("../../../../../List/components/ListItem/ListItem"));

var SwitchIcon = function SwitchIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M7.5 9a4.125 4.125 0 1 0 0-8.25A4.125 4.125 0 0 0 7.5 9z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M.75 17.25a6.75 6.75 0 0 1 11.243-5.037M11.25 20.25l3 3 3-3M14.25 23.25v-9M17.25 17.25l3-3 3 3M20.25 14.25v9",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

SwitchIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var LogoutIcon = function LogoutIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M.75 12.004H16.5M12.75 15.754l3.75-3.75-3.75-3.75M3.306 16.6a10.5 10.5 0 1 0 .179-9.541",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

LogoutIcon.defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};

var UserMenu = function UserMenu(props) {
  var image = props.image,
      name = props.name,
      tel = props.tel,
      menuIsVisible = props.menuIsVisible,
      toggleMenu = props.toggleMenu;
  return _react.default.createElement("div", {
    className: "user-menu"
  }, _react.default.createElement("button", {
    className: "btn header-primary__user-btn",
    onClick: toggleMenu
  }, _react.default.createElement("span", {
    className: "btn__inner"
  }, _react.default.createElement(_Avatar.default, {
    image: image,
    alt: name,
    width: 32,
    height: 32
  }))), _react.default.createElement(_velocityReact.VelocityTransitionGroup, {
    enter: {
      animation: {
        opacity: 1,
        translateY: '-2px'
      },
      duration: 200
    },
    leave: {
      animation: {
        opacity: 0,
        translateY: '4px'
      },
      duration: 0
    }
  }, menuIsVisible && _react.default.createElement("ul", {
    className: "user-menu__menu card"
  }, _react.default.createElement(_ListItem.default, {
    avatar: image,
    title: name,
    subtitle: tel
  }), _react.default.createElement("li", {
    className: "list-item"
  }, _react.default.createElement(_Button.default, {
    kind: "simple",
    text: "Switch Accounts",
    icon: _react.default.createElement(SwitchIcon, {
      className: "btn__line-icon"
    }),
    isFullWidth: true
  })), _react.default.createElement("li", {
    className: "list-item"
  }, _react.default.createElement(_Button.default, {
    kind: "simple",
    text: "Log Out",
    icon: _react.default.createElement(LogoutIcon, {
      className: "btn__line-icon"
    }),
    isFullWidth: true
  })))));
};

var _default = UserMenu;
exports.default = _default;