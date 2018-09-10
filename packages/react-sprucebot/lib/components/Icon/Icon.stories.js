'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Icon3 = require('./Icon.md');

var _Icon4 = _interopRequireDefault(_Icon3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Icon', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Icon4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_Icon2.default,
		null,
		'edit'
	);
})));