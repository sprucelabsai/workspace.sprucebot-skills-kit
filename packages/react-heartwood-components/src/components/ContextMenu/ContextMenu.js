// @flow
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

import MoreIcon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

export type Props = {
	/** The actions to be shown on tap/click */
	actions: Array<ButtonProps>,

	/** Set true to left align the menu */
	isRightAligned?: boolean,

	/** Set true to align menu above button */
	isBottomAligned?: boolean,

	/** Set the width of the menu. Helpful for longer text in buttons */
	size?: 'medium' | 'large',

	/** Adds text to the collapsed menu */
	// NOTE: This should be required for accessibility
	text?: string,

	/** Overrides the default icon */
	icon?: any,

	/** Set true to make the button blue */
	isSimple?: boolean,

	/** Set true to make the button smaller */
	isSmall?: boolean,

	/** Set tot true makes the menu close when any action is selected */
	closeOnSelectAction: boolean,

	/** Hide the icon entirely */
	isTextOnly: boolean,

	/** Optional classname that applies to the button */
	className?: string
}

type State = {
	/** Show the menu */
	isVisible: boolean,

	/** Where the menu should be positioned when visible */
	menuPosition: Object
}

export default class ContextMenu extends Component<Props, State> {
	ref = React.createRef()
	menuRef = React.createRef()
	state = {
		isVisible: false,
		overflowBottom: false,
		overflowLeft: false,
		menuPosition: {
			top: null,
			left: null
		}
	}

	static defaultProps = {
		isRightAligned: false,
		isBottomAligned: false,
		isTextOnly: false,
		isSmall: false,
		className: ''
	}

	componentDidMount = () => {
		this.getMenuPlacement()
	}

	componentWillUnmount = () => {
		document.removeEventListener('click', this.handleClickOutside, false)
		document.removeEventListener('keyup', this.handleEscape, false)
	}

	getMenuPlacement = () => {
		const { isRightAligned, isBottomAligned } = this.props
		const triggerPosition =
			this.ref.current && this.ref.current.getBoundingClientRect()

		// if (typeof document !== 'undefined' && document.body) {
		// 	console.log(document.body.getBoundingClientRect())
		// }

		if (!triggerPosition) {
			return
		}
		const menuPosition = {
			top: isBottomAligned
				? triggerPosition.y
				: triggerPosition.y + triggerPosition.height,
			left: isRightAligned
				? triggerPosition.x + triggerPosition.width
				: triggerPosition.x
		}

		// Decide where to place it

		this.setState({
			menuPosition
		})
	}

	handleClickOutside = () => {
		this.setState(
			{
				isVisible: false
			},
			() => this.manageListeners()
		)
	}

	handleEscape = (e: any) => {
		if (e.key === 'Escape') {
			this.setState(
				{
					isVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	handleToggle = () => {
		this.setState(
			prevState => ({
				isVisible: !prevState.isVisible
			}),
			() => {
				this.manageListeners()

				if (this.props.onToggleContextMenuVisible) {
					this.props.onToggleContextMenuVisible(this.state.isVisible)
				}

				let overflowLeft = false
				let overflowBottom = false

				if (this.menuRef && this.menuRef.current) {
					const overflowParent = this.findOverflowParent(this.menuRef.current)

					if (overflowParent) {
						const overflowBox = overflowParent.getBoundingClientRect()
						const overflowBoxBottom = overflowBox.top + overflowBox.height
						const menuBox = this.menuRef.current.getBoundingClientRect()
						const menuBottom = menuBox.top + menuBox.height

						if (menuBottom > overflowBoxBottom) {
							overflowBottom = true
						} else if (menuBox.left < overflowBox.left) {
							overflowLeft = true
						}
					}
				}

				this.setState(prevState => ({
					overflowLeft: !prevState.isRightAligned && overflowLeft,
					overflowBottom: !prevState.isBottomAligned && overflowBottom
				}))
			}
		)
	}

	findOverflowParent = node => {
		if (node == null || typeof node === 'undefined' || node.nodeType !== 1) {
			return null
		}

		const computedStyle = window.getComputedStyle(node)

		if (computedStyle.overflow !== 'visible') {
			return node
		} else {
			return this.findOverflowParent(node.parentNode)
		}
	}

	manageListeners = () => {
		if (typeof document !== 'undefined') {
			if (this.state.isVisible) {
				document.addEventListener('click', this.handleClickOutside, false)
				document.addEventListener('keyup', this.handleEscape, false)
			} else {
				document.removeEventListener('click', this.handleClickOutside, false)
				document.removeEventListener('keyup', this.handleEscape, false)
			}
		}
	}

	handleClickAction = (payload, callback) => {
		if (this.props.closeOnSelectAction) {
			this.handleToggle()
		}
		callback && callback(payload)
	}

	render() {
		const { isVisible, overflowBottom, overflowLeft, menuPosition } = this.state
		const {
			actions,
			isRightAligned,
			isBottomAligned,
			isSimple,
			isSmall,
			size,
			icon,
			text,
			isTextOnly,
			className
		} = this.props
		const buttonClass = cx('context-menu', className, {
			'context-menu--is-visible': isVisible
		})
		const menuClass = cx('context-menu__menu', {
			'context-menu__menu-left': isRightAligned || overflowLeft,
			'context-menu__menu-large': size === 'large',
			'context-menu__menu-top': isBottomAligned || overflowBottom
		})

		return (
			<div className={buttonClass} ref={this.ref}>
				<Button
					kind={isSimple ? 'simple' : ''}
					className="context-menu__button"
					onClick={this.handleToggle}
					icon={
						!isTextOnly && (icon || { customIcon: MoreIcon, isLineIcon: true })
					}
					text={text}
					isSmall={isSmall}
				/>
				{/* <VelocityTransitionGroup
					enter={{
						animation: { opacity: 1, translateY: '4px' },
						duration: 200
					}}
					leave={{
						animation: { opacity: 0, translateY: '12px' },
						duration: 200
					}}
				>
					{isVisible && (
						<div className={menuClass} ref={this.menuRef}>
							<ButtonGroup
								kind="floating"
								actions={actions.map(action => {
									const btnAction = { ...action }
									const oldOnclick = btnAction.onClick
									btnAction.onClick = () => {
										this.handleClickAction(btnAction.payload, oldOnclick)
									}
									btnAction.className = 'context-menu__item-btn'
									return btnAction
								})}
							/>
						</div>
					)}
				</VelocityTransitionGroup> */}
				{isVisible &&
					createPortal(
						<div
							className={menuClass}
							ref={this.menuRef}
							style={{
								position: 'absolute',
								top: menuPosition.top ? `${menuPosition.top + 4}px` : 'auto',
								left: menuPosition.left ? `${menuPosition.left + 4}px` : 'auto'
							}}
						>
							<ButtonGroup
								kind="floating"
								actions={actions.map(action => {
									const btnAction = { ...action }
									const oldOnclick = btnAction.onClick
									btnAction.onClick = () => {
										this.handleClickAction(btnAction.payload, oldOnclick)
									}
									btnAction.className = 'context-menu__item-btn'
									return btnAction
								})}
							/>
						</div>,
						document.body
					)}
			</div>
		)
	}
}
