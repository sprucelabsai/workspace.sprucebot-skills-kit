import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from '../Select/Select'

class DevControls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false
		}
	}
	onChangeRole = role => {
		window.location.href = `/dev/${role}/redirect`
	}
	componentDidMount() {
		this.setState({
			loaded: true
		})
	}
	render() {
		// don't render until loaded
		if (!this.state.loaded) {
			return null
		}

		const { className } = this.props
		const props = Object.assign({}, this.props)
		let { auth } = props

		// cleanup props
		delete props.auth

		//easy bail if not auth'ed
		if (!auth || auth.error || !auth.role) {
			return (
				<div {...props} className={`dev_controls__no_auth ${className || ''}`}>
					<div className="error">
						{`You're gonna wanna be logged in for this. 🙏`}
					</div>
				</div>
			)
		}

		return (
			<div {...props} className={`dev_controls ${className || ''}`}>
				<Select
					className={`select`}
					label="Jump to Role"
					onChange={this.onChangeRole}
				>
					<option value="">{`Current: ${auth.role}`}</option>
					<option value="owner">Owner</option>
					<option value="teammate">Teammate</option>
					<option value="guest">Guest</option>
				</Select>
			</div>
		)
	}
}

DevControls.propTypes = {
	auth: PropTypes.object
}

export default DevControls
