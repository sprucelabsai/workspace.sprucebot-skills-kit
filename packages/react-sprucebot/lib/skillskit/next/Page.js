"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var actions = _interopRequireWildcard(require("../store/actions"));

var _cookies = _interopRequireDefault(require("cookies"));

var _jsCookies = _interopRequireDefault(require("js-cookies"));

var _index = _interopRequireDefault(require("../index"));

var _DevControls = _interopRequireDefault(require("../../components/DevControls/DevControls"));

var _Loader = _interopRequireDefault(require("../../components/Loader/Loader"));

var _qs = _interopRequireDefault(require("qs"));

var _lang = _interopRequireDefault(require("../helpers/lang"));

var _router = _interopRequireWildcard(require("next/router"));

var _app = require("next/app");

var _is_js = _interopRequireDefault(require("is_js"));

var debug = require('debug')('@sprucelabs/react-sprucebot');

var setCookie = function setCookie(named, value, req, res) {
  if (req && req.headers) {
    var cookies = new _cookies.default(req, res, {
      secure: true
    });
    return cookies.set(named, value);
  } else {
    return _jsCookies.default.setItem(named, value);
  }
};

var getCookie = function getCookie(named, req, res) {
  if (req && req.headers) {
    var cookies = new _cookies.default(req, res, {
      secure: true
    });
    return cookies.get(named);
  } else {
    return _jsCookies.default.getItem(named);
  }
};

