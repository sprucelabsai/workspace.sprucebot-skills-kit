// @flow
import React from 'react'
import Button, { Props as ButtonProps } from '../../../../../Button/Button'

export interface Props {
	primaryCTA: ButtonProps;
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
