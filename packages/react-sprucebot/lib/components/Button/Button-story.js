"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Wrapper = _interopRequireDefault(require("../../../.storybook/Wrapper"));

var _Button = _interopRequireDefault(require("./Button"));

var Icon11 = function Icon11(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M4.285 1.49h-.011A4.5 4.5 0 0 0 .75 5.887v.89a1.5 1.5 0 0 0 1.5 1.5H6a1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3.75a1.5 1.5 0 0 0 1.5-1.5v-.89a4.5 4.5 0 0 0-3.524-4.393h-.011a40.593 40.593 0 0 0-15.43-.002zM12.305 11.275H11.7a9 9 0 0 0-8.931 7.884l-.093.744a3 3 0 0 0 2.977 3.372h12.7a3 3 0 0 0 2.975-3.375l-.093-.744a9 9 0 0 0-8.93-7.88z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    d: "M9.75 11.487V9.025M14.25 11.487V9.025",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), _react.default.createElement("path", {
    clipRule: "evenodd",
    d: "M12 20.275a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

Icon11.defaultProps = {
  width: "24",
  height: "25",
  viewBox: "0 0 24 25",
  xmlns: "http://www.w3.org/2000/svg"
};

var ButtonGroup = function ButtonGroup() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    kind: ''
  };
  var btnText = (0, _react3.text)('Text', 'Hello World');
  var isSmall = (0, _react3.boolean)('Small', false);
  var isFullWidth = (0, _react3.boolean)('Full Width', false);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_Button.default, (0, _defineProperty2.default)({
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: props.kind || ''
  }, "isFullWidth", false)), _react.default.createElement(_Button.default, {
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: "Link ".concat(btnText),
    kind: props.kind || '',
    href: "#",
    target: "_blank"
  }), _react.default.createElement(_Button.default, {
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: props.kind || '',
    disabled: true
  }), _react.default.createElement(_Button.default, {
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: props.kind || '',
    disabled: true,
    isLoading: true
  }), _react.default.createElement(_Button.default, {
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    text: btnText,
    kind: props.kind || '',
    icon: _react.default.createElement(Icon11, {
      className: "btn__line-icon"
    })
  }), _react.default.createElement(_Button.default, {
    className: "l-mr-small l-mb-small",
    isSmall: isSmall,
    isFullWidth: isFullWidth,
    kind: props.kind || '',
    icon: _react.default.createElement(Icon11, {
      className: "btn__line-icon"
    })
  }));
};

var stories = (0, _react2.storiesOf)('Button', module);
stories.addDecorator(_react3.withKnobs);
stories.add('Primary', function () {
  return _react.default.createElement(ButtonGroup, {
    kind: "primary"
  });
}).add('Secondary', function () {
  return _react.default.createElement(ButtonGroup, {
    kind: "secondary"
  });
}).add('Simple', function () {
  return _react.default.createElement(ButtonGroup, {
    kind: "simple"
  });
}).add('Caution', function () {
  return _react.default.createElement(ButtonGroup, {
    kind: "caution"
  });
});