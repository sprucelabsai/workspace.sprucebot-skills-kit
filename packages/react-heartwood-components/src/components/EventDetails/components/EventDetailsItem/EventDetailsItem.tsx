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
// TODO: fix toast types to be able to be used here
// import Toast, { IToastProps } from '../../../Toast/Toast'
import {
	IHWCalendarEventDetailsItem,
	IHWAction,
	IHWCalendarEventDetailsItemViewModel
} from '@sprucelabs/spruce-types'

const MDTextContainer = (props: IMarkdownProps): React.ReactElement => (
	<div className="event-details__markdown">
		<MarkdownText {...props} />
	</div>
)

const components = {
	list: List,
	button: Button,
	cardBuilder: CardBuilder,
	splitButton: SplitButton,
	text: Text,
	// toast: Toast,
	markdown: MDTextContainer
}

type ViewModel =
	| IListProps
	| IButtonProps
	| ICardBuilderProps
	| ITextProps
	// | IToastProps
	| IMarkdownProps
	| ISplitButtonProps
	| IHWCalendarEventDetailsItemViewModel

export interface IEventDetailsItemProps
	extends Omit<IHWCalendarEventDetailsItem, 'viewModel'> {
	viewModel: ViewModel

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const EventDetailsItem = (
	props: IEventDetailsItemProps
): React.ReactElement => {
	const { type, viewModel, onAction } = props

	if (!type || !components[type]) {
		// TODO: Use logger library for warning
		console.warn(
			`No component found for key: ${type}. Please double-check properties passed into <EventDetailsItem> from <EventDetails>.`
		)
		return <Fragment />
	}

	const Handler = components[type]
	return <Handler {...viewModel as ViewModel} onAction={onAction} />
}

export default EventDetailsItem
