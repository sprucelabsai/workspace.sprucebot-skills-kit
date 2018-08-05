'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ListItem = exports.SortableListItem = exports.SortableList = exports.List = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Avatar = require('../Avatar/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactSortableHoc = require('react-sortable-hoc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var List = exports.List = _styledComponents2.default.div.attrs({
	className: function className(props) {
		return 'List item__list ' + (props.isSortable ? 'sortable__item__list' : '');
	}
}).withConfig({
	displayName: 'List',
	componentId: 's15prkdz-0'
})(['', ';word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;'], function (props) {
	return props.pile ? 'padding-bottom: 1.25em' : void 0;
});

var SortableListContainer = (0, _reactSortableHoc.SortableContainer)(function (_ref) {
	var props = _objectWithoutProperties(_ref, []);

	return _react2.default.createElement(List, _extends({ isSortable: true }, props));
});

var SortableList = function SortableList(_ref2) {
	var props = _objectWithoutProperties(_ref2, []);

	return _react2.default.createElement(SortableListContainer, _extends({ helperClass: 'sortable_list_helper' }, props));
};

exports.SortableList = SortableList;
var ListItemWrapper = _styledComponents2.default.div.attrs({
	className: function className(_ref3) {
		var _className = _ref3.className,
		    online = _ref3.online;
		return (_className || '') + ' ListItemWrapper item__list__item ' + (online ? '' : 'offline');
	}
}).withConfig({
	displayName: 'List__ListItemWrapper',
	componentId: 's15prkdz-1'
})(['display:flex;', ';'], function (props) {
	return props.alignItems ? 'align-items: ' + props.alignItems : 'align-items: center;';
});

var ItemAvatar = _styledComponents2.default.div.attrs({
	className: 'ItemAvatar avatar__outer__wrapper'
}).withConfig({
	displayName: 'List__ItemAvatar',
	componentId: 's15prkdz-2'
})(['position:relative;margin:0 10px 0 0;border-radius:50%;', ';'], function (props) {
	return props.alignItems ? 'align-items: ' + props.alignItems : 'align-items: center;';
});

var ItemDetail = _styledComponents2.default.div.attrs({
	className: 'ItemDetail item__details'
}).withConfig({
	displayName: 'List__ItemDetail',
	componentId: 's15prkdz-3'
})(['flex-grow:1;']);

var ItemRightContent = _styledComponents2.default.div.attrs({
	className: 'ItemRightContent content__right'
}).withConfig({
	displayName: 'List__ItemRightContent',
	componentId: 's15prkdz-4'
})(['text-align:right;display:flex;align-items:flex-end;']);

var ItemTitle = _styledComponents2.default.div.attrs({
	className: 'ItemTitle title'
}).withConfig({
	displayName: 'List__ItemTitle',
	componentId: 's15prkdz-5'
})(['', ';width:', ';', ';'], function (props) {
	return props.weight ? 'font-weight: ' + props.weight : 'font-weight: 500;';
}, function (props) {
	return props.width ? '' + props.width : 'unset';
}, function (props) {
	return props.overflow && '\n\t\toverflow: hidden;\n\t\twhite-space: nowrap;\n\t\ttext-overflow: ellipsis;\n\t';
});

var ItemSubTitle = _styledComponents2.default.div.attrs({
	className: 'ItemSubTitle sub__title'
}).withConfig({
	displayName: 'List__ItemSubTitle',
	componentId: 's15prkdz-6'
})(['font-size:0.75em;']);

var SortableDragHandle = (0, _reactSortableHoc.SortableHandle)(function () {
	return _react2.default.createElement(
		_Icon2.default,
		{ className: 'drag_handle' },
		'drag_handle'
	);
});

var SortableListItem = (0, _reactSortableHoc.SortableElement)(function (_ref4) {
	var isSortable = _ref4.isSortable,
	    props = _objectWithoutProperties(_ref4, ['isSortable']);

	return _react2.default.createElement(ListItem, _extends({ isSortable: isSortable }, props));
});

exports.SortableListItem = SortableListItem;

