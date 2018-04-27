'use strict';

var _auth = require('./auth');

var auth = _interopRequireWildcard(_auth);

var _onboarding = require('./onboarding');

var onboarding = _interopRequireWildcard(_onboarding);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
	auth: auth,
	onboarding: onboarding
};