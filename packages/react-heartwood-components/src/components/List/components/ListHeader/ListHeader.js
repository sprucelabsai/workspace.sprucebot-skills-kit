// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'
import type { Props as ButtonProps } from '../../../Button/Button'

export type Props = {
	/** Title text */
	title: string,

	/** Optional subtitle text */
	subtitle?: string,

	/** Set true for small lists */
	isSmall?: boolean,

	/** Actions to associate with the list header */
	actions?: Array<ButtonProps>
}

const ListHeader = (props: Props) => {
	const { title, subtitle, isSmall, actions } = props
	const parentClass = cx('list-header', { 'list-header-small': isSmall })

	return (
		<div className={parentClass}>
			<div className="list-header__text">
				<h3 className="list-header__title">{title}</h3>
				{subtitle && <p className="list-header__subtitle">{subtitle}</p>}
			</div>
			{actions && actions.length > 0 && (
				<ul className="list-header__actions">
					{actions.map((action, idx) => (
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
