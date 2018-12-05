// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Card from '../Card'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Button from '../../Button/Button'
import type { Props as ButtonProps } from '../../Button/Button'
import type { Props as ContextMenuProps } from '../../ContextMenu/ContextMenu'
import type { CardHeaderProps } from './CardHeader'
import type { CardBodyProps } from './CardBody'

// NOTE: WIP
// CardBuilder
// This component will build a card by taking JSON input and translating
// it into the appropriate components
type CardBuilderProps = {
	/** Card Header props */
	header: CardHeaderProps,

	/** Card Body props */
	body: CardBodyProps,

	/** Card Footer props */
	footer?: {
		/** Render buttons in the Card Footer */
		actions: Array<ButtonProps>
	}
}

const CardBuilderKey = {
	button: Button
}

const CardBuilder = (props: CardBuilderProps) => {
	const { header, body, footer } = props
	const { title, labelText, labelIcon, actions: headerActions } = header
	const { children, isSectioned } = body
	const footerActions = footer && footer.actions
	return (
		<Card>
			<CardHeader
				title={title}
				labelText={labelText}
				labelIcon={labelIcon}
				actions={headerActions}
			/>
			<CardBody isSectioned={isSectioned}>{children}</CardBody>
			{footer && (
				<CardFooter>
					{footerActions && footerActions.length > 0
						? footerActions.map(action => {
								const Handler =
									action && action.type && CardBuilderKey[action.type]

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
