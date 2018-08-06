import styled, { css, injectGlobal } from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc'

export const List = styled.div.attrs({
	className: props =>
		`List item__list ${props.isSortable ? 'sortable__item__list' : ''}`
})`
	${props => (props.pile ? 'padding-bottom: 1.25em' : void 0)};
	word-wrap: break-word;
	overflow-wrap: break-word;
	word-break: break-word;
`

const SortableListContainer = SortableContainer(({ ...props }) => {
	return <List isSortable={true} {...props} />
})

export const SortableList = ({ ...props }) => {
	return <SortableListContainer helperClass="sortable_list_helper" {...props} />
}

const ListItemWrapper = styled.div.attrs({
	className: ({ className, online }) =>
		`${className || ''} ListItemWrapper item__list__item ${
			online ? '' : 'offline'
		}`
})`
	display: flex;
	${props =>
		props.alignItems
			? `align-items: ${props.alignItems}`
			: 'align-items: center;'};
`

const ItemAvatar = styled.div.attrs({
	className: 'ItemAvatar avatar__outer__wrapper'
})`
	position: relative;
	margin: 0 10px 0 0;
	border-radius: 50%;
	${props =>
		props.alignItems
			? `align-items: ${props.alignItems}`
			: 'align-items: center;'};
`

const ItemDetail = styled.div.attrs({
	className: 'ItemDetail item__details'
})`
	flex-grow: 1;
`

const ItemRightContent = styled.div.attrs({
	className: 'ItemRightContent content__right'
})`
	text-align: right;
	display: flex;
	align-items: flex-end;
`

const ItemTitle = styled.div.attrs({
	className: 'ItemTitle title'
})`
	${props =>
		props.weight ? `font-weight: ${props.weight}` : `font-weight: 500;`};
	width: ${props => (props.width ? `${props.width}` : 'unset')};
	${props =>
		props.overflow &&
		`
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	`};
`

const ItemSubTitle = styled.div.attrs({
	className: 'ItemSubTitle sub__title'
})`
	font-size: 0.75em;
`

const SortableDragHandle = SortableHandle(() => (
	<Icon className="drag_handle">drag_handle</Icon>
))

export const SortableListItem = SortableElement(({ isSortable, ...props }) => (
	<ListItem isSortable={isSortable} {...props} />
))

export class ListItem extends Component {
	render() {
		let {
			children,
			title,
			subtitle,
			rightInput,
			rightTitle,
			rightSubtitle,
			online,
			avatar,
			showOnlineIndicator,
			alignItems,
			overflow,
			width,
			componentAsSubtitle,
			onClick,
			leftInput,
			isSortable,
			...props
		} = this.props

		// build children
		children = children || []
		if (!Array.isArray(children)) {
			children = [children]
		}

		if (componentAsSubtitle && componentAsSubtitle.length > 0) {
			children.unshift(...componentAsSubtitle)
		} else if (componentAsSubtitle) {
			children.unshift(componentAsSubtitle)
		}

		// setup title/subtitle
		if (subtitle) {
			children.unshift(<ItemSubTitle key="subtitle">{subtitle}</ItemSubTitle>)
		}

		if (title) {
			children.unshift(
				<ItemTitle overflow={overflow} width={width} key="title">
					{title}
				</ItemTitle>
			)
		}

		return (
			<ListItemWrapper {...props}>
				{isSortable && <SortableDragHandle />}
				{leftInput && <div className="left_input">{leftInput}</div>}
				{avatar && (
					<ItemAvatar onClick={onClick} alignItems={alignItems}>
						{avatar === true ? (
							<Avatar
								className="empty"
								online={online}
								showOnlineIndicator={showOnlineIndicator}
							/>
						) : (
							<Avatar
								online={online}
								image={avatar}
								showOnlineIndicator={showOnlineIndicator}
							/>
						)}
					</ItemAvatar>
				)}
				{children && <ItemDetail onClick={onClick}>{children}</ItemDetail>}
				{(rightTitle || rightSubtitle || rightInput) && (
					<ItemRightContent alignItems={alignItems}>
						{rightInput && rightInput}
						{rightTitle && <ItemTitle weight={400}>{rightTitle}</ItemTitle>}
						{rightSubtitle && <ItemSubTitle>{rightSubtitle}</ItemSubTitle>}
					</ItemRightContent>
				)}
			</ListItemWrapper>
		)
	}
}

SortableListItem.propTypes = {
	isSortable: PropTypes.bool,
	index: PropTypes.number.isRequired
}

SortableListItem.defaultProps = {
	isSortable: true
}

SortableList.propTypes = {
	onSortEnd: PropTypes.func,
	useDragHandle: PropTypes.bool
}

SortableList.defaultProps = {
	useDragHandle: true
}

ListItem.propTypes = {
	friend: PropTypes.object,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	rightInput: PropTypes.any,
	leftInput: PropTypes.any,
	rightTitle: PropTypes.any,
	rightSubtitle: PropTypes.any,
	online: PropTypes.bool,
	avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	showOnlineIndicator: PropTypes.bool,
	alignItems: PropTypes.string
}

ListItem.defaultProps = {
	online: true,
	showOnlineIndicator: true
}
