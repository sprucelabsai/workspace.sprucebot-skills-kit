// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'
import Icon from '../../../Icon/Icon'
import Select from '../../../Forms/components/Select/Select'

export type Props = {
	/** Title text */
	title: string,

	/** Optional subtitle text */
	subtitle?: string,

	/** Options associated with the list item select */
	isPermissionAllowed?: boolean,

	/** Options associated with the list item select */
	options?: Object,

	/** Called when Select option is changed */
	onChangePermission?: Function
}

const PermissionsListItem = (props: Props) => {
	const {
		title,
		subtitle,
		options,
		isPermissionAllowed,
		onChangePermission
	} = props

	const parentClass = cx('permissions-list-item', {
		'list-item-title-only': !subtitle
	})

	return (
		<li className={parentClass}>
			<div className="list-item__image-wrapper">
				<Icon
					icon={isPermissionAllowed ? 'check_circle' : 'close'}
					isLineIcon
					className={'list-item__icon'}
					className={cx('list-item__icon', {
						'permission-allowed__icon': isPermissionAllowed,
						'permission-not-allowed__icon': !isPermissionAllowed
					})}
				/>
			</div>
			<div className="list-item__text-wrapper">
				<p className="list-item__title">{title}</p>
				{subtitle && (
					<p
						className="list-item__subtitle"
						dangerouslySetInnerHTML={{ __html: subtitle }}
					/>
				)}
			</div>
			<div className="permission-list-item__select-wrapper">
				<Select
					options={options}
					defaultValue={isPermissionAllowed}
					onChange={onChangePermission && onChangePermission}
				/>
			</div>
		</li>
	)
}

PermissionsListItem.defaultProps = {
	subtitle: '',
	isPermissionAllowed: true,
	options: { true: 'Always', false: 'Never' }
}

export default PermissionsListItem
