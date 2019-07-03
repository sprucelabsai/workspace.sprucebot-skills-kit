import React from 'react'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

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

const SplitButton = (props: ISplitButtonProps): React.ReactNode => {
	const { defaultAction, actions, kind, isFullWidth, isSmall } = props
	return (
		<div className="split-button">
			<Button
				kind={kind}
				className="split-button__default"
				{...defaultAction}
			/>
			<Button
				kind={kind}
				className="split-button__actions"
				icon={{ name: 'keyboard_arrow_down' }}
			/>
		</div>
	)
}

SplitButton.defaultProps = {
	isFullWidth: false,
	isSmall: false
}

export default SplitButton
