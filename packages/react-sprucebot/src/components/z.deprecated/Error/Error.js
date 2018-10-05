import React, { Component } from 'react'
import Dialog from '../Dialog/Dialog'
import BotText from '../BotText/BotText'
import Button from '../Button/Button'
import PropTypes from 'prop-types'

export default class Error extends Component {
	render() {
		const { errorMessage, closeErrorDialog, closeErrorDialogTxt } = this.props
		return (
			<Dialog show={!!errorMessage} onTapClose={closeErrorDialog}>
				<BotText>{errorMessage}</BotText>
				<Button onClick={closeErrorDialog}>{closeErrorDialogTxt}</Button>
			</Dialog>
		)
	}
}

Error.propTypes = {
	errorMessage: PropTypes.string,
	closeErrorDialog: PropTypes.func.isRequired,
	closeErrorDialogTxt: PropTypes.string.isRequired
}
