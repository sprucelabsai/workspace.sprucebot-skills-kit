// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import type { Props as ButtonProps } from '../../../../../Button/Button'

export type Props = {
	primaryCTA: ButtonProps,
	secondaryCTA: ButtonProps
}

const EventDetailsFooter = (props: Props) => {
	const { primaryCTA, secondaryCTA } = props

	return (
		<div className="event-details-footer">
			{primaryCTA && <Button kind="primary" isFullWidth {...primaryCTA} />}
			{secondaryCTA && (
				<Button kind="secondary" isFullWidth {...secondaryCTA} />
			)}
		</div>
	)
}

export default EventDetailsFooter
