// @flow
import React from 'react'
import type { Node, Element } from 'react'
import cx from 'classnames'
import Loader from '../Loader/Loader'

export interface Props {
	className?: string;
	kind?: string;
	isSmall?: boolean;
	isFullWidth?: boolean;
	isLoading?: boolean;
	text?: string;
	href?: string;
	// TODO: Set a proper Flow type for inline svg
	icon?: any;
	type?: string;
	onClick?: Function;
}

const Button = (props: Props) => {
	const {
		className,
		kind,
		isSmall,
		isFullWidth,
		isLoading,
		text,
		href,
		icon,
		type,
		onClick,
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
		'btn-icon-only': !text
	})

	const handleClick = (e: any) => {
		e.currentTarget.blur()
		if (onClick) {
			onClick()
		}
	}

	const Inner = () => (
		<span className="btn__inner">
			{icon && (
				<span className="btn__icon-wrapper">
					{React.cloneElement(icon, {
						className: cx('btn__icon', icon.props.className)
					})}
				</span>
			)}
			{text && <span className="btn__text">{text}</span>}
			{isLoading && <Loader />}
		</span>
	)

	const button = (
		<button className={btnClass} type={type} onClick={handleClick} {...rest}>
			<Inner />
		</button>
	)

	const anchor = (
		<a href={href} className={btnClass} {...rest}>
			<Inner />
		</a>
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
	text: '',
	href: '',
	icon: null,
	type: 'button',
	onClick: () => null
}

export default Button
