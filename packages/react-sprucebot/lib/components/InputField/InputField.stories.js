'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _InputField = require('./InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _InputField3 = require('./InputField.md');

var _InputField4 = _interopRequireDefault(_InputField3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('InputField', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_InputField4.default, function () {
	return _react2.default.createElement(_InputField2.default, {
		label: 'Email Address',
		input: { value: '', onChange: function onChange() {
				return null;
			} },
		meta: { touched: false, error: null }
	});
}));