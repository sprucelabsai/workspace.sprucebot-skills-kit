import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paragraph as P } from '../Typography/Typography'
import SK from '../../skillskit'

export default class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedUser: null
		}
	}

	onClick(e) {
		e.preventDefault()
		SK.searchForUser({
			organizationId: this.props.organizationId,
			onCancel: this.onCancelSearch.bind(this),
			onSelectUser: this.onSelectUser.bind(this),
			roles: this.props.roles
		})
		e.target.blur()
	}

	onCancelSearch() {
		if (this.props.onCancel) {
			this.props.onCancel()
		}
	}

	onSelectUser(user) {
		this.props.onSelectUser(user)
	}

	render() {
		const { onCancel, onSelectUser, organizationId, ...props } = this.props
		return (
			<div className="input__wrapper">
				<input {...props} type="search" onClick={this.onClick.bind(this)} />
			</div>
		)
	}
}

Search.propTypes = {
	onCancel: PropTypes.func,
	onSelectUser: PropTypes.func.isRequired,
	roles: PropTypes.string,
	organizationId: PropTypes.string.isRequired
}

Search.defaultProps = {
	roles: ['guest']
}
