import React, { Fragment } from 'react'
import Button, { IButtonProps } from '../../../Button/Button'
import { CardBuilder, ICardBuilderProps } from '../../../Card'
import List, { IListProps } from '../../../List/List'
import MarkdownText, {
	IMarkdownProps
} from '../../../MarkdownText/MarkdownText'
import SplitButton, {
	ISplitButtonProps
} from '../../../SplitButton/SplitButton'
import Text, { ITextProps } from '../../../Text/Text'
import Toast, { IToastProps } from '../../../Toast/Toast'
import { IHWCalendarEventDetailsItem } from '@sprucelabs/spruce-types'

const MDTextContainer = (props: IMarkdownProps): React.ReactElement => (
	<div className="event-details__markdown">
		<MarkdownText {...props} />
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

export interface IEventDetailsItemProps
	extends Omit<IHWCalendarEventDetailsItem, 'viewModel'> {
	viewModel:
		| IListProps
		| IButtonProps
		| ICardBuilderProps
		| IToastProps
		| ITextProps
		| IMarkdownProps
		| ISplitButtonProps
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
		return <Fragment />
	}

	const Handler = components[type]
	return <Handler {...viewModel} />
}

export default EventDetailsItem
