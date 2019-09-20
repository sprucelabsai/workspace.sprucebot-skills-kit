import { IHWAction, IHWActionKinds } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React, { Fragment } from 'react'
import CircleLoader from '../CircleLoader/CircleLoader'
import Icon, { IIconProps } from '../Icon/Icon'
import BasicAnchor from '../_utilities/Anchor'

export { IHWActionKinds as ButtonKinds } from '@sprucelabs/spruce-types'

export interface IButtonProps extends Omit<IHWAction, 'id' | 'icon'> {
	/** Optional ID for view caching */
	id?: string

	/** Optional class to add to the button. */
	className?: string

	/** Optional children passed into button */
	children?: React.ReactNode

	/** Icon for the button. */
	icon?: IIconProps

	/** Click handler. */
	onClick?: Function

	/** Component used to render anchor */
	AnchorComponent?: any

	/** optional target, whatever an anchor tag takes */
	target?: string
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
		'btn-primary': kind === IHWActionKinds.Primary,
		'btn-secondary': kind === IHWActionKinds.Secondary,
		'btn-caution': kind === IHWActionKinds.Caution,
		'btn-simple': kind === IHWActionKinds.Simple,
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
								kind === IHWActionKinds.Primary ||
								kind === IHWActionKinds.Caution
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
	const { disabled } = rest

	const button = (
		<button
			className={btnClass}
			type={type || 'button'}
			onClick={handleClick}
			disabled={disabled || false}
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
