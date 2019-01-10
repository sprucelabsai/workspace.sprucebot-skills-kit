// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'

import cx from 'classnames'

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

import type { Props as ButtonProps } from '../../Button/Button'
import type { Props as ContextMenuProps } from '../../ContextMenu/ContextMenu'
import type { CardHeaderProps } from './CardHeader'
import type { CardBodyProps } from './CardBody'
import type { Step } from './OnboardingCard'

export type CardBuilderProps = {
	/** Card Header props */
	header?: CardHeaderProps,

	/** optionally pass props to an image tag to be rendered in the header */
	headerImage?: Object,

	/** Card Body props */
	body?: CardBodyProps,

	/** For an onboarding card */
	steps: Array<Step>,

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
	return typeof Handler === 'function' ? (
		Handler({ ...child.props, key: child.key })
	) : (
		<Handler key={child.key} {...child.props} />
	)
}

const CardBuilder = (props: CardBuilderProps) => {
	const { header, headerImage, body, footer, steps } = props

	if (steps) {
		return <OnboardingCard {...props} />
	}

	const { title, labelText, labelIcon, actions: headerActions } = header || {}
	const { children, isSectioned } = body || {}
	const footerActions = footer && footer.actions
	return (
		<Card>
			{header && (
				<CardHeader
					title={title}
					labelText={labelText}
					labelIcon={labelIcon}
					actions={headerActions}
				/>
			)}
			{headerImage && <Image {...headerImage} />}
			{children && (
				<CardBody isSectioned={isSectioned}>
					{Array.isArray(children) ? children.map(renderChild) : children}
				</CardBody>
			)}
			{footer && (
				<CardFooter>
					{footerActions && footerActions.length > 0
						? footerActions.map(action => {
								const Handler =
									(action && action.type && CardBuilderKey[action.type]) ||
									Button

								if (!Handler || typeof Handler === 'undefined') {
									return null
								}

								return <Handler key={action.text} kind="simple" {...action} />
						  })
						: null}
				</CardFooter>
			)}
		</Card>
	)
}

CardBuilder.defaultProps = {
	footer: null
}

export default CardBuilder
