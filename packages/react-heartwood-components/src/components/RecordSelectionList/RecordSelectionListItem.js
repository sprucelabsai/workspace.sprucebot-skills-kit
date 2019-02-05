// @flow

import React from 'react'
import ListItem from '../List/components/ListItem/ListItem'

type Props = {
	/** Title text */
	title: string,

	/** Optional subtitle text */
	subtitle?: string,

	/** URL to show a user avatar */
	avatar?: string,

	/** Inline svg icon */
	icon?: Object,

	/** Called when remove icon is clicked */
	onRemoveSelection: string => void,

	id: string
}

const RecordSelectionListItem = (props: Props) => {
	return (
		<ListItem
			actions={[
				{
					icon: {
						name: 'remove_circle',
						isLineIcon: true
					},
					onClick: () => props.onRemoveSelection(props.id)
				}
			]}
			{...props}
		/>
	)
}

export default RecordSelectionListItem
