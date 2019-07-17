// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'
import { pick } from 'lodash'

import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'

// COMPONENTS THAT CAN GO INTO THIS COMPONENT, KEEP MINIMAL
import Button from '../../Button/Button'
import Heading from '../../Heading/Heading'
import Text from '../../Text/Text'
import Image from '../../Image/Image'
import List from '../../List/List'
import Scores from './Scores'
import OnboardingCard from './OnboardingCard'
import ButtonGroup from '../../ButtonGroup/ButtonGroup'
import Toast from '../../Toast/Toast'

import type { Props as ButtonProps } from '../../Button/Button'
import type { CardHeaderProps } from './CardHeader'
import type { CardBodyProps } from './CardBody'
import type { Props as OnboardingProps } from './OnboardingCard'

export type CardBuilderProps = {
	/** Card Header props */
	header?: CardHeaderProps,

	/** optionally pass props to an image tag to be rendered in the header */
	headerImage?: Object,

	/** all onboarding props */
	onboarding?: OnboardingProps,

	/** Card Body props */
	body?: CardBodyProps,

	/** Card Footer props */
	footer?: {
		/** Render buttons in the Card Footer */
		actions: Array<ButtonProps>
	}
}

const renderChild = child => {
	const CardBuilderKey: {
		CardBodyButton: any,
		CardBodyImage: any,
		CardBodyHeading: any,
		CardBodyText: any,
		CardBodyList: any,
		CardBodyScores: any,
		CardBodyToast: any,
		button: any,
		image: any,
		heading: any,
		text: any,
		list: any,
		scores: any,
		toast: any
	} = {
		CardBodyButton: {
			component: Button,
			mapProps: child => ({
				...pick(child, [
					'key',
					'className',
					'kind',
					'isSmall',
					'isFullWidth',
					'isLoading',
					'isIconOnly',
					'text',
					'href',
					'icon',
					'target',
					'payload'
				]),
				...child.props
			})
		},
		CardBodyImage: {
			component: Image,
			mapProps: child => ({
				...pick(child, ['key', 'src', 'type']),
				...child.props
			})
		},
		CardBodyHeading: {
			component: Heading,
			mapProps: child => ({
				...pick(child, ['key', 'title', 'subtitle']),
				...child.props
			})
		},
		CardBodyText: {
			component: Text,
			mapProps: child => ({
				...pick(child, ['key']),
				...child.props,
				children: child.text
			})
		},
		CardBodyList: {
			component: List,
			mapProps: child => ({
				...pick(child, ['key', 'items', 'heading']),
				...child.props
			})
		},
		CardBodyScores: {
			component: Scores,
			mapProps: child => ({
				...pick(child, ['key', 'scores']),
				...child.props
			})
		},
		CardBodyToast: {
			component: Toast,
			mapProps: child => {
				console.log({ child })
				return {
					...pick(child, ['key', 'headline', 'text', 'kind']),
					...child.props
				}
			}
		},
		button: null,
		image: null,
		heading: null,
		text: null,
		list: null,
		scores: null,
		toast: null
	}

	// map to simple type names for imperative usage
	CardBuilderKey.button = CardBuilderKey.CardBodyButton
	CardBuilderKey.image = CardBuilderKey.CardBodyImage
	CardBuilderKey.heading = CardBuilderKey.CardBodyHeading
	CardBuilderKey.text = CardBuilderKey.CardBodyText
	CardBuilderKey.list = CardBuilderKey.CardBodyList
	CardBuilderKey.scores = CardBuilderKey.CardBodyScores
	CardBuilderKey.toast = CardBuilderKey.CardBodyToast

	const Type = (child &&
		(child.__typename || child.type) &&
		CardBuilderKey[child.__typename || child.type]) || {
		component: Text,
		mapProps: child => ({ ...child, ...child.props })
	}

	const { component, mapProps } = Type
	const Handler = component
	const props = mapProps(child)
	console.log({ component, props, Handler })

	return typeof Handler.prototype === 'undefined' ||
		!Handler.prototype.render ? (
		Handler({ ...props })
	) : (
		<Handler {...props} />
	)
}

const CardBuilder = (props: CardBuilderProps) => {
	const { header, headerImage, body, footer, onboarding } = props
	if (onboarding) {
		return <OnboardingCard {...onboarding} />
	}
	const { children, isSectioned = true } = body || {}
	return (
		<Card>
			{header && <CardHeader {...header} />}
			{headerImage && <Image {...headerImage} />}
			{children && (
				<CardBody isSectioned={isSectioned}>
					{Array.isArray(children) ? children.map(renderChild) : children}
				</CardBody>
			)}
			{footer && (
				<CardFooter>
					{footer.actions && <ButtonGroup {...footer} />}
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
