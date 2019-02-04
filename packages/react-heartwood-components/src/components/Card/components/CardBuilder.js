// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React from 'react'

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
	button: Button,
	image: Image,
	heading: Heading,
	text: Text,
	list: List,
	scores: Scores
}

const renderChild = child => {
	const Handler = (child && child.type && CardBuilderKey[child.type]) || Text
	return !Handler.prototype.render ? (
		Handler({ ...child.props })
	) : (
		<Handler {...child.props} />
	)
}

const CardBuilder = (props: CardBuilderProps) => {
	const { header, headerImage, body, footer, onboarding } = props

	if (onboarding) {
		return <OnboardingCard {...onboarding} />
	}

	const { children, isSectioned } = body || {}
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
