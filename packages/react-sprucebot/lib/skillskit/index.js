"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function postMessage(message) {
  return window.parent.postMessage(JSON.stringify(message), '*');
}

var skill = {
  height: 0,
  minHeight: 0,
  handleStickElementClick: {},
  listenersByEventName: {},
  forceAuth: function forceAuth() {
    postMessage('Skill:ForceAuth');
  },

  /**
   * Called anytime a skill is resized to let the parent know what to set the height of the iframe to
   */
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
  windowOrDocument: function windowOrDocument() {
    var standalone = window.navigator.standalone;
    var userAgent = window.navigator.userAgent.toLowerCase();
    var safari = /safari/.test(userAgent);
    var chrome = /chrome/.test(userAgent);
    var ios = /iphone|ipod|ipad/.test(userAgent);
    var android = /android/.test(userAgent);
    var isIOSWebView = ios && !safari && !standalone;
    var isAndroidWebView = android && !chrome && !standalone;

    if (isIOSWebView || isAndroidWebView) {
      return document;
    } else {
      return window;
    }
  },
  addEventListener: function addEventListener(eventName, listener) {
    if (!this.listenersByEventName[eventName]) {
      this.listenersByEventName[eventName] = [];
    }

    this.listenersByEventName[eventName].push(listener);
  },
  removeEventListener: function removeEventListener(eventName, listener) {
    if (!this.listenersByEventName[eventName]) {
      this.listenersByEventName[eventName] = [];
    }

    var idx = this.listenersByEventName[eventName].indexOf(listener);

    if (idx > -1) {
      this.listenersByEventName[eventName].splice(idx, 1);
    }
  },
  dispatchEventListener: function dispatchEventListener(eventName, payload) {
    var listeners = this.listenersByEventName[eventName] || [];
    listeners.forEach(function (l) {
      return l(payload);
    });
  },
  setMinBodyHeight: function setMinBodyHeight(height) {
    this.minHeight = height;
  },
  clearMinBodyHeight: function clearMinBodyHeight() {
    this.minHeight = 0;
  },
  showUnderlay: function showUnderlay() {
    postMessage('Skill:ShowUnderlay');
  },
  hideUnderlay: function hideUnderlay() {
    postMessage('Skill:HideUnderlay');
  },
  canSendMessages: function canSendMessages() {
    return window.top !== window.self || window.__SBTEAMMATE__;
  },
  back: function back() {
    if (!this.canSendMessages()) {
      window.history.back();
    } else {
      postMessage('Skill:Back');
    }
  },
  editUserProfile: function editUserProfile(_ref) {
    var userId = _ref.userId,
        locationId = _ref.locationId;
    postMessage({
      name: 'Skill:EditUserProfile',
      userId: userId,
      locationId: locationId
    });
  },
  ready: function ready() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      resetUrlTrail: false
    },
        _ref2$resetUrlTrail = _ref2.resetUrlTrail,
        resetUrlTrail = _ref2$resetUrlTrail === void 0 ? false : _ref2$resetUrlTrail;

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
    if (!this.canSendMessages()) {
      window.scrollBy({
        top: offset,
        behavior: 'smooth'
      });
    } else {
      postMessage({
        name: 'Skill:ScrollBy',
        offset: offset
      });
    }
  },
  requestScroll: function requestScroll() {
    postMessage({
      name: 'Skill:RequestContainerScrollTop'
    });
  },
  fullScreenOn: function fullScreenOn() {
    postMessage({
      name: 'Skill:FullScreenOn'
    });
  },
  fullScreenOff: function fullScreenOff() {
    postMessage({
      name: 'Skill:FullScreenOff'
    });
  },
  showHelp: function () {
    var _showHelp = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref3) {
      var _this = this;

      var title, body, promise;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = _ref3.title, body = _ref3.body;

              if (this.canSendMessages()) {
                _context.next = 5;
                break;
              }

              alert("[".concat(title, "] ").concat(body));
              _context.next = 8;
              break;

            case 5:
              promise = new Promise(function (accept, reject) {
                _this._showHelpAccept = accept;
              });
              postMessage({
                name: 'Skill:ShowHelp',
                title: title,
                body: body
              });
              return _context.abrupt("return", promise);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function showHelp(_x) {
      return _showHelp.apply(this, arguments);
    }

    return showHelp;
  }(),
  handleIframeMessage: function handleIframeMessage(e) {
    if (typeof e.data === 'string') {
      try {
        var results = JSON.parse(e.data); // TODO make this different?

        if (results.name === 'Skill:HideHelp') {
          if (this._showHelpAccept) {
            this._showHelpAccept();

            this._showHelpAccept = null;
          }
        }

        if (results.name.substring(0, 5) === 'Event') {
          var name = results.name,
              payload = results.payload;
          this.dispatchEventListener(name.substring(6), payload);
        } else if (results.name === 'Search:SelectUser') {
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
          if (this.handleStickElementClick[results.position]) {
            this.handleStickElementClick[results.position](results.key);
          }
        }
      } catch (err) {}
    }
  },
  //TODO move to promise?
  searchForUser: function searchForUser() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$onCancel = _ref4.onCancel,
        onCancel = _ref4$onCancel === void 0 ? function () {} : _ref4$onCancel,
        _ref4$onSelectUser = _ref4.onSelectUser,
        onSelectUser = _ref4$onSelectUser === void 0 ? function () {} : _ref4$onSelectUser,
        _ref4$roles = _ref4.roles,
        roles = _ref4$roles === void 0 ? ['guest'] : _ref4$roles,
        locationId = _ref4.locationId;

    postMessage({
      name: 'Skill:SearchForUser',
      roles: roles,
      locationId: locationId
    });
    this._onCancelSearchCallback = onCancel;
    this._onSelecUserFormSearchCallback = onSelectUser;
  },
  displayMessage: function displayMessage(_ref5) {
    var message = _ref5.message,
        _ref5$type = _ref5.type,
        type = _ref5$type === void 0 ? 'error' : _ref5$type;

    if (!this.canSendMessages()) {
      alert(message);
    } else {
      postMessage({
        name: 'Skill:DisplayMessage',
        message: message,
        type: type
      });
    }
  },
  confirm: function () {
    var _confirm = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(_ref6) {
      var _this2 = this;

      var message, promise;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              message = _ref6.message;

              if (this.canSendMessages()) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", window.confirm(message));

            case 5:
              promise = new Promise(function (accept, reject) {
                _this2._confirmAccept = accept;
              });
              postMessage({
                name: 'Skill:PleaseConfirm',
                message: message
              });
              return _context2.abrupt("return", promise);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function confirm(_x2) {
      return _confirm.apply(this, arguments);
    }

    return confirm;
  }(),

  /**
   * position: 'top' | 'bottom'
   * elements: [
   * {
   *  key: 'first-button', (key is passed back to onClick)
   * 	type: 'button'|'title',
   *  leftIcon: 'scissors',
   *  rightIcon: 'pencil'
   *  value: 'Hey There' //value MUST be a string, will be value of button or innerHTML of everything else
   * }
   * ]
   */
  setStickyElement: function setStickyElement(_ref7) {
    var elements = _ref7.elements,
        _ref7$position = _ref7.position,
        position = _ref7$position === void 0 ? 'top' : _ref7$position,
        _ref7$onClick = _ref7.onClick,
        onClick = _ref7$onClick === void 0 ? function () {} : _ref7$onClick;
    this.handleStickElementClick[position] = onClick;
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
      boundingRect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        x: rect.x,
        y: rect.y
      }
    });
  },
  clearStickyElements: function clearStickyElements() {
    postMessage({
      name: 'Skill:ClearStickyElements'
    });
  },
  notifyOfRouteChangeStart: function notifyOfRouteChangeStart() {
    postMessage({
      name: 'Skill:RouteChangeStart'
    });
  }
};

if (typeof window !== 'undefined') {
  skill.windowOrDocument().addEventListener('message', skill.handleIframeMessage.bind(skill));
}

var _default = skill;
exports.default = _default;