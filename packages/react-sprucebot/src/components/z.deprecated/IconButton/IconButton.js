import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

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
