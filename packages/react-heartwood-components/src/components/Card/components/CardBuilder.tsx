import {
	IHWAction,
	IHWCardBuilder,
	IHWCardBuilderBody,
	IHWCardBuilderBodyItem,
	IHWCardBuilderFooter
} from '@sprucelabs/spruce-types'
import React from 'react'
import { unionArray } from '../../..'
// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Button from '../../Button/Button'
import ButtonGroup from '../../ButtonGroup/ButtonGroup'
import Heading from '../../Heading/Heading'
import Image from '../../Image/Image'
import List from '../../List/List'
import Text from '../../Text/Text'
import Toast from '../../Toast/Toast'
import Card from '../Card'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'
import OnboardingCard from './OnboardingCard'
import Scores from './Scores'

// TODO: These three interfaces are deprecated; they were made for the
// sake of overriding core type values but we're no longer doing that.
export interface ICardBuilderFooter extends IHWCardBuilderFooter {}
export interface ICardBuilderBodyItem extends IHWCardBuilderBodyItem {}
export interface ICardBuilderBodyProps extends IHWCardBuilderBody {
	/** optional child that will be rendered as the body */
	children?: React.ReactNode
}

export interface ICardBuilderProps extends IHWCardBuilder {
	body?: IHWCardBuilder['body'] & { children?: any } | null

	/** so we can use directly and set our own children */
	children?: React.ReactNode

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const renderItem = (
	item: ICardBuilderBodyItem | IHWCardBuilderBodyItem,
	onAction?: (action: IHWAction) => any
): React.ReactElement => {
	const CardBuilderKey = {
		CardBodyButton: Button,
		CardBodyImage: Image,
		CardBodyHeading: Heading,
		CardBodyText: Text,
		CardBodyList: List,
		CardBodyScores: Scores,
		CardBodyToast: Toast,
		button: Button,
		image: Image,
		heading: Heading,
		text: Text,
		list: List,
		scoreCard: Scores,
		toast: Toast
	}

	const { type, viewModel } = item
	const Handler = CardBuilderKey[type]

	if (!Handler) {
		return <div>Could not render type ${type}.</div>
	}

	return typeof Handler.prototype === 'undefined' ||
		!Handler.prototype.render ? (
		// TODO figure out why these don't pass
		// @ts-ignore
		Handler({ ...viewModel, onAction })
	) : (
		// @ts-ignore
		<Handler {...viewModel} onAction={onAction} />
	)
}

const CardBuilder = (props: ICardBuilderProps): React.ReactElement => {
	const { header, headerImage, body, footer, onboarding, onAction } = props
	if (onboarding) {
		return <OnboardingCard {...onboarding} />
	}

	// NOTE: Destructuring stopped working after tsx conversion
	const {
		items,
		isSectioned = true,
		isFullBleed = false,
		areSectionSeparatorsVisible = false,
		hasTopPadding = true,
		hasBottomPadding = true
	} = body || {
		items: undefined,
		isSectioned: true,
		isFullBleed: false,
		areSectionSeparatorsVisible: false,
		hasTopPadding: true,
		hasBottomPadding: true
	}

	const { children } = body || { children: undefined }

	return (
		<Card>
			{header && <CardHeader {...header} onAction={onAction} />}
			{headerImage && <Image {...headerImage} />}
			{(items || children) && (
				<CardBody
					hasBottomPadding={hasBottomPadding === null ? true : hasBottomPadding}
					hasTopPadding={hasTopPadding === null ? true : hasTopPadding}
					areSectionSeparatorsVisible={
						areSectionSeparatorsVisible === null
							? false
							: areSectionSeparatorsVisible
					}
					isSectioned={!!isSectioned}
					isFullBleed={!!isFullBleed}
				>
					{children}
					{Array.isArray(items)
						? unionArray(items).map(item => renderItem(item, onAction))
						: items}
				</CardBody>
			)}
			{footer && (
				<CardFooter>
					{footer.buttonGroup && (
						<ButtonGroup {...footer.buttonGroup} onAction={onAction} />
					)}
					{footer.helper && (
						<div className={'card__footer__helper'}>{footer.helper}</div>
					)}
				</CardFooter>
			)}
		</Card>
	)
}

CardBuilder.defaultProps = {
	footer: null
}

export default CardBuilder
