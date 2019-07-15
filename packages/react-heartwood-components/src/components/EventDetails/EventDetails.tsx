import React, { Component } from 'react'
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
		return <p>Details</p>
	}
}
