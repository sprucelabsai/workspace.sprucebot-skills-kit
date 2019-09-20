import React, { Fragment } from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
import Icon, { IIconProps } from '../../Icon/Icon'
import ContextMenu, { IContextMenuProps } from '../../ContextMenu/ContextMenu'

import { IButtonProps } from '../../Button/Button'
import { IHWCardHeader, IHWActionKinds } from '@sprucelabs/spruce-types'

// Card Header
export interface ICardHeaderProps
	extends Omit<IHWCardHeader, 'labelIcon' | 'actions' | 'contextMenu'> {
	/** Optional icon to show above the title and before the label */
	labelIcon?: IIconProps

	/** Render buttons in the Card Header */
	actions?: IButtonProps[]

	/** Renders a Context Menu in the Card Header */
	contextMenu?: IContextMenuProps
}

const CardHeader = (props: ICardHeaderProps): React.ReactElement => {
	const { title, labelText, labelIcon, actions, contextMenu } = props
	return (
		<div className="card__header">
			{(title || labelText || labelIcon) && (
				<div className="card__header-text">
					{(labelText || labelIcon) && (
						<div className="card__header-label">
							{labelIcon && (
								<Icon
									customIcon={labelIcon.customIcon}
									name={labelIcon.name}
									isLineIcon={labelIcon.isLineIcon}
									className={cx('card__header-label-icon', labelIcon.className)}
								/>
							)}
							{labelText && (
								<span className="card__header-label-text">{labelText}</span>
							)}
						</div>
					)}
					{title && <h3 className="card__title">{title}</h3>}
				</div>
			)}
			{(actions || contextMenu) && (
				<div className="card__header-actions">
					<Fragment>
						{actions &&
							actions.length > 0 &&
							actions.map(action => (
								<Button
									key={action.id}
									kind={IHWActionKinds.Simple}
									isSmall
									{...action}
								/>
							))}
						{contextMenu && <ContextMenu {...contextMenu} />}
					</Fragment>
				</div>
			)}
		</div>
	)
}

CardHeader.displayName = 'Card.Header'
CardHeader.defualtProps = {
	title: '',
	labelText: '',
	labelIcon: null,
	headerActions: [],
	contextMenu: null
}

export default CardHeader
