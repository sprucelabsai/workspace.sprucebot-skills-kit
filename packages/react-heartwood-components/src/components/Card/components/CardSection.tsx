import React from 'react'

import cx from 'classnames'

// Card Section
export interface ICardSectionProps {
	/** Children to show in the Card */
	children?: React.ReactNode

	/** Set to true to remove horizontal padding */
	isFullBleed?: boolean
}

const CardSection = (props: ICardSectionProps): React.ReactElement => {
	const { children, isFullBleed } = props
	const className = cx('card__section', {
		'card__section--full-bleed': isFullBleed
	})
	return <div className={className}>{children}</div>
}

export default CardSection
