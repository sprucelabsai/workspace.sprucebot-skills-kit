import React, { Component } from 'react'
import cx from 'classnames'

import {
	IHWCalendarEventDetails,
	IHWCalendarEventDetailsItemType,
	IHWCalendarEventDetailsItem
} from '@sprucelabs/spruce-types'

import EventDetailsItem from './components/EventDetailsItem/EventDetailsItem'
import { IButtonProps } from '../Button/Button'
import { ICardBuilderProps } from '../Card'
import { IToastProps } from '../Toast/Toast'
import { ITextProps } from '../Text/Text'
import { IMarkdownProps } from '../MarkdownText/MarkdownText'
import { ISplitButtonProps } from '../SplitButton/SplitButton'
import { IListProps } from '../List'

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

export interface IEventDetailsProps
	extends Omit<IHWCalendarEventDetails, 'items'> {
	items: IEventDetailsItemProps[]
}

interface IEventDetailsState {}

export default class EventDetails extends Component<
	IEventDetailsProps,
	IEventDetailsState
> {
	public render(): React.ReactElement {
		const { items } = this.props
		return (
			<div className="event-details">
				{items.map(item => (
					<div
						key={item.viewModel.id}
						className={cx('event-details__section', {
							'event-details__button-wrapper':
								item.type === IHWCalendarEventDetailsItemType.Button ||
								item.type === IHWCalendarEventDetailsItemType.SplitButton,
							'event-details__markdown-wrapper':
								item.type === IHWCalendarEventDetailsItemType.Markdown,
							'event-details__card-wrapper':
								item.type === IHWCalendarEventDetailsItemType.CardBuilder
						})}
					>
						<EventDetailsItem type={item.type} viewModel={item.viewModel} />
					</div>
				))}
			</div>
		)
	}
}
