import React, { Component } from 'react'
import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Tabs from '../../Tabs/Tabs'
import Button, { IButtonProps, ButtonKinds } from '../../Button/Button'
import {
	IHWOnboardingCard,
	IHWOnboardingCardStep
} from '@sprucelabs/spruce-types'
import { IIconProps } from '../../Icon/Icon'
import { unionArray } from '../../..'

export interface IStep
	extends Omit<IHWOnboardingCardStep, 'panelCTA' | 'tabIcon'> {
	/** Primary CTA of this step */
	panelCTA?: IButtonProps | null

	tabIcon?: IIconProps | null
}

export interface IOnboardingCardProps extends Omit<IHWOnboardingCard, 'steps'> {
	/** Steps for onboarding */
	steps: IStep[]

	/** Optional class to add */
	className?: string
}

interface IOnboardingCardState {
	currentStep: number
}

const getCurrentStep = (steps: IStep[] | IHWOnboardingCardStep[]): number => {
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
	IOnboardingCardProps | IHWOnboardingCard,
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
		const tabs = unionArray(steps).map((step, idx) => ({
			text: step.tabTitle,
			icon: step.tabIcon,
			isCurrent: idx === currentStep,
			onClick: () => this.handleClick(idx),
			className: step.isComplete ? 'tab--is-complete' : ''
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
				{steps[currentStep].panelCTA && (
					<CardFooter>
						<Button
							kind={ButtonKinds.Primary}
							{...steps[currentStep].panelCTA}
						/>
					</CardFooter>
				)}
			</Card>
		)
	}
}
