import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { H1 } from '../Typography/Typography'
import TrainingGuide from '../TrainingGuide/TrainingGuide'

export default class Onboarding extends Component {
	render() {
		const { heading, steps, onComplete, doneMsg } = this.props
		return (
			<div>
				<H1>{heading}</H1>
				<TrainingGuide
					steps={steps}
					onComplete={onComplete}
					doneButtonLabel={doneMsg}
				/>
			</div>
		)
	}
}

Onboarding.propTypes = {
	heading: PropTypes.string.isRequired,
	steps: PropTypes.array.isRequired,
	onComplete: PropTypes.func.isRequired,
	doneMsg: PropTypes.string.isRequired
}
