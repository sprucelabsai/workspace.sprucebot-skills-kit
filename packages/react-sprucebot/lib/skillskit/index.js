'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*');
}

var skill = {
	height: 0,
	minHeight: 0,
	forceAuth: function forceAuth() {
		postMessage('Skill:ForceAuth');
	},
	resized: function resized() {
		var height = 0;
		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var top = scrollTop - clientTop;
		var height = Math.max(this.minHeight, top + body.clientHeight);

		if (height != this.height) {
			this.height = height;
			postMessage({
				name: 'Skill:Resized',
				height: height
			});
		}
	},
	setMinBodyHeight: function setMinBodyHeight(height) {
		this.minHeight = height;
	},
	clearMinBodyHeight: function clearMinBodyHeight() {
		this.minHeight = 0;
	},
	back: function back() {
		if (window.top === window.self) {
			window.history.back();
		} else {
			postMessage('Skill:Back');
		}
	},

	ready: function ready() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { resetUrlTrail: false },
		    _ref$resetUrlTrail = _ref.resetUrlTrail,
		    resetUrlTrail = _ref$resetUrlTrail === undefined ? false : _ref$resetUrlTrail;

		this.resized();
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href,
			resetUrlTrail: resetUrlTrail
		});
		this.resizedInterval = setInterval(this.resized.bind(this), 300);
	},
	scrollTo: function scrollTo(offset) {
		postMessage({
			name: 'Skill:ScrollTo',
			offset: offset || 0
		});
	},

	scrollBy: function scrollBy(offset) {
		if (window.top === window.self) {
			window.scrollBy({
				top: offset,
				behavior: 'smooth'
			});
		} else {
			postMessage({ name: 'Skill:ScrollBy', offset: offset });
		}
	},

	requestScroll: function requestScroll() {
		postMessage({ name: 'Skill:RequestContainerScrollTop' });
	},

	fullScreenOn: function fullScreenOn() {
		postMessage({ name: 'Skill:FullScreenOn' });
	},
	fullScreenOff: function fullScreenOff() {
		postMessage({ name: 'Skill:FullScreenOff' });
	},

	showHelp: function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
			var _this = this;

			var title = _ref3.title,
			    body = _ref3.body;
			var promise;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(window.top === window.self)) {
								_context.next = 4;
								break;
							}

							alert('[' + title + '] ' + body);
							_context.next = 7;
							break;

						case 4:
							promise = new Promise(function (accept, reject) {
								_this._showHelpAccept = accept;
							});


							postMessage({ name: 'Skill:ShowHelp', title: title, body: body });

							return _context.abrupt('return', promise);

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function showHelp(_x2) {
			return _ref2.apply(this, arguments);
		}

		return showHelp;
	}(),

	handleIframeMessage: function handleIframeMessage(e) {
		if (typeof e.data === 'string') {
			try {
				var results = JSON.parse(e.data);

				// TODO make this different?
				if (results.name === 'Skill:HideHelp') {
					if (this._showHelpAccept) {
						this._showHelpAccept();
						this._showHelpAccept = null;
					}
				}

				if (results.name === 'Search:SelectUser') {
					if (this._onSelecUserFormSearchCallback) {
						this._onSelecUserFormSearchCallback(results.user);
						this._onSelecUserFormSearchCallback = null;
					}
				} else if (results.name === 'Search:Cancel') {
					if (this._onCancelSearchCallback) {
						this._onCancelSearchCallback();
						this._onCancelSearchCallback = null;
					}
				} else if (results.name === 'Skill:DidConfirm') {
					if (this._confirmAccept) {
						this._confirmAccept(results.pass);
						this._confirmAccept = null;
					}
				} else if (results.name === 'Skill:DidClickStickyElement') {
					if (this.handleStickElementClick) {
						this.handleStickElementClick(results.key);
					}
				}
			} catch (err) {}
		}
	},

	//TODO move to promise?
	searchForUser: function searchForUser() {
		var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref4$onCancel = _ref4.onCancel,
		    onCancel = _ref4$onCancel === undefined ? function () {} : _ref4$onCancel,
		    _ref4$onSelectUser = _ref4.onSelectUser,
		    onSelectUser = _ref4$onSelectUser === undefined ? function () {} : _ref4$onSelectUser,
		    _ref4$roles = _ref4.roles,
		    roles = _ref4$roles === undefined ? ['guest'] : _ref4$roles,
		    locationId = _ref4.locationId;

		postMessage({ name: 'Skill:SearchForUser', roles: roles, locationId: locationId });

		this._onCancelSearchCallback = onCancel;
		this._onSelecUserFormSearchCallback = onSelectUser;
	},

	displayMessage: function displayMessage(_ref5) {
		var message = _ref5.message,
		    _ref5$type = _ref5.type,
		    type = _ref5$type === undefined ? 'error' : _ref5$type;

		if (window.top === window.self) {
			alert(message);
		} else {
			postMessage({ name: 'Skill:DisplayMessage', message: message, type: type });
		}
	},

	confirm: function () {
		var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref7) {
			var _this2 = this;

			var message = _ref7.message;
			var promise;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!(window.top === window.self)) {
								_context2.next = 4;
								break;
							}

							return _context2.abrupt('return', window.confirm(message));

						case 4:
							promise = new Promise(function (accept, reject) {
								_this2._confirmAccept = accept;
							});


							postMessage({ name: 'Skill:PleaseConfirm', message: message });

							return _context2.abrupt('return', promise);

						case 7:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		function confirm(_x4) {
			return _ref6.apply(this, arguments);
		}

		return confirm;
	}(),

	/**
  * position: 'top' | 'bottom'
  * elements: [
  * {
  *  key: 'first-button', (key is passed back to onClick)
  * 	type: 'button'|'leftTitle'|'rightTitle'|'title',
  *  value: 'Hey There' //value MUST be a string, will be value of button or innerHTML of everything else
  * }
  * ]
  */
	setStickyElement: function setStickyElement(_ref8) {
		var elements = _ref8.elements,
		    _ref8$position = _ref8.position,
		    position = _ref8$position === undefined ? 'top' : _ref8$position,
		    _ref8$onClick = _ref8.onClick,
		    onClick = _ref8$onClick === undefined ? function () {} : _ref8$onClick;

		this.handleStickElementClick = onClick;
		postMessage({
			name: 'Skill:SetStickyElement',
			elements: elements,
			position: position
		});
	},

	updateStickyBoundingRect: function updateStickyBoundingRect(rect) {
		if (this._lastRect && this._lastRect.top === rect.top && this._lastRect.bottom == rect.bottom) {
			return;
		}

		this._lastRect = rect;

		postMessage({
			name: 'Skill:SetStickyBoundingRect',
			boundingRect: rect
		});
	},

	clearStickyElements: function clearStickyElements() {
		postMessage({ name: 'Skill:ClearStickyElements' });
	},
	notifyOfRouteChangeStart: function notifyOfRouteChangeStart() {
		postMessage({ name: 'Skill:RouteChangeStart' });
	}
};

if (typeof window !== 'undefined') {
	window.addEventListener('message', skill.handleIframeMessage.bind(skill));
}

exports.default = skill;