var ListItem = exports.ListItem = function (_Component) {
	_inherits(ListItem, _Component);

	function ListItem() {
		_classCallCheck(this, ListItem);

		return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
	}

	_createClass(ListItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    title = _props.title,
			    subtitle = _props.subtitle,
			    rightInput = _props.rightInput,
			    rightTitle = _props.rightTitle,
			    rightSubtitle = _props.rightSubtitle,
			    online = _props.online,
			    avatar = _props.avatar,
			    showOnlineIndicator = _props.showOnlineIndicator,
			    alignItems = _props.alignItems,
			    overflow = _props.overflow,
			    width = _props.width,
			    componentAsSubtitle = _props.componentAsSubtitle,
			    onClick = _props.onClick,
			    leftInput = _props.leftInput,
			    isSortable = _props.isSortable,
			    props = _objectWithoutProperties(_props, ['children', 'title', 'subtitle', 'rightInput', 'rightTitle', 'rightSubtitle', 'online', 'avatar', 'showOnlineIndicator', 'alignItems', 'overflow', 'width', 'componentAsSubtitle', 'onClick', 'leftInput', 'isSortable']);

			// build children


			children = children || [];
			if (!Array.isArray(children)) {
				children = [children];
			}

			if (componentAsSubtitle && componentAsSubtitle.length > 0) {
				var _children;

				(_children = children).unshift.apply(_children, _toConsumableArray(componentAsSubtitle));
			} else if (componentAsSubtitle) {
				children.unshift(componentAsSubtitle);
			}

			// setup title/subtitle
			if (subtitle) {
				children.unshift(_react2.default.createElement(
					ItemSubTitle,
					{ key: 'subtitle' },
					subtitle
				));
			}

			if (title) {
				children.unshift(_react2.default.createElement(
					ItemTitle,
					{ overflow: overflow, width: width, key: 'title' },
					title
				));
			}

			return _react2.default.createElement(
				ListItemWrapper,
				props,
				isSortable && _react2.default.createElement(SortableDragHandle, null),
				leftInput && _react2.default.createElement(
					'div',
					{ className: 'left_input' },
					leftInput
				),
				avatar && _react2.default.createElement(
					ItemAvatar,
					{ onClick: onClick, alignItems: alignItems },
					avatar === true ? _react2.default.createElement(_Avatar2.default, {
						className: 'empty',
						online: online,
						showOnlineIndicator: showOnlineIndicator
					}) : _react2.default.createElement(_Avatar2.default, {
						online: online,
						image: avatar,
						showOnlineIndicator: showOnlineIndicator
					})
				),
				children && _react2.default.createElement(
					ItemDetail,
					{ onClick: onClick },
					children
				),
				(rightTitle || rightSubtitle || rightInput) && _react2.default.createElement(
					ItemRightContent,
					{ alignItems: alignItems },
					rightInput && rightInput,
					rightTitle && _react2.default.createElement(
						ItemTitle,
						{ weight: 400 },
						rightTitle
					),
					rightSubtitle && _react2.default.createElement(
						ItemSubTitle,
						null,
						rightSubtitle
					)
				)
			);
		}
	}]);

	return ListItem;
}(_react.Component);

SortableListItem.propTypes = {
	isSortable: _propTypes2.default.bool,
	index: _propTypes2.default.number.isRequired
};

SortableListItem.defaultProps = {
	isSortable: true
};

SortableList.propTypes = {
	onSortEnd: _propTypes2.default.func,
	useDragHandle: _propTypes2.default.bool
};

SortableList.defaultProps = {
	useDragHandle: true
};

ListItem.propTypes = {
	friend: _propTypes2.default.object,
	title: _propTypes2.default.string,
	subtitle: _propTypes2.default.string,
	rightInput: _propTypes2.default.any,
	leftInput: _propTypes2.default.any,
	rightTitle: _propTypes2.default.any,
	rightSubtitle: _propTypes2.default.any,
	online: _propTypes2.default.bool,
	avatar: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
	showOnlineIndicator: _propTypes2.default.bool,
	alignItems: _propTypes2.default.string
};

ListItem.defaultProps = {
	online: true,
	showOnlineIndicator: true
};