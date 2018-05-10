import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon/Icon'

const Button = styled.button.attrs({
	className: ({ className }) => `IconButton icon-button ${className || ''}`
})`
	align-items: center;
	background: none;
	color: #00aac7;
	display: flex;
	font-size: ${props => props.fontSize ? `${props.fontSize}` : '2em'};
	margin: 0;
	padding: 0;
	width: auto;

	&:hover {
		background: none;
	}
`

const IconButton = ({ onClick, children, ...props }) => (
	<Button onClick={onClick} {...props}>
		<Icon fontSize={props.fontSize}>{children}</Icon>
	</Button>
)

IconButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any
}

export default IconButton
