import React from 'react'
import List from '../../../List/List'
import Button from '../../../Button/Button'
import { CardBuilder } from '../../../Card'
import SplitButton from '../../../SplitButton/SplitButton'
import Toast from '../../../Toast/Toast'
import Text from '../../../Text/Text'
import MarkdownText from '../../../MarkdownText/MarkdownText'

export interface IEventDetailsItemProps {
	/** Unique identifier for the item */
	id: string

	/** Component key to decide what to render */
	type:
		| 'list'
		| 'button'
		| 'splitButton'
		| 'card'
		| 'toast'
		| 'text'
		| 'markdown'

	/** Props to pass into the rendered component */
	// TODO: This should be tied to only the components that can be rendered after TSX conversion
	viewModel: any
}

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

const EventDetailsItem = (
	props: IEventDetailsItemProps
): React.ReactElement => {
	const { type, viewModel } = props

	if (!type || !components[type]) {
		// TODO: Use logger library for warning
		console.warn(
			`No component found for key: ${type}. Please double-check properties passed into <EventDetailsItem> from <EventDetails>.`
		)
		return null
	}

	const Handler = components[type]
	return <Handler {...viewModel} />
}

export default EventDetailsItem
