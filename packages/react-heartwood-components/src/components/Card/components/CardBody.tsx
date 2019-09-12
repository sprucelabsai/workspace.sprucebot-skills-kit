import React from 'react'
import cx from 'classnames'
import CardSection from './CardSection'

// Card Body
export interface ICardBodyProps {
	/** Children to show in the Card */
	children?: React.ReactNode

	/** Whether to wrap children in CardSection */
	isSectioned?: boolean

	/** Set true to display line separators between CardSection components */
	areSectionSeparatorsVisible?: boolean

	/** Does card include top padding */
	hasTopPadding?: boolean

	/** Does card include bottom padding */
	hasBottomPadding?: boolean

	/** Set to true to remove horizontal padding */
	isFullBleed?: boolean
}

const CardBody = (props: ICardBodyProps): React.ReactElement => {
	const {
		children,
		isSectioned,
		hasTopPadding,
		hasBottomPadding,
		areSectionSeparatorsVisible,
		isFullBleed = false
	} = props
	const className = cx('card__body', {
		'card__body--section-separators-visible': areSectionSeparatorsVisible,
		'card__body--no-top-padding': !hasTopPadding,
		'card__body--no-bottom-padding': !hasBottomPadding
	})
	return (
		<div className={className}>
			{isSectioned ? (
				<CardSection isFullBleed={isFullBleed}>{children}</CardSection>
			) : (
				children
			)}
		</div>
	)
}

CardBody.displayName = 'Card.Body'
CardBody.defaultProps = {
	isSectioned: true,
	areSectionSeparatorsVisible: false,
	hasTopPadding: true,
	hasBottomPadding: true
}

export default CardBody
