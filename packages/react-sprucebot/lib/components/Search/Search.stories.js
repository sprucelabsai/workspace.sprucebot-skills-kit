'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _Search3 = require('./Search.md');

var _Search4 = _interopRequireDefault(_Search3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Search', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Search4.default, function () {
	return _react2.default.createElement(_Search2.default, { onSelectUser: function onSelectUser() {
			return null;
		}, locationId: 1 });
}));