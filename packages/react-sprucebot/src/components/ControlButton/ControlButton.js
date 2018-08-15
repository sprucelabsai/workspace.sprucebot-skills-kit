import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

const StyledIconLeft = styled(Icon)`
	margin-right: 0.25em;
`

const StyledIconRight = styled(Icon)`
	margin-left: 0.25em;
`

const StyledButton = styled(Button).attrs({
	className: ({ className }) =>
		`ControlButton control-button ${className || ''}`
})`
	align-items: center;
	background: none;
	color: #00aac7;
	display: inline-flex;
	font-weight: normal;
	letter-spacing: 0;
	position: relative;
	margin: 0;
	padding: 0;
	width: auto;
	text-decoration: none;

	&:hover {
		background: none;
	}
`

const ControlButton = ({ iconLeft, iconRight, children, ...props }) => {
	return (
		<Button
			{...props}
			className={`ControlButton control-button ${className || ''}`}
			tabIndex={0}
			hideLoader
		>
			{iconLeft && <Icon>{iconLeft}</Icon>}
			<span>{children}</span>
			{iconRight && <Icon>{iconRight}</Icon>}
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
