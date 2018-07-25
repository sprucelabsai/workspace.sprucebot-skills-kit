'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Avatar3 = require('./Avatar.md');

var _Avatar4 = _interopRequireDefault(_Avatar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageOptions = {
	'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg': 'Default',
	'https://hello.sprucebot.com/avatar.jpg': 'User Image'
};

var defaultImage = 'https://hello.sprucebot.com/avatar.jpg';

var stories = (0, _react3.storiesOf)('Avatar', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Default', (0, _storybookReadme.withReadme)(_Avatar4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(_Avatar2.default, {
		top: false,
		online: true,
		showOnlineIndicator: true,
		image: (0, _react4.select)('Image', imageOptions, defaultImage)
	});
}))).add('Not Online', (0, _storybookReadme.withReadme)(_Avatar4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(_Avatar2.default, {
		top: false,
		online: false,
		showOnlineIndicator: false,
		image: (0, _react4.select)('Image', imageOptions, defaultImage)
	});
}))).add('Large', (0, _storybookReadme.withReadme)(_Avatar4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(_Avatar2.default, { top: true, image: (0, _react4.select)('Image', imageOptions, defaultImage) });
})));