import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

// TODO: Convert Button to tsx
// TODO: Convert ButtonGroup to tsx
// TODO: Convert Icon to tsx
// TODO: All above: import types instead of defining them here

interface IIconProps {
	/** The name of the icon to render. If not found, this will return null. */
	icon?: string

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean

	customIcon?: any

	className?: string
}

interface IButtonProps {
	/** Optional class to add to the button. */
	className?: string

	/** Optional children passed into button */
	children?: Node

	/** Sets the visual appearance of the button. May be primary, secondary, simple, or caution. */
	kind?: string

	/** Set true to make the button less tall. */
	isSmall?: boolean

	/** Set true to make the button fill its parent's width. */
	isFullWidth?: boolean

	/** Set true to hide any text or icon in the button and show a loader instead. */
	isLoading?: boolean

	/** Set true to hide any text in the button. Text should still be provided for accessibility. */
	isIconOnly?: boolean

	/** Text for the button. */
	text?: string

	/** Will render a link. May be relative or absolute. */
	href?: string

	/** Icon for the button. */
	icon?: Node | IIconProps

	/** Type attribute for HTML button element. Defaults to 'button'. */
	type?: string

	/** Click handler. */
	onClick?: Function

	/** Will be passed back with the on click. */
	payload?: Record<string, any>

	/** Component used to render anchor */
	AnchorComponent?: Node
}

interface IButtonGroupProps {
	/** The actions to be shown on tap/click */
	actions: IButtonProps[]

	/** DEPRECATED Set true to left align the menu */
	isLeftAligned?: boolean

	/** DEPRECATED Set true to right align the menu */
	isRightAligned?: boolean

	/** DEPRECATED Set true to align menu above button */
	isBottomAligned?: boolean

	/** Set the width of the menu. Helpful for longer text in buttons */
	size?: 'medium' | 'large'

	/** Adds text to the collapsed menu */
	// NOTE: This should be required for accessibility
	text?: string

	/** Overrides the default icon */
	icon?: any

	/** Set true to make the button blue */
	isSimple?: boolean

	/** Set true to make the button smaller */
	isSmall?: boolean

	/** Set tot true makes the menu close when any action is selected */
	closeOnSelectAction: boolean

	/** Hide the icon entirely */
	isTextOnly: boolean

	/** Optional classname that applies to the button */
	className?: string

	onToggleContextMenuVisible?: Function

	/** Optional: Index of the button that is currently highlighted, e.g. by arrow keys */
	highlightedIndex?: number
}

export interface ISplitButtonProps {
	/** The main action readily surfaced to the user */
	defaultAction: IButtonProps

	/** All the secondary nested actions */
	actions: IButtonProps[]

	/*Sets the visual hierarchy of the button **/
	kind: 'primary' | 'secondary'

	/* Set true to fill the parent’s width **/
	isFullWidth?: boolean

	/* Sets the visual hierarchy of the button **/
	isSmall?: boolean
}

interface ISplitButtonState {
	/** Controls whether the actions are visible */
	isVisible: boolean

	/** Where the menu should be positioned */
	menuPosition: {
		top: number
		left: number
		width: number
	}

	/** Which suggestion is highlighted by arrow key navigation */
	highlightedActionIndex: number
}

export default class SplitButton extends Component<
	ISplitButtonProps,
	ISplitButtonState
