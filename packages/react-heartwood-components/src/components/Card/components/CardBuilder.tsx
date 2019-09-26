import {
	IHWCardBuilder,
	IHWCardBuilderBody,
	IHWCardBuilderBodyItem,
	IHWCardBuilderFooter,
	IHWHeading,
	IHWScoreCard
} from '@sprucelabs/spruce-types'
import React from 'react'
// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Button, { IButtonProps } from '../../Button/Button'
import ButtonGroup, { IButtonGroupProps } from '../../ButtonGroup/ButtonGroup'
import Heading from '../../Heading/Heading'
import Image, { IImageProps } from '../../Image/Image'
import List, { IListProps } from '../../List/List'
import Text, { ITextProps } from '../../Text/Text'
import Toast, { IToastProps } from '../../Toast/Toast'
import Card from '../Card'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardHeader, { ICardHeaderProps } from './CardHeader'
import OnboardingCard, { IOnboardingCardProps } from './OnboardingCard'
import Scores from './Scores'

export interface ICardBuilderFooter extends IHWCardBuilderFooter {
	/** Render buttons in the Card Footer */
	buttonGroup?: IButtonGroupProps
}

export type CardBuilderBodyItemViewModel =
	| IButtonProps
	| IImageProps
	| IHWHeading
	| ITextProps
	| IHWScoreCard
	| IToastProps
	| IListProps

export interface ICardBuilderBodyItem
	extends Omit<IHWCardBuilderBodyItem, 'viewModel'> {
	viewModel: CardBuilderBodyItemViewModel
}

export interface ICardBuilderBodyProps
	extends Omit<IHWCardBuilderBody, 'items'> {
	/** array of items to be rendered */
	items?: ICardBuilderBodyItem[]

	/** optional child that will be rendered as the body */
	children?: React.ReactNode
}

export interface ICardBuilderProps
	extends Omit<
		IHWCardBuilder,
		'id' | 'header' | 'onboarding' | 'body' | 'footer' | 'headerImage'
	> {
	/** optional id for view caching */
	id?: string

	/** Card Header props */
	header?: ICardHeaderProps

	/** Image rendered as header */
	headerImage?: IImageProps

	/** all onboarding props */
	onboarding?: IOnboardingCardProps

	/** Card Body props */
	body?: ICardBuilderBodyProps

	/** Card Footer props */
	footer?: ICardBuilderFooter
}

const renderItem = (item: ICardBuilderBodyItem): React.ReactElement => {
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
		Handler({ ...viewModel })
	) : (
		// @ts-ignore
		<Handler {...viewModel} />
	)
}

const CardBuilder = (props: ICardBuilderProps): React.ReactElement => {
	const { header, headerImage, body, footer, onboarding } = props
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
		hasBottomPadding = true,
		children
	} = body || {
		children: undefined,
		items: undefined,
		isSectioned: true,
		isFullBleed: false,
		areSectionSeparatorsVisible: false,
		hasTopPadding: true,
		hasBottomPadding: true
	}

	return (
		<Card>
			{header && <CardHeader {...header} />}
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
					{Array.isArray(items) ? items.map(renderItem) : items}
				</CardBody>
			)}
			{footer && (
				<CardFooter>
					{footer.buttonGroup && <ButtonGroup {...footer.buttonGroup} />}
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
