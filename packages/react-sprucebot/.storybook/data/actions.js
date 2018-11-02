import React from 'react'
import Icon from '../../src/components/Icon/Icon'
import EditIcon from '../../static/assets/icons/Interface-Essential/Edit/pencil-write.svg'

export const singleAction = [
	{
		icon: <Icon icon="edit" isLineIcon className="btn__line-icon" />,
		kind: 'simple'
	}
]

export const threeTextActions = [
	{
		text: 'Edit appointment'
	},
	{
		text: 'Cancel appointment'
	},
	{
		text: 'Contact guest'
	}
]