> {
	private static defaultProps = {
		isFullWidth: false,
		isSmall: false
	}
	public ref = React.createRef<HTMLDivElement>()
	public menuRef = React.createRef<HTMLDivElement>()

	public state = {
		isVisible: false,
		menuPosition: {
			top: 0,
			left: 0,
			width: 0
		},
		highlightedActionIndex: -1
	}

	public componentWillUnmount = () => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', this.handleClickOutside, false)
			document.removeEventListener('keyup', this.onKeyUp, false)
		}
	}

	public handleClickOutside = (e: any) => {
		if (
			!this.ref.current.contains(e.target) &&
			!this.menuRef.current.contains(e.target)
		) {
			this.setState(
				{
					isVisible: false,
					highlightedActionIndex: -1
				},
				() => this.manageListeners()
			)
		}
	}

	public onKeyUp = (e: any) => {
		const { actions } = this.props
		const { highlightedActionIndex } = this.state
		// Down arrow
		if (e.keyCode === 40) {
			// Update the highlighted suggestion
			this.setState(prevState => ({
				highlightedActionIndex:
					prevState.highlightedActionIndex === actions.length - 1
						? 0
						: prevState.highlightedActionIndex + 1
			}))
		}

		// Up arrow
		if (e.keyCode === 38) {
			// Update the highlighted suggestion
			this.setState(prevState => ({
				highlightedActionIndex:
					prevState.highlightedActionIndex <= 0
						? actions.length - 1
						: prevState.highlightedActionIndex - 1
			}))
		}

		// Escape
		if (e.key === 'Escape') {
			this.setState(
				{
					isVisible: false,
					highlightedActionIndex: -1
				},
				() => this.manageListeners()
			)
		}

		// Enter
		if (e.keyCode === 13) {
			// Check if an action is highlighted
			if (highlightedActionIndex > -1) {
				// Trigger it if so
				if (actions[highlightedActionIndex].onClick) {
					actions[highlightedActionIndex].onClick()
				}
				this.toggleActionsVisibility()
			}
		}
	}

	public manageListeners = () => {
		if (typeof document !== 'undefined') {
			if (this.state.isVisible) {
				document.addEventListener('click', this.handleClickOutside, false)
				document.addEventListener('keyup', this.onKeyUp, false)
			} else {
				document.removeEventListener('click', this.handleClickOutside, false)
				document.removeEventListener('keyup', this.onKeyUp, false)
			}
		}
	}

	public getButtonPosition = () => {
		const buttonPosition =
			this.ref.current && this.ref.current.getBoundingClientRect()

		if (buttonPosition) {
			return buttonPosition
		}

		return null
	}

	public getMenuPosition = () => {
		const buttonPosition = this.getButtonPosition()
		const scrollTop =
			typeof document !== 'undefined' &&
			document &&
			document.documentElement &&
			document.documentElement.scrollTop
				? document.documentElement.scrollTop
				: 0

		if (!buttonPosition) {
			return
		}
		const menuPosition = {
			left: buttonPosition.left,
			top: buttonPosition.bottom + scrollTop + 2,
			width: buttonPosition.width
		}

		this.setState({
			menuPosition
		})
	}

	public toggleActionsVisibility = () => {
		this.getMenuPosition()
		this.setState(
			prevState => ({
				isVisible: !prevState.isVisible,
				highlightedActionIndex: prevState.isVisible
					? -1
					: prevState.highlightedActionIndex
			}),
			() => this.manageListeners()
		)
	}

	public render(): React.ReactNode {
		const { defaultAction, actions, kind, isFullWidth, isSmall } = this.props
		const { isVisible, menuPosition, highlightedActionIndex } = this.state

		if (!actions || (actions && actions.length === 0)) {
			// TODO: Warn dev if not in production environment; they might wanna use a different component
			return (
				<Button
					kind={kind}
					isFullWidth={isFullWidth}
					isSmall={isSmall}
					{...defaultAction}
				/>
			)
		}

		return (
			<div
				className={cx('split-button', {
					'split-button--is-full-width': isFullWidth
				})}
				ref={this.ref}
			>
				<Button
					kind={kind}
					isSmall={isSmall}
					className="split-button__default"
					{...defaultAction}
				/>
				<Button
					kind={kind}
					isSmall={isSmall}
					className="split-button__actions"
					icon={{ name: 'keyboard_arrow_down' }}
					onClick={this.toggleActionsVisibility}
				/>
				{typeof document !== 'undefined' &&
					document &&
					document.body &&
					isVisible &&
					createPortal(
						<div
							ref={this.menuRef}
							style={{
								position: 'absolute',
								top: `${menuPosition.top}px`,
								left: `${menuPosition.left}px`,
								width: `${menuPosition.width}px`
							}}
						>
							<ButtonGroup
								kind="floating"
								isFullWidth
								actions={actions}
								highlightedIndex={highlightedActionIndex}
							/>
						</div>,
						document.body
					)}
			</div>
		)
	}
}
