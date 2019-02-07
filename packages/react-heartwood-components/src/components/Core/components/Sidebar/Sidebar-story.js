// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
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

const backLink = {
	text: 'Organization Dashboard',
	href: '#'
}

class Example extends Component {
	state = {
		showSidebar: true
	}

	handleToggleSidebar = () => {
		this.setState(prevState => ({
			showSidebar: !prevState.showSidebar
		}))
	}

	render() {
		const { showSidebar } = this.state

		return (
			<Sidebar
				items={personalItems}
				backLink={backLink}
				isExpanded={showSidebar}
				toggleExpanded={this.handleToggleSidebar}
				forceCloseSidebar={() => null}
				STORYBOOKdoNotWrap
			/>
		)
	}
}

stories.add('Default', () => <Example />)
