'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _TrainingGuide = require('./TrainingGuide');

var _TrainingGuide2 = _interopRequireDefault(_TrainingGuide);

var _TrainingGuide3 = require('./TrainingGuide.md');

var _TrainingGuide4 = _interopRequireDefault(_TrainingGuide3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('TrainingGuide', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_TrainingGuide4.default, function () {
	return _react2.default.createElement(_TrainingGuide2.default, {
		steps: ['one'],
		nextButtonLabel: 'Next',
		doneButtonLabel: 'done',
		onComplete: function onComplete() {
			return null;
		},
		onboardingComplete: false
	});
}));