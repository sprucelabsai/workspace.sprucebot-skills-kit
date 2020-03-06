import {
	IHWButton,
	IHWButtonTypes as ButtonTypes,
	IHWButtonKinds as ButtonKinds,
	IHWAction
} from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { Fragment } from 'react'
import CircleLoader from '../CircleLoader/CircleLoader'
import Icon, { IIconProps } from '../Icon/Icon'
import BasicAnchor from '../_utilities/Anchor'

export {
	IHWButtonKinds as ButtonKinds,
	IHWButtonTypes as ButtonTypes
} from '@sprucelabs/spruce-types'

export interface IButtonProps extends Omit<IHWButton, 'id' | 'icon'> {
	/** Optional ID for view caching */
	id?: string

	/** The kind of button, primary, secondary, etc. */
	kind?: ButtonKinds | null

	/** Submit/Button */
	type?: ButtonTypes | null

	/** Optional class to add to the button. */
	className?: string

	/** Optional children passed into button */
	children?: React.ReactNode

	/** Icon for the button. */
	icon?: IIconProps | null

	/** Click handler. */
	onClick?: Function

	/** Component used to render anchor */
	AnchorComponent?: any

	/** optional target, whatever an anchor tag takes */
	target?: string

	/** optional payload to be sent with onclick (different than the payload attached to action.) */
	payload?: Record<string, any>

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

export type Action = IButtonProps | IHWButton

const Button = (props: IButtonProps | IHWButton): React.ReactElement => {
	const reactHeartwoodProps = props as IButtonProps

	const {
		action,
		AnchorComponent = BasicAnchor,
		children,
		className,
		href,
		icon,
		isFullWidth,
		isIconOnly,
		isLoading,
		isSmall,
		kind,
		onAction,
		onClick,
		text,
		type,
		payload,
		htmlAttributes,
		...rest
	} = reactHeartwoodProps

	const btnClass = cx(className, {
		btn: true,
		'btn-primary': kind === ButtonKinds.Primary,
		'btn-secondary': kind === ButtonKinds.Secondary,
		'btn-caution': kind === ButtonKinds.Caution,
		'btn-simple': kind === ButtonKinds.Simple,
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

		if (onAction && action) {
			onAction(action)
		}

		if (onClick) {
			onClick(e, payload)
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
								id={icon.id}
								customIcon={icon.customIcon}
								name={icon.name}
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
						<CircleLoader
							light={
								kind === ButtonKinds.Primary || kind === ButtonKinds.Caution
							}
						/>
					)}
				</Fragment>
			)}
		</span>
	)

	// TODO: We probably need to create explicit whitelists of what we want to
	// allow to be spread onto native DOM elements, since applying non-standard
	// attributes throws a warning.
	const { isDisabled } = rest

	const button = (
		<button
			className={btnClass}
			type={type || 'button'}
			onClick={handleClick}
			disabled={isDisabled || false}
			{...htmlAttributes}
		>
			<Inner />
		</button>
	)

	const anchor = (
		<AnchorComponent
			href={href}
			className={btnClass}
			onClick={handleClick}
			{...rest}
		>
			<Inner />
		</AnchorComponent>
	)

	if (!children && !text && !icon) {
		// TODO: Handle Logging
		// console.error(
		// 	'<Button /> must have text, icon, or both. Please check the props your passing.'
		// )
		return <Fragment />
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
