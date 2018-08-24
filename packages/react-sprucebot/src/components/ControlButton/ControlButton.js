import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

const ControlButton = ({ iconLeft, iconRight, children, ...props }) => {
	return (
		<Button
			{...props}
			className={`ControlButton control__button ${className || ''}`}
			tabIndex={0}
			hideLoader
		>
			{iconLeft && <Icon className={`icon__left`}>{iconLeft}</Icon>}
			<span>{children}</span>
			{iconRight && <Icon className={`icon__right`}>{iconRight}</Icon>}
		</Button>
	)
}

ControlButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any,
	className: PropTypes.string,
	iconLeft: PropTypes.string,
	iconRight: PropTypes.string
}

export default ControlButton
