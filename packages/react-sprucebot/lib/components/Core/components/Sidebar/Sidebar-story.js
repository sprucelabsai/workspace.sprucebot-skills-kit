"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _StylesProvider = _interopRequireDefault(require("../../../../../.storybook/StylesProvider"));

var _Sidebar = _interopRequireDefault(require("./Sidebar"));

var HomeIcon = function HomeIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M3.502 9.297v5.5h4v-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4h4v-5.5M1.502 8.297l6.793-6.793a1 1 0 0 1 1.414 0l6.793 6.793",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

HomeIcon.defaultProps = {
  width: "18",
  height: "16",
  viewBox: "0 0 18 16",
  xmlns: "http://www.w3.org/2000/svg"
};

var TeamsIcon = function TeamsIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M4.133 6.854a4.567 4.567 0 0 0 5.095 1.024",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M6.5 11a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M9 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M10.991 16.232a4.5 4.5 0 0 0-7.924-2.643",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12.75 11.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M15.183 13.246a3 3 0 0 0-5.146.472",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

TeamsIcon.defaultProps = {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
};

var NotificationsIcon = function NotificationsIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M14.138 5.497a6.067 6.067 0 1 0-10.857 5.261L1.5 14.5l3.741-1.782c.69.43 1.457.716 2.259.842M5.5 5.5h5M5.5 8.5h2",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12.921 8a3.563 3.563 0 0 1 2.684 5.924l.448 2.576-2.334-1.439A3.576 3.576 0 1 1 12.92 8h.002z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M14 10.5h-2M14 12.5h-2",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

NotificationsIcon.defaultProps = {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  xmlns: "http://www.w3.org/2000/svg"
};

var ProvideStyles = function ProvideStyles(storyFn) {
  return _react.default.createElement(_StylesProvider.default, null, storyFn());
};

var stories = (0, _react2.storiesOf)('Sidebar', module);
stories.addDecorator(ProvideStyles);
stories.addDecorator(_react3.withKnobs);
var personalItems = [{
  text: 'Home',
  icon: _react.default.createElement(HomeIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: true,
  href: '#'
}, {
  text: 'Teams',
  icon: _react.default.createElement(TeamsIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: false,
  href: '#'
}, {
  text: 'Notification Preferences',
  icon: _react.default.createElement(NotificationsIcon, {
    className: "sidebar-item__line-icon"
  }),
  isCurrent: false,
  href: '#'
}];
stories.add('Default', function () {
  return _react.default.createElement(_Sidebar.default, {
    items: personalItems,
    STORYBOOKdoNotWrap: true
  });
});