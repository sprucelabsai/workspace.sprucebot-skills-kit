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

// const Button = styled.button.attrs({
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

	&:hover {
		background: none;
	}
`

const ControlButton = ({ iconLeft, iconRight, children, ...props }) => {
	return (
		<StyledButton {...props} tabIndex={0} hideLoader>
			{iconLeft && <StyledIconLeft>{iconLeft}</StyledIconLeft>}
			<span>{children}</span>
			{iconRight && <StyledIconRight>{iconRight}</StyledIconRight>}
		</StyledButton>
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
