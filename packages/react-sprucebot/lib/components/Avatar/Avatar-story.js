"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _react3 = require("@storybook/addon-knobs/react");

var _Container = _interopRequireDefault(require("../Layout/Container/Container"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _userPlaceholder = _interopRequireDefault(require("../../../static/assets/users/user-placeholder.png"));

var _userPlaceholder96w = _interopRequireDefault(require("../../../static/assets/users/user-placeholder--96w.png"));

var _user = _interopRequireDefault(require("../../../static/assets/users/user-01.png"));

var _user0196w = _interopRequireDefault(require("../../../static/assets/users/user-01--96w.png"));

var stories = (0, _react2.storiesOf)('Avatar', module);
stories.addDecorator((0, _react3.withKnobsOptions)({
  escapeHTML: false
}));
stories.addDecorator(_react3.withKnobs);
stories.add('Avatar', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_Avatar.default, {
    image: (0, _react3.boolean)('isLarge', false) ? (0, _react3.text)('image', '') || _userPlaceholder96w.default : (0, _react3.text)('image', '') || _userPlaceholder.default,
    alt: (0, _react3.text)('alt', 'Name'),
    isLarge: (0, _react3.boolean)('isLarge', false),
    isVertical: (0, _react3.boolean)('isVertical', false),
    showIndicator: (0, _react3.boolean)('showIndicator', false),
    status: (0, _react3.text)('status', 'online'),
    name: (0, _react3.text)('name', ''),
    text: (0, _react3.text)('text', ''),
    width: (0, _react3.number)('width', null),
    height: (0, _react3.number)('height', null)
  }));
});