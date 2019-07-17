import React, { Component } from 'react'
import cx from 'classnames'
import EventDetailsItem, {
	IEventDetailsItemProps
} from './components/EventDetailsItem/EventDetailsItem'

export interface IEventDetailsProps {
	/** Items for the body of event details */
	items: IEventDetailsItemProps[]
}

interface IEventDetailsState {}

export default class EventDetails extends Component<
	IEventDetailsProps,
	IEventDetailsState
> {
	public static Item = EventDetailsItem

	public render(): React.ReactElement {
		const { items } = this.props
		return (
			<div className="event-details">
				{items.map(item => (
					<div
						key={item.id}
						className={cx('event-details__section', {
							'event-details__button-wrapper':
								item.component === 'button' || item.component === 'splitButton',
							'event-details__markdown-wrapper': item.component === 'markdown',
							'event-details__card-wrapper': item.component === 'card'
						})}
					>
						<EventDetailsItem {...item} />
					</div>
				))}
			</div>
		)
	}
}
