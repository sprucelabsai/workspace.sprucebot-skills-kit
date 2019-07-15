import React from 'react'
import List from '../../../List/List'
import Button from '../../../Button/Button'
import { CardBuilder } from '../../../Card'
import Toast from '../../../Toast/Toast'
import Text from '../../../Text/Text'

export interface IEventDetailsItemProps {
	/** Unique identifier for the item */
	id: string

	/** Component key to decide what to render */
	component: 'list' | 'button' | 'card' | 'toast' | 'text'

	/** Props to pass into the rendered component */
	// TODO: This should be tied to only the components that can be rendered
	componentProps: any
}

const components = {
	list: List,
	button: Button,
	card: CardBuilder,
	toast: Toast,
	text: Text
}

const EventDetailsItem = (
	props: IEventDetailsItemProps
): React.ReactElement => {
	const { component, componentProps } = props

	if (!component || !components[component]) {
		// TODO: Warn dev that they passed in the wrong key
		return null
	}

	const Handler = components[component]
	return <Handler {...componentProps} />
}

export default EventDetailsItem
