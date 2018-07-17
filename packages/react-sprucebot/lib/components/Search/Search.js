'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Typography = require('../Typography/Typography');

var _skillskit = require('../../skillskit');

var _skillskit2 = _interopRequireDefault(_skillskit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
	_inherits(Search, _Component);

	function Search(props) {
		_classCallCheck(this, Search);

		var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

		_this.state = {
			selectedUser: null
		};
		return _this;
	}

	_createClass(Search, [{
		key: 'onClick',
		value: function onClick(e) {
			e.preventDefault();
			_skillskit2.default.searchForUser({
				locationId: this.props.locationId,
				onCancel: this.onCancelSearch.bind(this),
				onSelectUser: this.onSelectUser.bind(this),
				roles: this.props.roles
			});
			e.target.blur();
		}
	}, {
		key: 'onCancelSearch',
		value: function onCancelSearch() {
			if (this.props.onCancel) {
				this.props.onCancel();
			}
		}
	}, {
		key: 'onSelectUser',
		value: function onSelectUser(user) {
			this.props.onSelectUser(user);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    onCancel = _props.onCancel,
			    onSelectUser = _props.onSelectUser,
			    locationId = _props.locationId,
			    props = _objectWithoutProperties(_props, ['onCancel', 'onSelectUser', 'locationId']);

			return _react2.default.createElement(
				'div',
				{ className: 'input__wrapper search__wrapper' },
				_react2.default.createElement('input', _extends({}, props, { type: 'search', onClick: this.onClick.bind(this) }))
			);
		}
	}]);

	return Search;
}(_react.Component);

exports.default = Search;


Search.propTypes = {
	onCancel: _propTypes2.default.func,
	onSelectUser: _propTypes2.default.func.isRequired,
	roles: _propTypes2.default.array,
	locationId: _propTypes2.default.string.isRequired
};

Search.defaultProps = {
	roles: ['guest']
};