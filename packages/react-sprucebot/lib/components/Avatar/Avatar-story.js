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
stories.addDecorator(_react3.withKnobs);
stories.add('Avatar', function () {
  return _react.default.createElement(_Container.default, {
    size: "small"
  }, _react.default.createElement(_Avatar.default, {
    image: (0, _react3.boolean)('Large', false) ? (0, _react3.boolean)('Default Image', false) ? _userPlaceholder96w.default : _user0196w.default : (0, _react3.boolean)('Default Image', false) ? _userPlaceholder.default : _user.default,
    alt: "Default User Image",
    name: (0, _react3.text)('Name', ''),
    text: (0, _react3.text)('Text', ''),
    isLarge: (0, _react3.boolean)('Large', false),
    isVertical: (0, _react3.boolean)('Vertical', false),
    showIndicator: (0, _react3.boolean)('Show Indicator', false),
    status: (0, _react3.boolean)('Online', false) ? 'online' : 'offline',
    width: (0, _react3.number)('Width', null),
    height: (0, _react3.number)('Height', null)
  }));
});