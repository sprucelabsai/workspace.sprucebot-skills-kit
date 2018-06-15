import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Loader extends Component {
	render() {
		const { dark, fullWidth, margin } = this.props
		const dotClassName = dark ? 'loader_dot_dark' : 'loader_dot'
		const fullWidthStyle = fullWidth
			? { display: 'block', margin: '20px', textAlign: 'center' }
			: { margin: margin ? `${margin}` : 'unset' }

		return (
			<span
				className="loader_wrapper"
				style={{
					...fullWidthStyle,
					...this.props.loaderStyle
				}}
			>
				<span className={dotClassName} />
				<span className={dotClassName} />
				<span className={dotClassName} />
			</span>
		)
	}
}

Loader.propTypes = {
	dark: PropTypes.bool,
	fullWidth: PropTypes.bool,
	loaderStyle: PropTypes.object
}

Loader.defaultProps = {
	dark: true,
	fullWidth: true,
	loaderStyle: {}
}
