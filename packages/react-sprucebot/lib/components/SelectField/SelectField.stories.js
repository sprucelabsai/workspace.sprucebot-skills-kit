'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _SelectField = require('./SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _SelectField3 = require('./SelectField.md');

var _SelectField4 = _interopRequireDefault(_SelectField3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('SelectField', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_SelectField4.default, function () {
	return _react2.default.createElement(_SelectField2.default, {
		input: { value: '', onChange: function onChange() {
				return null;
			} },
		meta: { touched: false, error: null }
	});
}));