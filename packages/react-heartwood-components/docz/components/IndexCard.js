import React from 'react'
import cx from 'classnames'
import Card from '../../src/components/Card/Card'
import AvatarIcon from '../images/avatars-icon.svg'
import ButtonsIcon from '../images/button-icon.svg'
import CardsIcon from '../images/cards-icon.svg'
import CommunicationIcon from '../images/communication-icon.svg'
import CoreIcon from '../images/core-icon.svg'
import FeedbackIcon from '../images/feedback-icon.svg'
import FormsIcon from '../images/forms-icon.svg'
import IconsIcon from '../images/icons-icon.svg'
import ImagesIcon from '../images/images-icon.svg'
import ListsIcon from '../images/lists-icon.svg'
import ModalsIcon from '../images/modals-icon.svg'
import NavigationIcon from '../images/navigation-icon.svg'
import LayoutIcon from '../images/layout-icon.svg'
import TablesIcon from '../images/tables-icon.svg'
import TextIcon from '../images/text-icon.svg'
import UtilitiesIcon from '../images/utilities-icon.svg'

const iconsMap = {
	Avatars: AvatarIcon,
	Buttons: ButtonsIcon,
	Cards: CardsIcon,
	Communication: CommunicationIcon,
	Core: CoreIcon,
	Feedback: FeedbackIcon,
	Forms: FormsIcon,
	Icons: IconsIcon,
	Images: ImagesIcon,
	Lists: ListsIcon,
	Modals: ModalsIcon,
	Navigation: NavigationIcon,
	Layout: LayoutIcon,
	Tables: TablesIcon,
	Text: TextIcon,
	Utilities: UtilitiesIcon
}

const IndexCard = ({
	name,
	description,
	icon,
	iconBg = '#8388f0',
	isSmall
}) => {
	const IconHandler = iconsMap[icon]
	return (
		<Card
			isSmall
			className={cx('docz__index-card', {
				'docz__index-card--is-small': isSmall
			})}
		>
			{typeof IconHandler !== 'undefined' && (
				<div
					className="docz__index-card-icon-wrapper"
					style={{ backgroundColor: iconBg }}
				>
					<IconHandler
						className={cx('docz__index-card-icon', {
							'docz__index-card-icon--fill': name === 'Core'
						})}
					/>
				</div>
			)}
			<div className="docz__index-card-text">
				<p className="docz__index-card-title">{name}</p>
				{description && (
					<p className="docz__index-card-description">{description}</p>
				)}
			</div>
		</Card>
	)
}

export default IndexCard
