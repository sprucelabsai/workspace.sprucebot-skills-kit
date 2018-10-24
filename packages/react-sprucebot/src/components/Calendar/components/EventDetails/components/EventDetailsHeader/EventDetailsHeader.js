// @flow
import React from 'react'
import Button, { Props as ButtonProps } from '../../../../../Button/Button'
import ContextMenu, {
	Props as ContextMenuProps
} from '../../../../../ContextMenu/ContextMenu'
import Icon from '../../../../../Icon/Icon'
import { Text } from '../../../../../Text/Text'
import BackIcon from '../../../../../../../static/assets/icons/ic_arrow_back.svg'

export interface Props {
	label: string;
	title: string;
	handleGoBack?: Function;
	contextMenu?: ContextMenuProps;
}

const EventDetailsHeader = (props: Props) => {
	const { label, title, handleGoBack, contextMenu } = props

	return (
		<div className="event-details-header">
			{handleGoBack && (
				<Button
					isSmall
					className="event-details-header__button"
					icon={<BackIcon />}
				/>
			)}
			<div className="event-details-header__text-wrapper">
				<Text className="event-details-header__label">{label}</Text>
				<Text className="event-details-header__title">{title}</Text>
			</div>
			<div className="event-details-header__actions-wrapper">
				{contextMenu && <ContextMenu isSmall {...contextMenu} />}
				<Button
					isSmall
					className="event-details-header__button"
					icon={<Icon icon="close" />}
				/>
			</div>
		</div>
	)
}

export default EventDetailsHeader
