// @flow
import React from 'react'
import cx from 'classnames'
import Loader from '../Loader/Loader'

type Props = {
	className: string,
	kind: string,
	isSmall: boolean,
	isFullWidth: boolean,
	isLoading: boolean,
	text: string,
	href: string,
	icon: any,
	type?: string,
	onClick?: Function
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
	return href ? anchor : button
}

Button.defaultProps = {
	type: 'button'
}

export default Button
