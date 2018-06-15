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

const Link = styled.a.attrs({
	className: ({ className }) =>
		`ControlButton control-button ${className || ''}`
})`
	align-items: center;
	color: #00aac7;
	cursor: pointer;
	display: inline-flex;
	position: relative;
	text-decoration: none;
`

const Wrapper = ({ href, ...props }) => {
	return <StyledButton {...props} />
}

const ControlButton = ({
	iconLeft,
	iconRight,
	onClick,
	children,
	...props
}) => (
	<Wrapper
		onClick={onClick}
		iconLeft={iconLeft}
		iconRight={iconRight}
		{...props}
		tabIndex={0}
	>
		{iconLeft && <StyledIconLeft>{iconLeft}</StyledIconLeft>}
		<span>{children}</span>
		{iconRight && <StyledIconRight>{iconRight}</StyledIconRight>}
	</Wrapper>
)

ControlButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any,
	className: PropTypes.string,
	iconLeft: PropTypes.string,
	iconRight: PropTypes.string
}

export default ControlButton
