import React, { Fragment } from 'react'
import cx from 'classnames'
import Avatar from '../../../Avatar/Avatar'
import Button from '../../../Button/Button'
import Icon from '../../../Icon/Icon'

import ContextMenu from '../../../ContextMenu/ContextMenu'

import { Toggle, Checkbox, Radio } from '../../../Forms'

export interface IListItemProps {
	/** Title text */
	title: string

	/** Optional subtitle text */
	subtitle?: string

	/** Optional note text */
	note?: string

	/** URL to show a user avatar */
	avatar?: string

	/** URL to show an image */
	image?: string

	/** Inline svg icon */
	icon?: Record<string, any>

	/** Set true to add left spacing. useful in aligning with other list items that have icons or images */
	isLeftIndented?: boolean

	/** Set true when the list can be reordered */
	isDraggable?: boolean

	/** Set true when the list can be reordered */
	isDisabled?: boolean

	/** Makes the list item a setting */
	toggleId?: string

	/** A primary action that turns the entire list item into a clickable button
	 *  TODO: implement ButtonProps
	 */
	primaryAction?: any

	/** Actions associated with the list item
	 *  TODO: implement ButtonProps
	 */
	actions?: any[]

	/** Context Menu associated with the list item
	 *  TODO: implement ContextMenuProps
	 */
	contextMenu?: any

	/** Props passed to the toggle when it is used */
	toggleProps?: Record<string, any>

	/** Set to true to show separator for this list item if followed by another list item. */
	isSeparatorVisible: boolean

	/** Optional class name for list item */
	className?: string

	/** Optional id prop for selectable list items */
	selectableId?: string

	/** Optional props for selectable list items */
	selectableProps?: Record<string, any>

	/** Optional: set whether to use checkbox or radio for selectable list items */
	selectableType?: 'checkbox' | 'radio'
}

const ListItem = (props: IListItemProps): React.ReactElement => {
	const {
		title,
		subtitle,
		note,
		avatar,
		image,
		icon,
		isDraggable,
		isDisabled,
		toggleId,
		primaryAction,
		actions,
		contextMenu,
		toggleProps,
		isSeparatorVisible,
		className,
		selectableId,
		selectableProps,
		selectableType
	} = props

	const parentClass = cx('list-item', className, {
		'list-item-title-only': !subtitle,
		'list-item--is-draggable': isDraggable,
		'list-item--is-disabled': isDisabled,
		'list-item--primary-action': primaryAction,
		'list-item--separator-hidden': !isSeparatorVisible
	})

	const ListItemInner = (): React.ReactElement => (
		<Fragment>
			{(image || icon || avatar || selectableId) && !isDraggable && (
				<div className="list-item__image-wrapper">
					{icon && (
						<Icon
							customIcon={icon.customIcon}
							icon={icon.name}
							isLineIcon={icon.isLineIcon}
							className={cx('list-item__icon', icon.className, {})}
						/>
					)}
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
					{selectableId && (
						<Fragment>
							{selectableType === 'checkbox' && (
								<Checkbox
									id={selectableId}
									{...(isDisabled ? { disabled: 'disabled' } : {})}
									{...selectableProps}
								/>
							)}
							{selectableType === 'radio' && (
								<Radio
									id={selectableId}
									{...(isDisabled ? { disabled: 'disabled' } : {})}
									{...selectableProps}
								/>
							)}
						</Fragment>
					)}
				</div>
			)}

			<div className="list-item__text-wrapper">
				{toggleId || selectableId ? (
					<p>
						<label
							className="list-item__title"
							htmlFor={toggleId || selectableId}
						>
							{title}
						</label>
					</p>
				) : (
					<p className="list-item__title">{title}</p>
				)}
				{subtitle && (
					<Fragment>
						{toggleId || selectableId ? (
							<p>
								<label
									className="list-item__subtitle"
									htmlFor={toggleId || selectableId}
								>
									{subtitle}
								</label>
							</p>
						) : (
							<p
								className="list-item__subtitle"
								dangerouslySetInnerHTML={{ __html: subtitle }}
							/>
						)}
					</Fragment>
				)}
				{note && (
					<p
						className="list-item__note"
						dangerouslySetInnerHTML={{ __html: note }}
					/>
				)}
			</div>
			{!isDraggable && ((actions && actions.length > 0) || contextMenu) && (
				<div className="list-item__actions-wrapper">
					{actions && actions.length > 0 && (
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
			{toggleId && <Toggle id={toggleId} {...toggleProps} />}
		</Fragment>
	)

	return (
		<li className={parentClass}>
			{primaryAction ? (
				<Button {...primaryAction}>
					<ListItemInner />
				</Button>
			) : (
				<ListItemInner />
			)}
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
	actions: [],
	isSeparatorVisible: true,
	toggleProps: {}
}

export default ListItem
