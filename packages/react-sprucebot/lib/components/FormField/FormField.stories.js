'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _FormField3 = require('./FormField.md');

var _FormField4 = _interopRequireDefault(_FormField3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('FormField', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_FormField4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		_FormField2.default,
		{
			input: { value: '', onChange: function onChange() {
					return null;
				} },
			meta: { touched: false, error: null },
			type: 'text',
			label: 'Email Address',
			placeholder: 'hello@sprucebot.com'
		},
		_react2.default.createElement('input', {
			type: 'text',
			label: 'Email Address',
			placeholder: 'hello@sprucebot.com'
		})
	);
})));