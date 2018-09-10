'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _DevControls = require('./DevControls');

var _DevControls2 = _interopRequireDefault(_DevControls);

var _DevControls3 = require('./DevControls.md');

var _DevControls4 = _interopRequireDefault(_DevControls3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('DevControls', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_DevControls4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(_DevControls2.default, null);
})));