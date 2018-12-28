// @flow
import React from 'react'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button from '../../../../../Button/Button'
import Card from '../../../../../Card/Card'
import List from '../../../../../List/List'

type Props = {
	isMenuVisible: boolean,
	onClick: Function,
	locationManagementHref: string,
	locationName: string,
	locationAddress: string
}

export default props => (
	<div className="header-primary__shortcut-btn-wrapper">
		<Button
			onClick={props.onClick}
			className={cx('header-primary__shortcut-btn', {
				'header-primary__shortcut-btn--is-active': props.isMenuVisible
			})}
			icon={{ name: 'location' }}
			text="Location"
			isIconOnly
		/>
		<VelocityTransitionGroup
			enter={{
				animation: { opacity: 1, translateY: '4px' },
				duration: 200
			}}
			leave={{
				animation: { opacity: 0, translateY: '8px' },
				duration: 0
			}}
		>
			{props.isMenuVisible && (
				<Card className="header-primary__location-menu">
					<List
						className="header-primary__location-info"
						items={[
							{
								title: props.locationName,
								subtitle: props.locationAddress,
								icon: {
									name: 'location',
									isLineIcon: true
								}
							}
						]}
					/>
					<Button
						kind="simple"
						className="header-primary__location-management-btn"
						text="Manage locations"
						href={props.locationManagementHref}
					/>
				</Card>
			)}
		</VelocityTransitionGroup>
	</div>
)
