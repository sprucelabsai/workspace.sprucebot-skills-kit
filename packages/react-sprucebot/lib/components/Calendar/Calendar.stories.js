'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Calendar3 = require('./Calendar.md');

var _Calendar4 = _interopRequireDefault(_Calendar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = [{
	start: (0, _moment2.default)('2018-08-10 08:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-10 17:00:00').toDate(),
	title: 'Big Day!'
}, {
	start: (0, _moment2.default)('2018-08-05 07:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-05 15:00:00').toDate(),
	title: 'Be awesome 🔥'
}, {
	start: (0, _moment2.default)('2018-08-01 05:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-01 12:00:00').toDate(),
	title: '🍁🍁..fall..🍁🍁'
}, {
	start: (0, _moment2.default)('2018-08-23 10:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-23 22:00:00').toDate(),
	title: '🎇🎆🎇🎆🎇🎆'
}, {
	start: (0, _moment2.default)('2018-08-30 03:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-30 20:00:00').toDate(),
	title: 'Skydiving!'
}, {
	start: (0, _moment2.default)('2018-08-01 08:00:00').toDate(),
	end: (0, _moment2.default)('2018-08-15 17:00:00').toDate(),
	title: 'VACATION!',
	allDay: true
}];

var weekStyles = {
	postion: 'relative',
	display: 'flex',
	width: '1000px',
	'overflow-x': 'scroll',
	'-webkit-overflow-scrolling': 'touch'
};

var stories = (0, _react3.storiesOf)('Calendar', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_Calendar4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		{ className: 'single_col' },
		_react2.default.createElement(_Calendar2.default, {
			toolbar: false,
			height: (0, _react4.text)('Height', '1500px'),
			date: new Date('2018-08-10 01:00:00'),
			events: events,
			defaultView: 'day',
			views: ['day'],
			step: 15,
			timeslots: 4,
			titleAccessor: 'title',
			startAccessor: 'start',
			endAccessor: 'end',
			allDayAccessor: 'allDay',
			selectable: false,
			onEventDrop: (0, _addonActions.action)('Drag and drop event'),
			onEventResize: (0, _addonActions.action)('Resize event')
		})
	);
})));