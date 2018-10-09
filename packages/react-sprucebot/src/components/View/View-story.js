// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../.storybook/StylesProvider'
import HomeIcon from '../../../static/assets/icons/Interface-Essential/Home/house-1--16w.svg'
import TeamsIcon from '../../../static/assets/icons/Work-Office-Companies/Human-Resources/human-resources-search-team--16w.svg'
import NotificationsIcon from '../../../static/assets/icons/Messages-Chat-Smileys/Conversation/conversation-text--16w.svg'
import user01image from '../../../static/assets/users/user-01--96w.png'

import View from './View.js'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('View', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

const personalItems = [
	{
		text: 'Home',
		icon: <HomeIcon className="sidebar-item__line-icon" />,
		isCurrent: true,
		href: '#'
	},
	{
		text: 'Teams',
		icon: <TeamsIcon className="sidebar-item__line-icon" />,
		isCurrent: false,
		href: '#'
	},
	{
		text: 'Notification Preferences',
		icon: <NotificationsIcon className="sidebar-item__line-icon" />,
		isCurrent: false,
		href: '#'
	}
]

const user = {
	name: 'Madaline Gibson',
	image: user01image,
	tel: '(605) 230-5253'
}

const business = {
	name: 'Chimera Hair Salon',
	address: '7678 N High St, Denver, CO'
}

stories.add('Default', () => (
	<View
		STORYBOOKdoNotWrap
		sidebarItems={personalItems}
		user={user}
		business={business}
	/>
))
