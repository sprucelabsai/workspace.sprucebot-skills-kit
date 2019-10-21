import React, { Component } from 'react'
import cx from 'classnames'

import {
	IHWCalendarEventDetails,
	IHWCalendarEventDetailsItemType,
	IHWCalendarEventDetailsItem,
	IHWAction,
	IHWCalendarEventDetailsItemViewModel
} from '@sprucelabs/spruce-types'

import EventDetailsItem from './components/EventDetailsItem/EventDetailsItem'
import { IButtonProps } from '../Button/Button'
import { ICardBuilderProps } from '../Card'
import { IToastProps } from '../Toast/Toast'
import { ITextProps } from '../Text/Text'
import { IMarkdownProps } from '../MarkdownText/MarkdownText'
import { ISplitButtonProps } from '../SplitButton/SplitButton'
import { IListProps } from '../List'
import { unionArray } from '../..'

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
		| IHWCalendarEventDetailsItemViewModel
}

export interface IEventDetailsProps
	extends Omit<IHWCalendarEventDetails, 'items'> {
	/** In a loading state, loading placeholders will be dropped in */
	isLoading?: boolean

	/** all the items that make up this event details component */
	items: (IEventDetailsItemProps | IHWCalendarEventDetailsItem)[]

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

interface IEventDetailsState {}

export default class EventDetails extends Component<
	IEventDetailsProps | IHWCalendarEventDetails,
	IEventDetailsState
> {
	public render(): React.ReactElement {
		const reactHeartwoodProps = this.props as IEventDetailsProps
		const commonProps = this.props as IHWCalendarEventDetails

		const { items } = commonProps
		const { isLoading, onAction } = reactHeartwoodProps

		const className = cx('event-details', {
			'loading-placeholder': isLoading
		})

		return (
			<div className={className}>
				{unionArray(items).map(item => (
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
						<EventDetailsItem
							type={item.type}
							viewModel={item.viewModel}
							onAction={onAction}
						/>
					</div>
				))}
			</div>
		)
	}
}
