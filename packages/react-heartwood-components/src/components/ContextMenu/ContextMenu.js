// @flow
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import { debounce } from 'lodash'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

import MoreIcon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

export type Props = {
	/** The actions to be shown on tap/click */
	actions: Array<ButtonProps>,

	/** DEPRECATED Set true to left align the menu */
	isLeftAligned?: boolean,

	/** Set true to right align the menu */
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
	className?: string,

	onToggleContextMenuVisible?: Function
}

type State = {
	/** Show the menu */
	isVisible: boolean,

	/** Where the menu should be positioned when visible */
	menuPosition: Object,

	overflowBottom: boolean,
	overflowLeft: boolean
}

export default class ContextMenu extends Component<Props, State> {
	ref = React.createRef()
	menuRef = React.createRef()
	portalEl = React.createRef()
	debouncedWindowResize = debounce(() => this.handleWindowResize(), 200)
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

	constructor(props: Props) {
		super(props)

		this.portalEl = document.body
	}

	componentDidMount = () => {
		this.getMenuPlacement()
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', this.debouncedWindowResize, false)
		}
	}

	componentWillUnmount = () => {
		document.removeEventListener('click', this.handleClickOutside, false)
		document.removeEventListener('keyup', this.handleEscape, false)
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.debouncedWindowResize, false)
		}
	}

	handleWindowResize = () => {
		const { isVisible } = this.state
		if (isVisible) {
			this.updateMenuPlacement()
		}
	}

	getTriggerPlacement = () => {
		const triggerPosition =
			this.ref.current && this.ref.current.getBoundingClientRect()

		if (triggerPosition) {
			return triggerPosition
		}

		return null
	}

	getMenuPlacement = () => {
		const { isRightAligned, isBottomAligned } = this.props
		const triggerPosition = this.getTriggerPlacement()

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

		this.setState({
			menuPosition
		})
	}

	updateMenuPlacement = () => {
		const scrollTop =
			document && document.documentElement && document.documentElement.scrollTop
		const triggerPosition = this.getTriggerPlacement()
		const menuBox =
			this.menuRef &&
			this.menuRef.current &&
			this.menuRef.current.getBoundingClientRect()
		const portalBox = this.portalEl && this.portalEl.getBoundingClientRect()
		let overflowLeft = false
		let overflowBottom = false
		let newTop = null
		let newLeft = null

		if (menuBox && portalBox && triggerPosition) {
			if (
				triggerPosition.x + triggerPosition.width + menuBox.width >
				portalBox.width
			) {
				newLeft = triggerPosition.x + triggerPosition.width
				overflowLeft = true
			} else {
				newLeft = triggerPosition.x
			}

			if (
				scrollTop +
					triggerPosition.y +
					triggerPosition.height +
					menuBox.height >
				scrollTop + portalBox.height
			) {
				newTop = scrollTop + triggerPosition.y
				overflowBottom = true
			} else {
				newTop = scrollTop + triggerPosition.y + triggerPosition.height
			}
		}

		this.setState(prevState => ({
			overflowLeft,
			overflowBottom,
			menuPosition: {
				top: newTop || prevState.menuPosition.top,
				left: newLeft || prevState.menuPosition.left
			}
		}))
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

				if (this.state.isVisible) {
					this.updateMenuPlacement()
				}
			}
		)
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
						this.portalEl
					)}
			</div>
		)
	}
}
