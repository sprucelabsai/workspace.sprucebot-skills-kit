import cx from 'classnames'
import React, { Fragment } from 'react'
import Avatar from '../../../Avatar/Avatar'
import Button, { IButtonProps } from '../../../Button/Button'
import ContextMenu from '../../../ContextMenu/ContextMenu'
import { Checkbox, Radio, Toggle } from '../../../Forms'
import Icon from '../../../Icon/Icon'
import List, { IListProps } from '../../List'

export interface IListItemProps {
	/** Optional; Set true to render an expandable item */
	isExpandable?: boolean

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

	/** Optional; visually hides the icon without removing it */
	iconIsHidden?: boolean

	/** Set true to add left spacing. useful in aligning with other list items that have icons or images */
	isLeftIndented?: boolean

	/** Set true when the list can be reordered */
	isDraggable?: boolean

	/** Set true when the list can be reordered */
	isDisabled?: boolean

	/** Makes the list item a setting */
	toggleId?: string

	/** A primary action that turns the entire list item into a clickable button */
	primaryAction?: IButtonProps

	/** Actions associated with the list item */
	actions?: IButtonProps[]

	/** Context Menu associated with the list item
	 *  TODO: implement ContextMenuProps
	 */
	contextMenu?: any

	/** Props passed to the toggle when it is used */
	toggleProps?: Record<string, any>

	/** Set to true to show separator for this list item if followed by another list item. */
	isSeparatorVisible?: boolean

	/** Optional class name for list item */
	className?: string

	/** Optional id prop for selectable list items */
	selectableId?: string

	/** Optional props for selectable list items */
	selectableProps?: Record<string, any>

	/** Optional: set whether to use checkbox or radio for selectable list items */
	selectableType?: 'checkbox' | 'radio'

	/** Highlight title, subtitle, note with warning colors */
	warnings?: {
		title: boolean
		subtitle: boolean
		note: boolean
	}

	/** Optional; adds a nested list */
	list?: IListProps

	/** Optional; adds multiple lists nested at the same level */
	lists?: IListProps[]
}

const ListItem = (props: IListItemProps): React.ReactElement => {
	const {
		title,
		subtitle,
		note,
		avatar,
		image,
		icon,
		iconIsHidden,
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
		selectableType,
		warnings,
		list,
		lists
	} = props

	const parentClass = cx('list-item', className, {
		'list-item-title-only': !subtitle,
		'list-item--is-draggable': isDraggable,
		'list-item--is-disabled': isDisabled,
		'list-item--primary-action': primaryAction,
		'list-item--separator-hidden': !isSeparatorVisible,
		'list-item--has-avatar': !!avatar
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
							className={cx('list-item__icon', icon.className, {
								'list-item__icon--hidden': iconIsHidden
							})}
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
					{selectableId && (
						<Fragment>
							{selectableType === 'checkbox' && (
								<Checkbox
									id={selectableId}
									{...(isDisabled ? { disabled: true } : {})}
									{...selectableProps}
								/>
							)}
							{selectableType === 'radio' && (
								<Radio
									id={selectableId}
									{...(isDisabled ? { disabled: true } : {})}
									{...selectableProps}
								/>
							)}
						</Fragment>
					)}
					{avatar && <Avatar image={avatar} alt={title} />}
				</div>
			)}

			<div className="list-item__text-wrapper">
				{toggleId || selectableId ? (
					<p>
						<label
							className={cx('list-item__title', {
								'u-color-warning-dark': warnings && warnings.title
							})}
							htmlFor={toggleId || selectableId}
						>
							{title}
						</label>
					</p>
				) : (
					<p
						className={cx('list-item__title', {
							'u-color-warning-dark': warnings && warnings.title
						})}
					>
						{title}
					</p>
				)}
				{subtitle && (
					<Fragment>
						{toggleId || selectableId ? (
							<p>
								<label
									className={cx('list-item__subtitle', {
										'u-color-warning-dark': warnings && warnings.subtitle
									})}
									htmlFor={toggleId || selectableId}
								>
									{subtitle}
								</label>
							</p>
						) : (
							<p
								className={cx('list-item__subtitle', {
									'u-color-warning-dark': warnings && warnings.subtitle
								})}
								dangerouslySetInnerHTML={{ __html: subtitle }}
							/>
						)}
					</Fragment>
				)}
				{note && (
					<p
						className={cx('list-item__note', {
							'u-color-warning-dark': warnings && warnings.note
						})}
						dangerouslySetInnerHTML={{ __html: note }}
					/>
				)}
			</div>
			{!isDraggable && ((actions && actions.length > 0) || contextMenu) && (
				<Fragment>
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
					{contextMenu && (
						<div className="list-item__actions-wrapper">
							<ContextMenu {...contextMenu} />
						</div>
					)}
				</Fragment>
			)}
			{toggleId && <Toggle id={toggleId} {...toggleProps} />}

			{list && <List {...list} />}
			{lists &&
				lists.length > 0 &&
				lists.map((list, idx) => <List key={idx} {...list} />)}
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
	iconIsHidden: false,
	isDraggable: false,
	toggleId: '',
	actions: [],
	isSeparatorVisible: true,
	toggleProps: {},
	warnings: {
		title: false,
		subtitle: false,
		note: false
	}
}

export default ListItem
