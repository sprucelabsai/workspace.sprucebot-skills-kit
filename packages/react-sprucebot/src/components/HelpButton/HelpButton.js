import React, { Component } from 'react'
import IconButton from '../IconButton/IconButton'
import PropTypes from 'prop-types'

export default class HelpButton extends Component {
	render() {
		const { title, body = '' } = this.props
		return (
			<IconButton
				onClick={() => {
					this.props.skill.showHelp({
						title,
						body
					})
				}}
			>
				help
			</IconButton>
		)
	}
}

HelpButton.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string
}
