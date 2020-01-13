import {
	IHWAction,
	IHWListItem,
	IHWListItemSelectableType
} from '@sprucelabs/spruce-types'
import cx from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import React, { Fragment } from 'react'
import Avatar from '../../../Avatar/Avatar'
import Button, { IButtonProps } from '../../../Button/Button'
import ContextMenu, {
	IContextMenuProps
} from '../../../ContextMenu/ContextMenu'
import { Checkbox, Radio, Toggle } from '../../../Forms'
import { ICheckboxProps } from '../../../Forms/components/Checkbox/Checkbox'
import { IRadioProps } from '../../../Forms/components/Radio/Radio'
import { IToggleProps } from '../../../Forms/components/Toggle/Toggle'
import Icon, { IIconProps } from '../../../Icon/Icon'
import List, { IListProps } from '../../List'

export interface IListItemProps
	extends Omit<
		IHWListItem,
		| 'id'
		| 'icon'
		| 'actions'
		| 'primaryAction'
		| 'contextMenu'
		| 'toggleProps'
		| 'selectableProps'
		| 'list'
		| 'lists'
		| 'title'
	> {
	/** unique id for view caching */
	id?: string

	/** Inline svg icon */
	icon?: IIconProps

	/** A primary action that turns the entire list item into a clickable button */
	primaryAction?: IButtonProps

	/** Actions associated with the list item */
	actions?: IButtonProps[]

	/** Context Menu associated with the list item */
	contextMenu?: IContextMenuProps | null

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

	/** In a loading state, loading placeholders will be dropped in */
	isLoading?: boolean

	/** Title text  */
	title: string | React.ReactElement

	/** Optional alt property if avatar is passed */
	avatarAlt?: string

	/** Optional alt property if image is passed */
	imageAlt?: string

	/** Optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const ListItem = (props: IListItemProps): React.ReactElement => {
	const {
		actions,
		avatar,
		avatarAlt,
		className,
		contextMenu,
		icon,
		image,
		imageAlt,
		isDisabled,
		isDraggable,
		isIconHidden,
		isLoading,
		isSeparatorVisible,
		list,
		lists,
		note,
		onAction,
		primaryAction,
		selectableId: selectableIdProp,
		selectableProps,
		selectableType,
		subtitle,
		title,
		toggleId,
		toggleProps,
		warnings
	} = props

	let checkboxProps: ICheckboxProps | undefined
	let radioProps: IRadioProps | undefined
	let selectableId

	if (selectableProps) {
		selectableId = selectableIdProp ? selectableIdProp : selectableProps.id

		// TODO move this to a type that can be inferred
		const restSelectableProps = cloneDeep(selectableProps)
		delete restSelectableProps.__typename

		if (selectableType === IHWListItemSelectableType.Checkbox) {
			checkboxProps = restSelectableProps as ICheckboxProps
		} else {
			radioProps = restSelectableProps as IRadioProps
		}
	}

	const parentClass = cx('list-item', className, {
		'list-item-title-only': !subtitle,
		'list-item--is-draggable': isDraggable,
		'list-item--is-disabled': isDisabled,
		'list-item--primary-action': primaryAction,
		'list-item--separator-hidden': !isSeparatorVisible,
		'list-item--has-avatar': !!avatar,
		'loading-placeholder': isLoading
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
							alt={imageAlt || image}
							width="40"
							height="40"
						/>
					)}
					{selectableId && (
						<Fragment>
							{selectableType === IHWListItemSelectableType.Checkbox &&
								checkboxProps && (
									<Checkbox
										id={selectableId}
										{...(isDisabled ? { disabled: true } : {})}
										{...checkboxProps}
										onAction={onAction}
									/>
								)}
							{selectableType === IHWListItemSelectableType.Radio &&
								radioProps && (
									<Radio
										id={selectableId}
										{...(isDisabled ? { disabled: true } : {})}
										{...radioProps}
										onAction={onAction}
									/>
								)}
						</Fragment>
					)}
					{avatar && (
						<Avatar
							image={avatar}
							alt={avatarAlt || avatar}
							width={32}
							height={32}
						/>
					)}
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
									onAction={onAction}
								/>
							))}
						</div>
					)}
					{contextMenu && (
						<div className="list-item__actions-wrapper">
							<ContextMenu {...contextMenu} onAction={onAction} />
						</div>
					)}
				</Fragment>
			)}
			{toggleId && <Toggle id={toggleId} {...toggleProps} />}

			{list && <List {...list} onAction={onAction} />}
			{lists &&
				lists.length > 0 &&
				lists.map((list, idx) => (
					<List key={idx} {...list} onAction={onAction} />
				))}
		</Fragment>
	)

	return (
		<li className={parentClass}>
			{primaryAction ? (
				<Button {...primaryAction} onAction={onAction}>
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
	avatarAlt: '',
	image: '',
	imageAlt: '',
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
