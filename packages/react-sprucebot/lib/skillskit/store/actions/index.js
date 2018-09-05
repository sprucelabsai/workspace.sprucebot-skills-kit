'use strict';

var _auth = require('./auth');

var auth = _interopRequireWildcard(_auth);

var _onboarding = require('./onboarding');

var onboarding = _interopRequireWildcard(_onboarding);

var _sharable = require('./sharable');

var sharable = _interopRequireWildcard(_sharable);

var _calendar = require('./calendar');

var calendar = _interopRequireWildcard(_calendar);

var _events = require('./events');

var events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
	auth: auth,
	onboarding: onboarding,
	sharable: sharable,
	calendar: calendar,
	events: events
};