import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { H1 } from '../Typography/Typography'
import TrainingGuide from '../TrainingGuide/TrainingGuide'

export default class Onboarding extends Component {
	render() {
		const {
			heading,
			steps,
			onComplete,
			doneButtonLabel,
			onboardingComplete
		} = this.props
		return (
			<div>
				<H1>{heading}</H1>
				<TrainingGuide
					steps={steps}
					onComplete={onComplete}
					doneButtonLabel={doneButtonLabel}
					onboardingComplete={onboardingComplete}
				/>
			</div>
		)
	}
}

Onboarding.propTypes = {
	heading: PropTypes.string.isRequired,
	steps: PropTypes.array.isRequired,
	onComplete: PropTypes.func.isRequired,
	doneButtonLabel: PropTypes.string.isRequired
}
