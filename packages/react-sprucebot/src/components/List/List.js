import styled, { css } from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'

export const List = styled.div.attrs({
	className: 'List item__list'
})`
	${props => (props.pile ? 'padding-bottom: 1.25em' : void 0)};
	word-wrap: break-word;
	overflow-wrap: break-word;
	word-break: break-word;
`

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
