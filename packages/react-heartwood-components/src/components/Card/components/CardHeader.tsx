import React, { Fragment } from 'react'
import cx from 'classnames'
import Button, { ButtonKinds } from '../../Button/Button'
import Icon, { IIconProps } from '../../Icon/Icon'
import ContextMenu, { IContextMenuProps } from '../../ContextMenu/ContextMenu'

import { IButtonProps } from '../../Button/Button'
import { IHWAction, IHWCardHeader } from '@sprucelabs/spruce-types'

// Card Header
export interface ICardHeaderProps
	extends Omit<IHWCardHeader, 'labelIcon' | 'actions' | 'contextMenu'> {
	/** Optional icon to show above the title and before the label */
	labelIcon?: IIconProps | null

	/** Render buttons in the Card Header */
	actions?: IButtonProps[] | null

	/** Renders a Context Menu in the Card Header */
	contextMenu?: IContextMenuProps | null

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const CardHeader = (
	props: ICardHeaderProps | IHWCardHeader
): React.ReactElement => {
	const reactHeartwoodProps = props as ICardHeaderProps
	const commonProps = props as IHWCardHeader

	const { title, labelText, actions, contextMenu } = commonProps
	const { labelIcon, onAction } = reactHeartwoodProps

	return (
		<div className="card__header">
			{(title || labelText || labelIcon) && (
				<div className="card__header-text">
					{(labelText || labelIcon) && (
						<div className="card__header-label">
							{labelIcon && (
								<Icon
									customIcon={
										labelIcon.customIcon ? labelIcon.customIcon : undefined
									}
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
									kind={ButtonKinds.Simple}
									isSmall
									onAction={onAction}
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
CardHeader.defaultProps = {
	title: '',
	labelText: '',
	labelIcon: null,
	headerActions: [],
	contextMenu: null
}

export default CardHeader
