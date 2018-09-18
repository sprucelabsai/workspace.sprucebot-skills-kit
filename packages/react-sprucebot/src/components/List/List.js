import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc'

export const List = ({ className, isSortable, ...props }) => {
	return (
		<div
			{...props}
			className={`List item__list ${className ? className : ''} ${
				isSortable ? 'sortable__item__list' : ''
			}`}
		/>
	)
}

const SortableListContainer = SortableContainer(({ ...props }) => {
	return <List isSortable={true} {...props} />
})

export const SortableList = ({ ...props }) => {
	return <SortableListContainer helperClass="sortable_list_helper" {...props} />
}

const SortableDragHandle = SortableHandle(() => (
	<Icon className="drag_handle">drag_handle</Icon>
))

export const SortableListItem = SortableElement(({ isSortable, ...props }) => (
	<ListItem isSortable={isSortable} {...props} />
))

export class ListItem extends Component {
	render() {
		let {
			className,
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
			children.unshift(
				<div {...props} className={`ItemSubTitle sub__title`} key="subtitle">
					{subtitle}
				</div>
			)
		}

		if (title) {
			children.unshift(
				<div
					className={`ItemTitle title`}
					overflow={overflow}
					width={width}
					key="title"
				>
					{title}
				</div>
			)
		}

		return (
			<div
				{...props}
				className={`${className || ''} ListItemWrapper item__list__item ${
					online ? '' : 'offline'
				}`}
			>
				{isSortable && <SortableDragHandle />}
				{leftInput && <div className="left_input">{leftInput}</div>}
				{avatar && (
					<div
						className={`ItemAvatar avatar__outer__wrapper`}
						onClick={onClick}
						alignItems={alignItems}
					>
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
					</div>
				)}
				{children && (
					<div className={`ItemDetail item__details`} onClick={onClick}>
						{children}
					</div>
				)}
				{(rightTitle || rightSubtitle || rightInput) && (
					<div
						className={`ItemRightContent content__right`}
						alignItems={alignItems}
					>
						{rightInput && rightInput}
						{rightTitle && (
							<div className={`ItemTitle title`} weight={400}>
								{rightTitle}
							</div>
						)}
						{rightSubtitle && (
							<div className={`ItemSubTitle sub__title`}>{rightSubtitle}</div>
						)}
					</div>
				)}
			</div>
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
