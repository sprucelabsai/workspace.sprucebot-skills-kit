import React from 'react'
import cx from 'classnames'
import Button, { Action } from '../../../Button/Button'
import { IHWListHeader } from '@sprucelabs/spruce-types'
import { unionArray } from '../../../..'

export interface IListHeaderProps extends Omit<IHWListHeader, 'actions'> {
	actions?: Action[]
}

const ListHeader = (
	props: IListHeaderProps | IHWListHeader
): React.ReactElement => {
	const { title, subtitle, isSmall, actions } = props
	const parentClass = cx('list-header', { 'list-header-small': isSmall })

	return (
		<div className={parentClass}>
			<div className="list-header__text">
				<h3 className="list-header__title">{title}</h3>
				{subtitle && <p className="list-header__subtitle">{subtitle}</p>}
			</div>
			{Array.isArray(actions) && actions.length > 0 && (
				<ul className="list-header__actions">
					{unionArray(actions).map((action, idx) => (
						<li key={idx} className="list-header__action-wrapper">
							<Button {...action} />
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

ListHeader.defaultProps = {
	subtitle: '',
	isSmall: false,
	actions: []
}

export default ListHeader
