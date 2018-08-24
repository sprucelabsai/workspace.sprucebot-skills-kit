import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

const StyledButton = styled(Button)`
	align-items: center;
	background: none;
	color: #00aac7;
	display: flex;
	font-size: ${props => (props.fontSize ? `${props.fontSize}` : '2em')};
	margin: 0;
	padding: 0;
	text-decoration: none;
	width: auto;

	&:hover {
		background: none;
	}
`

const IconButton = ({ children, className, loaderStyle, ...props }) => (
	<Button
		loaderDark
		loaderStyle={{
			fontSize: '.5em',
			...loaderStyle
		}}
		{...props}
		className={`IconButton icon__button ${className || ''}`}
	>
		<Icon fontSize={props.fontSize}>{children}</Icon>
	</Button>
)

IconButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any
}

export default IconButton
