import React, { Fragment } from 'react'
import cx from 'classnames'
import Icon from '../Icon/Icon'
import BasicAnchor from '../_utilities/Anchor'
import CircleLoader from '../CircleLoader/CircleLoader'

export interface IButtonIconProps {
	/** The name of the icon to render. If not found, this will return null. */
	icon?: string

	/** Set true to render an icon with a stroke, but no fill */
	isLineIcon?: boolean

	/** Pass a custom icon to use one that isn't keyed to a name */
	customIcon?: any

	/** Optional classname for the icon */
	className?: string

	/** The name of the icon used to look it up by key */
	name?: string
}

export enum ButtonKinds {
	Primary = 'primary',
	Secondary = 'secondary',
	Simple = 'simple',
	Caution = 'caution'
}

export interface IButtonProps {
	/** Optional class to add to the button. */
	className?: string

	/** Optional children passed into button */
	children?: React.ReactNode

	/** Sets the visual appearance of the button. May be primary, secondary, simple, or caution. */
	kind?: ButtonKinds

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
	icon?: IButtonIconProps

	/** Type attribute for HTML button element. Defaults to 'button'. */
	type?: 'button' | 'submit' | 'reset'

	/** Click handler. */
	onClick?: Function

	/** Will be passed back with the on click. */
	payload?: Record<string, any>

	/** Component used to render anchor */
	AnchorComponent?: any

	/** Set true to disable the button */
	disabled?: boolean
}

const Button = (props: IButtonProps): React.ReactElement => {
	const {
		className,
		kind,
		isSmall,
		isFullWidth,
		isLoading,
		isIconOnly,
		text,
		href,
		icon,
		type,
		onClick,
		AnchorComponent = BasicAnchor,
		children,
		...rest
	} = props
	const btnClass = cx(className, {
		btn: true,
		'btn-primary': kind === 'primary',
		'btn-secondary': kind === 'secondary',
		'btn-caution': kind === 'caution',
		'btn-simple': kind === 'simple',
		'btn-full-width': isFullWidth,
		'btn--loading': isLoading,
		'btn-small': isSmall,
		'btn-icon-only': (!children && !text) || isIconOnly
	})
	const textClass = cx('btn__text', {
		'visually-hidden': isIconOnly
	})

	const handleClick = (e: any): any => {
		e.currentTarget.blur()
		if (onClick) {
			onClick(e, props.payload)
		}
	}

	const Inner = (): React.ReactElement => (
		<span className="btn__inner">
			{children ? (
				children
			) : (
				<Fragment>
					{icon && (icon.customIcon || icon.name) && (
						<span className="btn__icon-wrapper">
							<Icon
								customIcon={icon.customIcon}
								icon={icon.name}
								isLineIcon={icon.isLineIcon}
								className={cx(
									{
										['btn__icon']: true,
										'btn__line-icon': icon.isLineIcon
									},
									icon.className
								)}
							/>
						</span>
					)}
					{text && <span className={textClass}>{text}</span>}
					{isLoading && (
						<CircleLoader light={kind === 'primary' || kind === 'caution'} />
					)}
				</Fragment>
			)}
		</span>
	)

	// TODO: We probably need to create explicit whitelists of what we want to
	// allow to be spread onto native DOM elements, since applying non-standard
	// attributes throws a warning.
	const sanitizedButtonRest = { ...rest }
	// @ts-ignore
	delete sanitizedButtonRest.linkProps

	const button = (
		<button
			className={btnClass}
			type={type}
			onClick={handleClick}
			{...sanitizedButtonRest}
		>
			<Inner />
		</button>
	)

	const anchor = (
		<AnchorComponent href={href} className={btnClass} {...rest}>
			<Inner />
		</AnchorComponent>
	)

	if (!children && !text && !icon) {
		// TODO: Handle Logging
		// console.error(
		// 	'<Button /> must have text, icon, or both. Please check the props your passing.'
		// )
		return null
	}

	return href ? anchor : button
}

Button.defaultProps = {
	className: '',
	kind: '',
	isSmall: false,
	isFullWidth: false,
	isLoading: false,
	isIconOnly: false,
	text: '',
	href: '',
	icon: null,
	type: 'button',
	onClick: () => null
}

export default Button
