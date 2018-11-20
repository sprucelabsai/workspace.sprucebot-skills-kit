// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import type { Props as ButtonProps } from '../../../../../Button/Button'
import ContextMenu from '../../../../../ContextMenu/ContextMenu'
import type { Props as ContextMenuProps } from '../../../../../ContextMenu/ContextMenu'
import Icon from '../../../../../Icon/Icon'
import { Text } from '../../../../../Text/Text'

export type Props = {
	label: string,
	title: string,
	onClickBack?: Function,
	onClickClose: Function,
	contextMenu?: ContextMenuProps
}

const EventDetailsHeader = (props: Props) => {
	const { label, title, onClickBack, onClickClose, contextMenu } = props

	return (
		<div className="event-details-header">
			{onClickBack && (
				<Button
					onClick={onClickBack}
					isSmall
					className="event-details-header__button"
					icon={{
						name: 'close'
					}}
				/>
			)}
			<div className="event-details-header__text-wrapper">
				<Text className="event-details-header__label">{label}</Text>
				<Text className="event-details-header__title">{title}</Text>
			</div>
			<div className="event-details-header__actions-wrapper">
				{contextMenu && <ContextMenu isSmall {...contextMenu} />}
				<Button
					onClick={onClickClose}
					isSmall
					className="event-details-header__button"
					icon={{ name: 'close' }}
				/>
			</div>
		</div>
	)
}

export default EventDetailsHeader
