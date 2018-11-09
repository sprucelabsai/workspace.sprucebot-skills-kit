// @flow
// NOTE: Cards should be built in a way that they can be created with JSON
import React, { Fragment } from 'react'
import type { Element, Node } from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
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
	contextMenu?: Node
}

const CardHeader = (props: CardHeaderProps) => {
	const { title, labelText, labelIcon, actions, contextMenu } = props
	return (
		<div className="card-header">
			{(title || labelText || labelIcon) && (
				<div className="card-header__text">
					{(labelText || labelIcon) && (
						<div className="card-header__label">
							{labelIcon &&
								React.cloneElement(labelIcon, {
									className: cx(
										'card-header__label-icon',
										labelIcon.props.className
									)
								})}
							{labelText && (
								<span className="card-header__label-text">{labelText}</span>
							)}
						</div>
					)}
					{title && <h3 className="card-header__title">{title}</h3>}
				</div>
			)}
			{(actions || contextMenu) && (
				<div className="card-header__actions">
					<Fragment>
						{actions &&
							actions.length > 0 &&
							actions.map(action => (
								<Button key={action.text} kind="simple" isSmall {...action} />
							))}
						{contextMenu}
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
