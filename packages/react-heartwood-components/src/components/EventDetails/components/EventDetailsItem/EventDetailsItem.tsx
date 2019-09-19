import React, { Fragment } from 'react'
import Button from '../../../Button/Button'
import { CardBuilder } from '../../../Card'
import List from '../../../List/List'
import MarkdownText from '../../../MarkdownText/MarkdownText'
import SplitButton from '../../../SplitButton/SplitButton'
import Text from '../../../Text/Text'
import Toast from '../../../Toast/Toast'
import { IHWCalendarEventDetailsItem } from '@sprucelabs/spruce-types'

const MDTextContainer = (props: { source: string }): React.ReactElement => (
	<div className="event-details__markdown">
		<MarkdownText source={props.source} />
	</div>
)

const components = {
	list: List,
	button: Button,
	card: CardBuilder,
	splitButton: SplitButton,
	toast: Toast,
	text: Text,
	markdown: MDTextContainer
}

export interface IEventDetailsItemProps extends IHWCalendarEventDetailsItem {}

const EventDetailsItem = (
	props: IEventDetailsItemProps
): React.ReactElement => {
	const { type, viewModel } = props

	if (!type || !components[type]) {
		// TODO: Use logger library for warning
		console.warn(
			`No component found for key: ${type}. Please double-check properties passed into <EventDetailsItem> from <EventDetails>.`
		)
		return <Fragment />
	}

	const Handler = components[type]
	return <Handler {...viewModel} />
}

export default EventDetailsItem
