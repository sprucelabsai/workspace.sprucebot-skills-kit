// @flow
import React, { Component } from 'react'
import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Button from '../../Button/Button'
import Tabs from '../../Tabs/Tabs'
import type { Props as ButtonProps } from '../../Button/Button'

type Step = {
	id: string,
	tabTitle: string,
	panelTitle: string,
	panelCopy: string,
	panelCTA: ButtonProps
}
type Props = {
	title: string,
	steps: Array<Step>,
	className?: string
}
type State = {
	currentStep: number
}

const getCurrentStep = (steps: Array<Step>) => {
	// Find the first step that is not complete
	if (steps && steps.length > 0) {
		for (let i = 0; i < steps.length; i++) {
			if (!steps[i].isComplete) {
				return i
			}
		}
	}
	return 0
}

export default class OnboardingCard extends Component<Props, State> {
	state = {
		currentStep: getCurrentStep(this.props.steps)
	}

	handleClick = (idx: number) => {
		this.setState({
			currentStep: idx
		})
	}

	render() {
		const { currentStep } = this.state
		const { title, steps, className } = this.props
		const tabs = steps.map((step, idx) => ({
			text: step.tabTitle,
			icon: step.tabIcon,
			isCurrent: idx === currentStep,
			onClick: () => this.handleClick(idx),
			className: step.isComplete && 'tab--is-complete'
		}))

		return (
			<Card className="onboarding-card">
				<div className="onboarding-card__header">
					<p className="onboarding-card__title">{title}</p>
					{tabs && <Tabs tabs={tabs} />}
				</div>
				<CardHeader title={steps[currentStep].panelTitle} />
				<CardBody>{steps[currentStep].panelCopy}</CardBody>
				<CardFooter>
					<Button kind="primary" {...steps[currentStep].panelCTA} />
				</CardFooter>
			</Card>
		)
	}
}
