// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'
import Toggle from '../../../Forms/Toggle/Toggle'

export interface Props {
	title: string;
	subtitle?: string;
	image?: string;
	icon?: React.Node;
	isDraggable?: boolean;
	toggleId?: boolean;
	actions?: Array<Object>;
}

const ListItem = (props: Props) => {
	const { title, subtitle, image, icon, isDraggable, toggleId, actions } = props
	const parentClass = cx('list-item', {
		'list-item-title-only': !subtitle,
		'list-item--is-draggable': isDraggable
	})
	return (
		<li className={parentClass}>
			{(image || icon) && (
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
				</div>
			)}
			<div className="list-item__text-wrapper">
				{toggleId ? (
					<label className="list-item__title" htmlFor={toggleId}>
						{title}
					</label>
				) : (
					<p className="list-item__title">{title}</p>
				)}
				{subtitle && <p className="list-item__subtitle">{subtitle}</p>}
			</div>
			{!isDraggable &&
				actions &&
				actions.length > 0 && (
					<div className="list-item__actions-wrapper">
						{actions.map((action, idx) => (
							<Button
								key={idx}
								kind="simple"
								isSmall
								className="list-item__action"
							/>
						))}
					</div>
				)}
			{toggleId && <Toggle id={toggleId} />}
		</li>
	)
}

ListItem.defaultProps = {
	subtitle: '',
	image: '',
	icon: null,
	isDraggable: false,
	toggleId: '',
	actions: []
}

export default ListItem
