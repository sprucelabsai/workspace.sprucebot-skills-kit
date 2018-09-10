'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Onboarding = require('./Onboarding');

var _Onboarding2 = _interopRequireDefault(_Onboarding);

var _Onboarding3 = require('./Onboarding.md');

var _Onboarding4 = _interopRequireDefault(_Onboarding3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Onboarding', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Onboarding4.default, function () {
	return _react2.default.createElement(_Onboarding2.default, {
		heading: 'Onboarding',
		steps: [],
		onComplete: function onComplete() {
			return null;
		},
		doneButtonLabel: 'End'
	});
}));