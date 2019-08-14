import React from 'react'
import ListItem from '../List/components/ListItem/ListItem'

import { IRecordSelectionListItemProps } from './RecordSelectionList'

const RecordSelectionListItem = (
	props: IRecordSelectionListItemProps
): React.ReactElement => {
	return <ListItem {...props} />
}

export default RecordSelectionListItem
