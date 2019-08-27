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

type AvailableConfigurationOptions =
	| {
			id: string
			type: 'list'
			viewModel: IListProps
	  }
	| {
			id: string
			type: 'button'
			viewModel: IButtonProps
	  }
	| {
			id: string
			type: 'splitButton'
			viewModel: ISplitButtonProps
	  }
	| {
			id: string
			type: 'card'
			viewModel: ICardBuilderProps
	  }
	| {
			id: string
			type: 'toast'
			viewModel: IToastProps
	  }
	| {
			id: string
			type: 'text'
			viewModel: any
	  }
	| {
			id: string
			type: 'markdown'
			viewModel: IMarkdownText
	  }

type ExtractAvailableConfigurations<A, T> = A extends { type: T } ? A : never

export type IEventDetailsItemProps =
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'list'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'button'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'splitButton'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'card'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'toast'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'text'>
	| ExtractAvailableConfigurations<AvailableConfigurationOptions, 'markdown'>

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
