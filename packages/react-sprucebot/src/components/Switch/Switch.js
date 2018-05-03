import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Switch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			on: !!props.on
		}

		this.onChange = this.onChange.bind(this)
	}
	onChange(e) {
		// toggle on state of button
		this.setState((prevState, props) => {
			// new 'on' state
			let on = !prevState.on

			// let any callbacks know of state change
			if (this.props.onChange) {
				this.props.onChange(on, e)
			}

			return {
				on: on
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ on: nextProps.on })
	}

	render() {
		return (
			<div className={`switch switch${this.props.on ? ' on' : ''}`}>
				<button onClick={() => this.onChange()}>
					<span>{this.props.on ? 'Enabled' : 'Disabled'}</span>
				</button>
			</div>
		)
	}
}

Switch.propTypes = {
	on: PropTypes.bool,
	onChange: PropTypes.func
}

Switch.defaultProps = {
	on: false
}
