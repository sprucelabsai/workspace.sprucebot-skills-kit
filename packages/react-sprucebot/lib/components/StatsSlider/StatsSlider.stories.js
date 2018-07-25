'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _StatsSlider = require('./StatsSlider');

var _StatsSlider2 = _interopRequireDefault(_StatsSlider);

var _StatsSlider3 = require('./StatsSlider.md');

var _StatsSlider4 = _interopRequireDefault(_StatsSlider3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('StatsSlider', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_StatsSlider4.default, function () {
	return _react2.default.createElement(_StatsSlider2.default, {
		stats: [{
			dir: 1,
			value: 12,
			title: 'Things'
		}]
	});
}));