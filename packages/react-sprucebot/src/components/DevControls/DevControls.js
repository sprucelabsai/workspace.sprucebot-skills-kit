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
	onChangeRole(role) {
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

		const props = Object.assign({}, this.props)
		let { auth } = props

		// cleanup props
		delete props.auth

		//easy bail if not auth'ed
		if (!auth || auth.error || !auth.role) {
			return (
				<div {...props}>
					<div className="error">
						You're gonna wanna be logged in for this. 🙏
					</div>
				</div>
			)
		}

		return (
			<div {...props}>
				<Select label="Jump to Role" onChange={this.onChangeRole.bind(this)}>
					<option value="">Current: {auth.role}</option>
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

export default styled(DevControls)`
	-webkit-transition: all 0.5s ease-out;
	-moz-transition: all 0.5s ease-out;
	-ms-transition: all 0.5s ease-out;
	-o-transition: all 0.5s ease-out;
	transition: all 0.5s ease-out;

	&:hover {
		opacity: 1;
	}
	position: absolute;
	background-color: #000;
	color: #fff;
	padding: 20px;
	opacity: 0.1;
	.input__wrapper {
		margin: 0;
		padding-top: 15px;
		white-space: nowrap;
	}
	select {
		margin: 0;
		display: inline;
		padding: 10px;
		height: auto;
		border-radius: 5px;
		background: #fff;
		width: auto;
	}
`
