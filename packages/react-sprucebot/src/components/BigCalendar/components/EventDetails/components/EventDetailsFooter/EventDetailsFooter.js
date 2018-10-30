// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import type { Props as ButtonProps } from '../../../../../Button/Button'

export type Props = {
	primaryCTA: ButtonProps
}

const EventDetailsFooter = (props: Props) => {
	const { primaryCTA } = props

	return (
		<div className="event-details-footer">
			<Button kind="primary" isFullWidth {...primaryCTA} />
		</div>
	)
}

export default EventDetailsFooter
