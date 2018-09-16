"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _document = _interopRequireWildcard(require("next/document"));

var debug = require('debug')('@sprucelabs/react-sprucebot');

var MyDocument =
/*#__PURE__*/
function (_Document) {
  (0, _inherits2.default)(MyDocument, _Document);

  function MyDocument() {
    (0, _classCallCheck2.default)(this, MyDocument);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MyDocument).apply(this, arguments));
  }

  (0, _createClass2.default)(MyDocument, [{
    key: "render",
    value: function render() {
      var bodyClassName = this.props.config && this.props.config.SLUG ? " skill-".concat(this.props.config.SLUG) : '';
      return _react.default.createElement("html", {
        className: "skill".concat(bodyClassName)
      }, _react.default.createElement(_document.Head, null, _react.default.createElement("title", null, this.props.name), _react.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), _react.default.createElement("link", {
        href: this.props.config && this.props.config.SKILL_STYLESHEET || 'https://hello.sprucebot.com/skills.css',
        rel: "stylesheet",
        type: "text/css",
        charSet: "UTF-8"
      }), _react.default.createElement("link", {
        rel: "stylesheet",
        href: "/_next/static/style.css"
      }), this.props.whitelabel && _react.default.createElement("link", {
        href: this.props.whitelabel,
        rel: "stylesheet",
        type: "text/css",
        charSet: "UTF-8"
      }), this.props.orgWhitelabel && _react.default.createElement("link", {
        href: this.props.orgWhitelabel,
        rel: "stylesheet",
        type: "text/css",
        charSet: "UTF-8"
      })), _react.default.createElement("body", {
        className: bodyClassName
      }, _react.default.createElement(_document.Main, null), _react.default.createElement(_document.NextScript, null)));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var renderPage, query, store, page, _store$getState, auth, config, whitelabel, orgWhitelabel;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                renderPage = _ref.renderPage, query = _ref.query, store = _ref.store;
                page = renderPage(function (App) {
                  return function (props) {
                    return _react.default.createElement(App, props);
                  };
                }); // Store is undefined when hmr is the first
                // request the server sees after boot
                // Ideally store is always defined.
                // Revisit when using `next>5.0.0`

                if (store) {
                  _context.next = 5;
                  break;
                }

                debug('No store in _document');
                return _context.abrupt("return", (0, _objectSpread2.default)({}, page));

              case 5:
                _store$getState = store.getState(), auth = _store$getState.auth, config = _store$getState.config;
                whitelabel = config.WHITELABEL;

                //we have any whitelabelling happening?
                if (auth && auth.Location && auth.Location.Organization && auth.Location.Organization.allowWhiteLabelling && auth.Location.Organization.whiteLabellingStylesheetUrl) {
                  orgWhitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl;
                }

                return _context.abrupt("return", (0, _objectSpread2.default)({}, page, {
                  whitelabel: whitelabel,
                  auth: auth,
                  config: config,
                  orgWhitelabel: orgWhitelabel
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);
  return MyDocument;
}(_document.default);

exports.default = MyDocument;