var Page = function Page(Wrapped) {
  var _temp;

  var ConnectedWrapped = (0, _router.withRouter)(Wrapped);
  return _temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(_temp, _Component);

    function _temp(props) {
      var _this;

      (0, _classCallCheck2.default)(this, _temp);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_temp).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleIframeMessage", function (e) {
        // we are not going to try and authenticate again (cookie setting)
        if (e.data === 'Skill:NotReAuthing') {
          _this.setState({
            attemptingReAuth: false
          });

          return;
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRouteChangeComplete", function () {
        if (_this.props.config.METRICS_ENABLED && _this.props.config.METRICS_BROWSER_STATS_ENABLED) {
          log.routeChangeComplete();
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRouteChangeStart", function () {
        // don't user skill off props, it is pulled server side and lacks all functions
        _index.default.notifyOfRouteChangeStart();

        if (_this.props.config.METRICS_ENABLED && _this.props.config.METRICS_BROWSER_STATS_ENABLED) {
          log.routeChangeStart();
        }
      });
      _this.state = {
        attemptingReAuth: !!props.attemptingReAuth,
        isIframed: true
      };
      return _this;
    } // Everything here is run server side


    (0, _createClass2.default)(_temp, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee() {
          var _document$body$classL;

          var WebFont, bodyClassNames;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (window.self === window.top || window.__SBTEAMMATE__) {
                    // make sure we are being loaded inside sb
                    console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL');
                    this.setState({
                      attemptingReAuth: false,
                      isIframed: !!window.__SBTEAMMATE__
                    });
                  } else if (this.props.attemptingReAuth) {
                    _index.default.forceAuth();
                  } // NOTE: Need to do this require here so that we can be sure the global window is defined


                  WebFont = require('webfontloader'); //eslint-disable-line

                  WebFont.load({
                    google: {
                      families: ['Material Icons']
                    }
                  }); // setup route changes

                  _router.default && _router.default.router && _router.default.router.events.on('routeChangeStart', this.handleRouteChangeStart);
                  _router.default && _router.default.router && _router.default.router.events.on('routeChangeComplete', this.handleRouteChangeComplete); // window listeners for reauth communication

                  window.addEventListener('message', this.handleIframeMessage); // setup event listeners

                  _index.default.addEventListener('did-update-user', this.props.actions.events.didUpdateUser);

                  bodyClassNames = ["".concat(_is_js.default.mobile() ? 'is_mobile' : _is_js.default.tablet() ? 'is_tablet' : 'is_desktop')];

                  if (_is_js.default.ios()) {
                    bodyClassNames.push('is_ios');
                  }

                  (_document$body$classL = document.body.classList).add.apply(_document$body$classL, bodyClassNames);

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // remove all listeners
        window.removeEventListener('message', this.handleIframeMessage); // no more user updates

        _index.default.removeEventListener('did-update-user', this.props.actions.events.didUpdateUser); // remove route changes


        _router.default && _router.default.router && _router.default.router.events.off('routeChangeStart', this.handleRouteChangeStart);
        _router.default && _router.default.router && _router.default.router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.attemptingReAuth) {
          return _react.default.createElement(_Loader.default, null);
        }

        if (this.props.config.DEV_MODE) {
          return _react.default.createElement(_app.Container, null, this.state.isIframed ? _react.default.createElement("style", {
            jsx: true,
            global: true
          }, "\n\t\t\t\t\t\t\t\thtml,\n\t\t\t\t\t\t\t\tbody {\n\t\t\t\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t") : null, _react.default.createElement(_DevControls.default, {
            auth: this.props.auth
          }), _react.default.createElement(ConnectedWrapped, (0, _extends2.default)({}, this.props, {
            skill: _index.default,
            lang: _lang.default
          })));
        }

        return _react.default.createElement(_app.Container, null, this.state.isIframed ? _react.default.createElement("style", {
          jsx: true,
          global: true
        }, "\n\t\t\t\t\t\t\thtml,\n\t\t\t\t\t\t\tbody {\n\t\t\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t") : null, _react.default.createElement(ConnectedWrapped, (0, _extends2.default)({}, this.props, {
          skill: _index.default,
          lang: _lang.default
        })));
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee2(_ref) {
          var pathname,
              query,
              asPath,
              store,
              res,
              req,
              props,
              jwt,
              state,
              args,
              redirect,
              role,
              firstPart,
              _jwt,
              rest,
              queryString,
              _args2 = arguments;

          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  pathname = _ref.pathname, query = _ref.query, asPath = _ref.asPath, store = _ref.store, res = _ref.res, req = _ref.req;
                  props = {
                    pathname: pathname,
                    query: query,
                    asPath: asPath,
                    skill: _index.default
                  };
                  jwt = query.jwt || getCookie('jwt', req, res);

                  if (!jwt) {
                    _context2.next = 18;
                    break;
                  }

                  _context2.prev = 4;
                  _context2.next = 7;
                  return store.dispatch(actions.auth.go(jwt));

                case 7:
                  _context2.next = 9;
                  return store.dispatch(actions.onboarding.didOnboarding());

                case 9:
                  // only save cookie if a new one has been passed
                  if (query.jwt) {
                    setCookie('jwt', query.jwt, req, res);
                  }

                  _context2.next = 16;
                  break;

                case 12:
                  _context2.prev = 12;
                  _context2.t0 = _context2["catch"](4);
                  debug(_context2.t0);
                  debug('Error fetching user from jwt');

                case 16:
                  _context2.next = 19;
                  break;

                case 18:
                  debug('This looks pretty bad. You are missing a jwt and will probably be unauthorized');

                case 19:
                  state = store.getState();

                  if (state.auth && !state.auth.error) {
                    state.auth.role = state.config.DEV_MODE && getCookie('devRole', req, res) || state.auth.role;
                  }

                  if (!ConnectedWrapped.getInitialProps) {
                    _context2.next = 31;
                    break;
                  }

                  args = Array.from(_args2);
                  args[0] = (0, _objectSpread2.default)({}, args[0], state);
                  _context2.t1 = _objectSpread2.default;
                  _context2.t2 = {};
                  _context2.t3 = props;
                  _context2.next = 29;
                  return ConnectedWrapped.getInitialProps.apply(this, args);

                case 29:
                  _context2.t4 = _context2.sent;
                  props = (0, _context2.t1)(_context2.t2, _context2.t3, _context2.t4);

                case 31:
                  redirect = props.redirect || false;

                  if (query.back && query.jwt && (query.back.search('sprucebot.com') > 0 || query.back.search('bshop.io') > 0)) {
                    // if there is a jwt, we are being authed
                    redirect = query.back;
                  } else if (!redirect && !props.public && (!state.auth || !state.auth.role || state.auth.error)) {
                    // no redirect is set, we're not public, but auth failed
                    redirect = '/unauthorized';
                    debug('AUTH FAILED', state);
                  } else if (!redirect && !props.public) {
                    // all things look good, lets just make sure we're in the right area (owner, teammate, or guest)
                    role = state.auth.role;
                    firstPart = props.pathname.split('/')[1];
                    _jwt = query.jwt, rest = (0, _objectWithoutProperties2.default)(query, ["jwt"]);
                    queryString = _qs.default.stringify(rest); // we are at '/' then redirect to the corresponding role's path

                    if (props.pathname === '/') {
                      redirect = "/".concat(role, "?").concat(queryString);
                    } else if (role !== firstPart) {
                      redirect = "/unauthorized";
                    }
                  }

                  if (!(redirect && res)) {
                    _context2.next = 40;
                    break;
                  }

                  res.writeHead(302, {
                    Location: redirect
                  });
                  res.end();
                  res.finished = true;
                  return _context2.abrupt("return");

                case 40:
                  if (redirect) {
                    window.location.href = redirect;
                  }

                case 41:
                  // if we are /unauthorized, don't have a cookie, but have NOT done cookie check
                  if (props.pathname === '/unauthorized' && (!state.auth || !state.auth.role)) {
                    props.attemptingReAuth = true;
                  } // We can only return a plain object here because it is passed to the browser
                  // No circular dependencies


                  return _context2.abrupt("return", props);

                case 43:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[4, 12]]);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);
    return _temp;
  }(_react.Component), _temp;
};

var _default = function _default(Wrapped) {
  return Page(Wrapped);
};

exports.default = _default;