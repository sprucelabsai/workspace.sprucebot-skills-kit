// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

import Icon from '../Icon/Icon'
import MoreIcon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

export type Props = {
	/** The actions to be shown on tap/click */
	actions: Array<ButtonProps>,

	/** Set true to left align the menu */
	isLeftAligned?: boolean,

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
	isVisible: boolean
}

export default class ContextMenu extends Component<Props, State> {
	ref = React.createRef()
	menuRef = React.createRef()
	state = {
		isVisible: false,
		overflowBottom: false,
		overflowLeft: false
	}

	static defaultProps = {
		isLeftAligned: false,
		isBottomAligned: false,
		isTextOnly: false,
		isSmall: false,
		className: ''
	}

	componentWillUnmount = () => {
		document.removeEventListener('click', this.handleClickOutside, false)
		document.removeEventListener('keyup', this.handleEscape, false)
	}

	handleClickOutside = (e: any) => {
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

				var overflowLeft = false
				var overflowBottom = false

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
					overflowLeft: !prevState.isLeftAligned && overflowLeft,
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
		const { isVisible, overflowBottom, overflowLeft } = this.state
		const {
			actions,
			isLeftAligned,
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
			'context-menu__menu-left': isLeftAligned || overflowLeft,
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
				<VelocityTransitionGroup
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
									btnAction.onClick = payload => {
										this.handleClickAction(payload, oldOnclick)
									}
									btnAction.className = 'context-menu__item-btn'
									return btnAction
								})}
							/>
						</div>
					)}
				</VelocityTransitionGroup>
			</div>
		)
	}
}
