import React from 'react'
import List, { IListProps } from '../../../List/List'
import Button, { IButtonProps } from '../../../Button/Button'
import { CardBuilder, ICardBuilderProps } from '../../../Card'
import SplitButton, {
	ISplitButtonProps
} from '../../../SplitButton/SplitButton'
import Toast, { IToastProps } from '../../../Toast/Toast'
import Text from '../../../Text/Text'
import MarkdownText, { IMarkdownText } from '../../../MarkdownText/MarkdownText'

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

interface IGenerateEventDetailsItemConfiguration<type, props> {
	/** Unique identifier for the item */
	id: string
	/** Component key to decide what to render */
	type: type
	/** Props to pass into the rendered component */
	viewModel: props
}

export type IEventDetailsItemProps =
	| IGenerateEventDetailsItemConfiguration<'list', IListProps>
	| IGenerateEventDetailsItemConfiguration<'button', IButtonProps>
	| IGenerateEventDetailsItemConfiguration<'splitButton', ISplitButtonProps>
	| IGenerateEventDetailsItemConfiguration<'card', ICardBuilderProps>
	| IGenerateEventDetailsItemConfiguration<'toast', IToastProps>
	| IGenerateEventDetailsItemConfiguration<'text', any>
	| IGenerateEventDetailsItemConfiguration<'markdown', IMarkdownText>

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
