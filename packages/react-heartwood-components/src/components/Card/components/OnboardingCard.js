// @flow
import React, { Component } from 'react'
import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Button from '../../Button/Button'
import Tabs from '../../Tabs/Tabs'
import type { Props as ButtonProps } from '../../Button/Button'

export type Step = {
	/** Unique identifier */
	id: string,

	/** Title that shows in the tab */
	tabTitle: string,

	/** Title that shows in the panel */
	panelTitle: string,

	/** Copy describing the step in the card's body */
	panelCopy: string,

	/** Primary CTA of this step */
	panelCTA: ButtonProps
}

export type Props = {
	/** Title of the entire card */
	title: string,

	/** Steps for onboarding */
	steps: Array<Step>,

	/** Optional class to add */
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
					{tabs && <Tabs tabs={tabs} isPadded={false} isTruncatable={false} />}
				</div>
				<CardHeader title={steps[currentStep].panelTitle} />
				<CardBody isSectioned>{steps[currentStep].panelCopy}</CardBody>
				<CardFooter>
					<Button kind="primary" {...steps[currentStep].panelCTA} />
				</CardFooter>
			</Card>
		)
	}
}
