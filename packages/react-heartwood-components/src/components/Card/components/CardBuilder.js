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

const CardBuilderKey = {
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
	}
}

CardBuilderKey.button = CardBuilderKey.CardBodyButton
CardBuilderKey.image = CardBuilderKey.CardBodyImage
CardBuilderKey.heading = CardBuilderKey.CardBodyHeading
CardBuilderKey.text = CardBuilderKey.CardBodyText
CardBuilderKey.list = CardBuilderKey.CardBodyList
CardBuilderKey.scores = CardBuilderKey.CardBodyScores

const renderChild = child => {
	const Type = (child &&
		(child.__typename || child.type) &&
		CardBuilderKey[child.__typename || child.type]) || {
		component: Text,
		mapProps: child => ({ ...child, ...child.props })
	}

	const { component, mapProps } = Type
	const Handler = component
	const props = mapProps(child)

	return !Handler.prototype.render ? (
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
			{footer && footer.actions && (
				<CardFooter>
					<ButtonGroup {...footer} />
				</CardFooter>
			)}
		</Card>
	)
}

CardBuilder.defaultProps = {
	footer: null
}

export default CardBuilder
