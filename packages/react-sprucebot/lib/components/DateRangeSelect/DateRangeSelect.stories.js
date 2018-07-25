'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRequiredIf = require('react-required-if');

var _reactRequiredIf2 = _interopRequireDefault(_reactRequiredIf);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _addonInfo = require('@storybook/addon-info');

var _react4 = require('@storybook/addon-knobs/react');

var _storybookReadme = require('storybook-readme');

var _DateRangeSelect = require('./DateRangeSelect');

var _DateRangeSelect2 = _interopRequireDefault(_DateRangeSelect);

var _DateRangeSelect3 = require('./DateRangeSelect.md');

var _DateRangeSelect4 = _interopRequireDefault(_DateRangeSelect3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var availableDays = function availableDays() {
	var daysArray = [];

	for (var i = 1; i < 30; i++) {
		if (i < 10) {
			daysArray.push('2018-08-0' + i);
		} else {
			daysArray.push('2018-08-' + i);
		}
	}

	return daysArray;
};

var handleOnDatesChange = function handleOnDatesChange() {
	return console.log('Date changed');
};

var stories = (0, _react3.storiesOf)('DateRangeSelect', module);
stories.addDecorator(_react4.withKnobs);

stories.add('Interactive', (0, _storybookReadme.withReadme)(_DateRangeSelect4.default, (0, _addonInfo.withInfo)()(function () {
	return _react2.default.createElement(
		'div',
		{ className: 'single_col' },
		_react2.default.createElement(_DateRangeSelect2.default, {
			allowPastDates: true,
			bypassDaysBlocked: true,
			onDatesChange: function onDatesChange(startDate, endDate) {
				console.log(startDate, endDate);
			},
			numberOfMonths: 1,
			setDefaultDates: true,
			defaultStartDate: (0, _moment2.default)('2018-03-28'),
			defaultEndDate: (0, _moment2.default)()
		})
	);
})));