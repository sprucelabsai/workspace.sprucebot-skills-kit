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
	component:
		| 'list'
		| 'button'
		| 'splitButton'
		| 'card'
		| 'toast'
		| 'text'
		| 'markdown'

	/** Props to pass into the rendered component */
	// TODO: This should be tied to only the components that can be rendered after TSX conversion
	componentProps: any
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
	const { component, componentProps } = props

	if (!component || !components[component]) {
		// TODO: Use logger library for warning
		console.warn(
			`No component found for key: ${component}. Please double-check properties passed into <EventDetailsItem> from <EventDetails>.`
		)
		return null
	}

	const Handler = components[component]
	return <Handler {...componentProps} />
}

export default EventDetailsItem
