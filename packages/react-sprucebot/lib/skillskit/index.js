'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
		postMessage('Skill:Back');
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
		postMessage('Skill:RequestScroll');
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