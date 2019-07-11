// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
import Icon from '../../Icon/Icon'
import ContextMenu from '../../ContextMenu/ContextMenu'

import type { Props as ButtonProps } from '../../Button/Button'
import type { Props as ContextMenuProps } from '../../ContextMenu/ContextMenu'

// Card Header
export type CardHeaderProps = {
	/** Title for the card */
	title?: string,

	/** Optional label to show above title */
	labelText?: string,

	/** Optional icon to show above the title and before the label */
	labelIcon?: any,

	/** Render buttons in the Card Header */
	actions?: Array<ButtonProps>,

	/** Renders a Context Menu in the Card Header */
	contextMenu?: ContextMenuProps
}

const CardHeader = (props: CardHeaderProps) => {
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
									icon={labelIcon.name}
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
								<Button key={action.text} kind="simple" isSmall {...action} />
							))}
						{contextMenu && <ContextMenu {...contextMenu} />}
					</Fragment>
				</div>
			)}
		</div>
	)
}

CardHeader.defualtProps = {
	title: '',
	labelText: '',
	labelIcon: null,
	headerActions: [],
	contextMenu: null
}

export default CardHeader
