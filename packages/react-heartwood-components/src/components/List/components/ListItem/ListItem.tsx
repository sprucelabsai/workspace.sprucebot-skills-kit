import cx from 'classnames'
import React, { Fragment } from 'react'
import Avatar from '../../../Avatar/Avatar'
import Button, { IButtonProps } from '../../../Button/Button'
import ContextMenu, {
	IContextMenuProps
} from '../../../ContextMenu/ContextMenu'
import { Checkbox, Radio, Toggle } from '../../../Forms'
import Icon, { IIconProps } from '../../../Icon/Icon'
import List, { IListProps } from '../../List'
import {
	IHWListItem,
	IHWListItemSelectableType
} from '@sprucelabs/spruce-types'
import { IToggleProps } from '../../../Forms/components/Toggle/Toggle'
import { ICheckboxProps } from '../../../Forms/components/Checkbox/Checkbox'
import { IRadioProps } from '../../../Forms/components/Radio/Radio'

export interface IListItemProps
	extends Omit<
		IHWListItem,
		| 'icon'
		| 'actions'
		| 'primaryAction'
		| 'contextMenu'
		| 'toggleProps'
		| 'selectableProps'
		| 'list'
		| 'lists'
	> {
	/** Inline svg icon */
	icon?: IIconProps

	/** A primary action that turns the entire list item into a clickable button */
	primaryAction?: IButtonProps

	/** Actions associated with the list item */
	actions?: IButtonProps[]

	/** Context Menu associated with the list item */
	contextMenu?: IContextMenuProps

	/** Props passed to the toggle when it is used */
	toggleProps?: IToggleProps

	/** Optional class name for list item */
	className?: string

	/** Optional id prop for selectable list items */
	selectableId?: string

	/** Optional props for selectable list items */
	selectableProps?: ICheckboxProps | IRadioProps

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
		isIconHidden,
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
							name={icon.name}
							isLineIcon={icon.isLineIcon}
							className={cx('list-item__icon', icon.className, {
								'list-item__icon--hidden': isIconHidden
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
							{selectableType === IHWListItemSelectableType.Checkbox &&
								selectableProps && (
									<Checkbox
										id={selectableId}
										{...(isDisabled ? { disabled: true } : {})}
										{...selectableProps}
									/>
								)}
							{selectableType === IHWListItemSelectableType.Radio &&
								selectableProps && (
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
	isIconHidden: false,
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
