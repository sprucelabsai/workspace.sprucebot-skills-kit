// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import Avatar from '../../../Avatar/Avatar'
import Button from '../../../Button/Button'
import type { Props as ButtonProps } from '../../../Button/Button'
import ContextMenu, {
	Props as ContextMenuProps
} from '../../../ContextMenu/ContextMenu'
import { Toggle } from '../../../Forms'
import DragHandle from '../../../../../static/assets/icons/ic_drag_handle.svg'

export type Props = {
	title: string,
	subtitle?: string,
	avatar?: string,
	image?: string,
	icon?: any,
	isDraggable?: boolean,
	toggleId?: string,
	actions?: Array<ButtonProps>,
	contextMenu?: ContextMenuProps
}

const ListItem = (props: Props) => {
	const {
		title,
		subtitle,
		avatar,
		image,
		icon,
		isDraggable,
		toggleId,
		actions,
		contextMenu
	} = props
	const parentClass = cx('list-item', {
		'list-item-title-only': !subtitle,
		'list-item--is-draggable': isDraggable
	})
	return (
		<li className={parentClass}>
			{(image || icon || avatar) &&
				!isDraggable && (
					<div className="list-item__image-wrapper">
						{icon &&
							React.cloneElement(icon, {
								className: cx(
									'list-item__icon',
									icon.props && icon.props.className
								)
							})}
						{image && (
							<img
								src={image}
								className="list-item__image"
								alt={title}
								width="40"
								height="40"
							/>
						)}
						{avatar && <Avatar image={avatar} alt={title} />}
					</div>
				)}
			{isDraggable && <DragHandle className="drag-handle" />}
			<div className="list-item__text-wrapper">
				{toggleId ? (
					<label className="list-item__title" htmlFor={toggleId}>
						{title}
					</label>
				) : (
					<p className="list-item__title">{title}</p>
				)}
				{subtitle && (
					<p
						className="list-item__subtitle"
						dangerouslySetInnerHTML={{ __html: subtitle }}
					/>
				)}
			</div>
			{!isDraggable &&
				((actions && actions.length > 0) || contextMenu) && (
					<div className="list-item__actions-wrapper">
						{actions &&
							actions.length > 0 && (
								<div className="list-item__actions-wrapper">
									{actions.map((action, idx) => (
										<Button
											key={idx}
											isSmall
											className="list-item__action"
											{...action}
										/>
									))}
								</div>
							)}
						{contextMenu && <ContextMenu {...contextMenu} />}
					</div>
				)}
			{toggleId && <Toggle id={toggleId} />}
		</li>
	)
}

ListItem.defaultProps = {
	subtitle: '',
	avatar: '',
	image: '',
	icon: null,
	isDraggable: false,
	toggleId: '',
	actions: []
}

export default ListItem
