// @flow
import React from 'react'
import cx from 'classnames'
import is from 'is_js'
import Loader from '../Loader/Loader'
import Icon from '../Icon/Icon'
import BasicAnchor from '../_utilities/Anchor'

import type { Node, Element } from 'react'
import type { Props as IconProps } from '../Icon/Icon'

export type Props = {
	/** Optional class to add to the button. */
	className?: string,

	/** Sets the visual appearance of the button. May be primary, secondary, simple, or caution. */
	kind?: string,

	/** Set true to make the button less tall. */
	isSmall?: boolean,

	/** Set true to make the button fill its parent's width. */
	isFullWidth?: boolean,

	/** Set true to hide any text or icon in the button and show a loader instead. */
	isLoading?: boolean,

	/** Set true to hide any text in the button. Text should still be provided for accessibility. */
	isIconOnly?: boolean,

	/** Text for the button. */
	text?: string,

	/** Will render a link. May be relative or absolute. */
	href?: string,

	/** Icon for the button. */
	icon?: Node | IconProps,

	/** Type attribute for HTML button element. Defaults to 'button'. */
	type?: string,

	/** Click handler. */
	onClick?: Function,

	/** Will be passed back with the on click. */
	payload?: Object,

	/** Component used to render anchor */
	AnchorComponent?: Node
}

const Button = (props: Props) => {
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
		payload,
		AnchorComponent = BasicAnchor,
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
		'btn-icon-only': !text || isIconOnly
	})
	const textClass = cx('btn__text', {
		'visually-hidden': isIconOnly
	})

	const handleClick = (e: any) => {
		e.currentTarget.blur()
		if (onClick) {
			onClick(e, props.payload)
		}
	}

	const Inner = () => (
		<span className="btn__inner">
			{icon && (icon.customIcon || icon.name) && (
				<span className="btn__icon-wrapper">
					<Icon
						customIcon={icon.customIcon}
						icon={icon.name}
						isLineIcon={icon.isLineIcon}
						className={cx(
							{
								btn__icon: true,
								'btn__line-icon': icon.isLineIcon
							},
							icon.className
						)}
					/>
				</span>
			)}
			{text && <span className={textClass}>{text}</span>}
			{isLoading && <Loader />}
		</span>
	)

	const button = (
		<button className={btnClass} type={type} onClick={handleClick} {...rest}>
			<Inner />
		</button>
	)

	const anchor = (
		<AnchorComponent href={href} className={btnClass} {...rest}>
			<Inner />
		</AnchorComponent>
	)

	if (!text && !icon) {
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
