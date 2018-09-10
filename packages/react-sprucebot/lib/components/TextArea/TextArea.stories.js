'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _TextArea3 = require('./TextArea.md');

var _TextArea4 = _interopRequireDefault(_TextArea3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('TextArea', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_TextArea4.default, function () {
	return _react2.default.createElement(_TextArea2.default, {
		input: { value: '', onChange: function onChange() {
				return null;
			} },
		meta: { touched: false, error: null }
	});
}));