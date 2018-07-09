import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LoaderWrapper = styled.span.attrs({
	className: `loader_wrapper`
})`
	display: block;
	margin: 20px;
	text-align: center;
	${props => props.fullWidth === false && `margin: unset`};
	${props =>
		props.fullWidth === false && props.margin && `margin: ${props.margin}`};
	${props =>
		props.flex &&
		`
			flex: 2;
			display: flex;
			align-self: center;
			align-items: center;
			justify-content: center;
		`};
`

class Loader extends Component {
	render() {
		const { dark, fullWidth, margin, flex, loaderStyle } = this.props
		const dotClassName = dark ? 'loader_dot_dark' : 'loader_dot'

		return (
			<LoaderWrapper
				style={loaderStyle}
				fullWidth={fullWidth}
				margin={margin}
				flex={flex}
			>
				<span className={dotClassName} />
				<span className={dotClassName} />
				<span className={dotClassName} />
			</LoaderWrapper>
		)
	}
}

export default Loader

Loader.propTypes = {
	dark: PropTypes.bool,
	fullWidth: PropTypes.bool,
	margin: PropTypes.string,
	flex: PropTypes.bool,
	loaderStyle: PropTypes.object
}

Loader.defaultProps = {
	dark: true,
	fullWidth: true,
	loaderStyle: {}
}
