'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*');
}

exports.default = {
	height: 0,
	forceAuth: function forceAuth() {
		postMessage('Skill:ForceAuth');
	},
	resized: function resized() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$minHeight = _ref.minHeight,
		    minHeight = _ref$minHeight === undefined ? 0 : _ref$minHeight;

		var height = 0;

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var top = scrollTop - clientTop;
		var height = Math.max(minHeight, top + body.clientHeight);

		if (height != this.height) {
			this.height = height;
			postMessage({
				name: 'Skill:Resized',
				height: height
			});
		}
	},
	back: function back() {
		if (window.top === window.self) {
			window.history.back();
		} else {
			postMessage('Skill:Back');
		}
	},

	ready: function ready() {
		var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { resetUrlTrail: false },
		    _ref2$resetUrlTrail = _ref2.resetUrlTrail,
		    resetUrlTrail = _ref2$resetUrlTrail === undefined ? false : _ref2$resetUrlTrail;

		this.resized();
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href,
			resetUrlTrail: resetUrlTrail
		});
		this.resizedInterval = setInterval(this.resized.bind(this), 300);
	},
	scrollTo: function scrollTo(offset) {
		postMessage({ name: 'Skill:ScrollTo', offset: offset || 0 });
	},

	requestScroll: function requestScroll() {
		postMessage({ name: 'Skill:RequestContainerScrollTop' });
	},

	searchForUser: function searchForUser() {
		var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref3$onCancel = _ref3.onCancel,
		    onCancel = _ref3$onCancel === undefined ? function () {} : _ref3$onCancel,
		    _ref3$onSelectUser = _ref3.onSelectUser,
		    onSelectUser = _ref3$onSelectUser === undefined ? function () {} : _ref3$onSelectUser,
		    _ref3$roles = _ref3.roles,
		    roles = _ref3$roles === undefined ? ['guest'] : _ref3$roles,
		    locationId = _ref3.locationId;

		postMessage({ name: 'Skill:SearchForUser', roles: roles, locationId: locationId });

		this._onCancelSearchCallback = onCancel;
		this._onSelecUserFormSearchCallback = onSelectUser;

		window.addEventListener('message', this._searchCallback.bind(this));
	},

	displayMessage: function displayMessage(_ref4) {
		var message = _ref4.message,
		    _ref4$type = _ref4.type,
		    type = _ref4$type === undefined ? 'error' : _ref4$type;

		if (window.top === window.self) {
			alert(message);
		} else {
			postMessage({ name: 'Skill:DisplayMessage', message: message, type: type });
		}
	},

	confirm: function () {
		var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref6) {
			var message = _ref6.message;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt('return', window.confirm(message));

						case 1:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function confirm(_x4) {
			return _ref5.apply(this, arguments);
		}

		return confirm;
	}(),

	_searchCallback: function _searchCallback(e) {
		if (typeof e.data === 'string') {
			try {
				var results = JSON.parse(e.data);
				var shutdown = false;

				if (results.name === 'Search:SelectUser') {
					this._onSelecUserFormSearchCallback(results.user);
					shutdown = true;
				} else if (results.name === 'Search:Cancel') {
					this._onCancelSearchCallback();
					shutdown = true;
				}

				if (shutdown) {
					window.removeEventListener('message', this._searchCallback);
					this._onCancelSearchCallback = null;
					this._onSelecUserFormSearchCallback = null;
				}
			} catch (err) {}
		}
	}
};