// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import Sidebar from './Sidebar'
import HomeIcon from '../../../../../static/assets/icons/Interface-Essential/Home/house-1--16w.svg'
import TeamsIcon from '../../../../../static/assets/icons/Work-Office-Companies/Human-Resources/human-resources-search-team--16w.svg'
import NotificationsIcon from '../../../../../static/assets/icons/Messages-Chat-Smileys/Conversation/conversation-text--16w.svg'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Sidebar', module)

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

stories.add('Default', () => (
	<Sidebar
		items={personalItems}
		isExpanded
		forceCloseSidebar={() => null}
		STORYBOOKdoNotWrap
	/>
))
