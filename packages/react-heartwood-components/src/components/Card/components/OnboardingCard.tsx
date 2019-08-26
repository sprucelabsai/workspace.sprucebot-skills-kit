import React, { Component } from 'react'
import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Button, { ButtonKinds } from '../../Button/Button'
import Tabs from '../../Tabs/Tabs'
import { IButtonProps } from '../../Button/Button'

export interface IStep {
	/** Unique identifier */
	id: string

	/** Title that shows in the tab */
	tabTitle: string

	/** Icon for the tab */
	tabIcon: any

	/** Title that shows in the panel */
	panelTitle: string

	/** Copy describing the step in the card's body */
	panelCopy: string

	/** Primary CTA of this step */
	panelCTA: IButtonProps

	/** Is this step complete? */
	isComplete?: boolean
}

export interface IOnboardingCardProps {
	/** Title of the entire card */
	title: string

	/** Steps for onboarding */
	steps: IStep[]

	/** Optional class to add */
	className?: string
}

interface IOnboardingCardState {
	currentStep: number
}

const getCurrentStep = (steps: IStep[]): number => {
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

export default class OnboardingCard extends Component<
	IOnboardingCardProps,
	IOnboardingCardState
> {
	public state = {
		currentStep: getCurrentStep(this.props.steps)
	}

	public handleClick = (idx: number) => {
		this.setState({
			currentStep: idx
		})
	}

	public render(): React.ReactElement {
		const { currentStep } = this.state
		const { title, steps } = this.props
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
				<CardBody isSectioned isFullBleed={false}>
					{steps[currentStep].panelCopy}
				</CardBody>
				<CardFooter>
					<Button kind={ButtonKinds.Primary} {...steps[currentStep].panelCTA} />
				</CardFooter>
			</Card>
		)
	}
}
