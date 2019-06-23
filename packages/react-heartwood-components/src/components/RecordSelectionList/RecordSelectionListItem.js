// @flow

import React from 'react'
import ListItem from '../List/components/ListItem/ListItem'

type RecordSelectionListItemProps = {
	/** Title text */
	title: string,

	/** Optional subtitle text */
	subtitle?: string,

	/** URL to show a user avatar */
	avatar?: string,

	/** Inline svg icon */
	icon?: Object,

	id: string
}

const RecordSelectionListItem = (props: RecordSelectionListItemProps) => {
	return <ListItem {...props} />
}

export default RecordSelectionListItem
