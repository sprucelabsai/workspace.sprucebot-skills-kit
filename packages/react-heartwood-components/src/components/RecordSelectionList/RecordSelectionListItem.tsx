import React from 'react'
import ListItem from '../List/components/ListItem/ListItem'

export interface IRecordSelectionListItemProps {
	/** Title text */
	title: string

	/** Optional subtitle text */
	subtitle?: string

	/** URL to show a user avatar */
	avatar?: string

	/** Inline svg icon */
	icon?: Record<string, any>

	id: string
}

const RecordSelectionListItem = (
	props: IRecordSelectionListItemProps
): React.ReactElement => {
	return <ListItem {...props} />
}

export default RecordSelectionListItem
