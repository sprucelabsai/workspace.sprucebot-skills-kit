// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../.storybook/StylesProvider'
import user01image from '../../../static/assets/users/user-01--96w.png'
import { Sidebar, SidebarSection } from '../Core'
import Card, { CardHeader, CardBody, CardFooter } from '../Card'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import ContextMenu from '../ContextMenu/ContextMenu'
import Page from '../Page/Page'
import PageHeader from '../Page/components/PageHeader/PageHeader'
import PageContent from '../Page/components/PageContent/PageContent'
import Layout, { LayoutSection } from '../../components/Layout'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'
import TextStyle from '../TextStyle/TextStyle'
import Heading from '../Heading/Heading'
import Subheading from '../Subheading/Subheading'
import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'
import SaveBar from '../Core/components/SaveBar/SaveBar'
import FeedBuilder from '../Core/components/FeedBuilder/FeedBuilder'
import { messages, generateMessages } from '../../../.storybook/data/feed'

import View from './View.js'
import simple from 'graphql-query-complexity/dist/estimators/simple'
import { generate } from 'rxjs'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('View', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

const personalItems = [
	{
		text: 'Home',
		icon: { icon: 'home', className: 'sidebar-item__line-icon' },
		isCurrent: true,
		href: '#'
	},
	{
		text: 'Teams',
		icon: { icon: 'team', className: 'sidebar-item__line-icon' },
		isCurrent: false,
		href: '#'
	},
	{
		text: 'Notification Preferences',
		icon: { icon: 'messages', className: 'sidebar-item__line-icon' },
		isCurrent: false,
		href: '#'
	}
]

const orgItems = [
	{
		text: 'Organization Dashboard',
		icon: { icon: 'dashboard' },
		isCurrent: false,
		href: '#'
	},
	{
		text: 'Locations',
		icon: { icon: 'location' },
		isCurrent: true,
		href: '#'
	},
	{
		text: 'Team',
		icon: { icon: 'team' },
		href: '#'
	},
	{
		text: 'Skills',
		icon: { icon: 'skill' },
		href: '#',
		action: {
			text: 'Get Skills',
			href: '#',
			isSmall: true
		}
	},
	{
		text: 'Settings',
		icon: { icon: 'settings' },
		href: '#'
	}
]

const bizItems = [
	{
		text: 'Dashboard',
		icon: { icon: 'dashboard' }
	},
	{
		text: 'Guests',
		icon: { icon: 'guests' },
		isCurrent: true
	},
	{
		text: 'Team',
		icon: { icon: 'team' }
	},
	{
		text: 'Calendar',
		icon: { icon: 'calendar' }
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

const skillViewTabs = [
	{
		text: 'Info',
		isCurrent: true
	},
	{
		text: 'Scheduling'
	}
]

type Props = {}
type State = {
	sidebarsExpanded: Object,
	sidebarsMobileExpanded: Object
}

class SkillViewExample extends Component<Props, State> {
	state = {
		sidebarsExpanded: {
			right: true,
			left: true
		},
		sidebarsMobileExpanded: {
			right: false,
			left: false
		}
	}

	componentDidMount = () => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', this.onResize, false)
		}
	}

	componentWillUnmount = () => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.onResize, false)
		}
	}

	onResize = () => {
		const { sidebarsMobileExpanded } = this.state
		if (typeof window !== 'undefined') {
			if (window.innerWidth > 990 && sidebarsMobileExpanded.right) {
				this.hideRightSidebar()
			}
			if (window.innerWidth > 750 && sidebarsMobileExpanded.left) {
				this.hideLeftSidebar()
			}
		}
	}

	handleSidebarToggle = (side: string) => {
		this.setState(prevState => ({
			sidebarsExpanded: {
				...prevState.sidebarsExpanded,
				[side]: !prevState.sidebarsExpanded[side]
			}
		}))
	}

	handleMobileSidebarToggle = (side: string) => {
		this.setState(prevState => ({
			sidebarsMobileExpanded: {
				...prevState.sidebarsMobileExpanded,
				[side]: !prevState.sidebarsMobileExpanded[side]
			},
			sidebarsExpanded: {
				...prevState.sidebarsExpanded,
				[side]: true
			}
		}))
	}

	hideRightSidebar = () => {
		this.setState(prevState => ({
			sidebarsMobileExpanded: {
				...prevState.sidebarsMobileExpanded,
				right: false
			}
		}))
	}

	hideLeftSidebar = () => {
		this.setState(prevState => ({
			sidebarsMobileExpanded: {
				...prevState.sidebarsMobileExpanded,
				left: false
			}
		}))
	}

	render() {
		const { sidebarsExpanded, sidebarsMobileExpanded } = this.state
		return (
			<View
				STORYBOOKdoNotWrap
				sidebarItems={orgItems}
				user={user}
				business={business}
				isSidebarExpanded={sidebarsExpanded.left}
				isSidebarMobileExpanded={sidebarsMobileExpanded.left}
				toggleSidebarExpanded={() => this.handleSidebarToggle('left')}
				toggleSidebarVisibility={() => this.handleMobileSidebarToggle('left')}
			>
				<Page
					header={{
						title: 'Chimera Hair Salon at the Point',
						primaryAction: {
							text: 'Go to location dashboard',
							icon: { name: 'new_tab' },
							kind: 'simple',
							isSmall: true
						},
						backLinkHref: '#',
						backLinkText: 'Locations',
						sidebarExpander: {
							icon: { name: 'more_vertical', isLineIcon: true },
							onClick: () => this.handleMobileSidebarToggle('right')
						},
						tabs: skillViewTabs
					}}
					hasSidebar="large"
					sidebarIsCollapsed={!sidebarsExpanded.right}
				>
					<Sidebar
						side="right"
						isCollapsible={false}
						isLarge
						isExpanded={sidebarsExpanded.right}
						isMobileExpanded={sidebarsMobileExpanded.right}
						toggleExpanded={() => this.handleSidebarToggle('right')}
						mobileHeader={{
							title: 'Chimera Salon at the Point',
							action: {
								icon: { name: 'close' },
								isSmall: true,
								onClick: () => this.handleMobileSidebarToggle('right')
							}
						}}
					>
						<SidebarSection>
							<Card isSmall>
								<CardHeader
									labelText="Location Status"
									labelIcon={{ name: 'hide', isLineIcon: true }}
									title="This location is hidden"
								/>
								<CardBody>
									<p>
										This location is currently hidden from guests, but is
										visible to you and your teammates.
									</p>
								</CardBody>
								<CardFooter>
									<ButtonGroup
										actions={[
											{
												text: 'Preview as guest',
												kind: 'simple',
												isSmall: true
											},
											{
												text: 'Make location live',
												kind: 'primary',
												isSmall: true
											}
										]}
									/>
								</CardFooter>
							</Card>
						</SidebarSection>
					</Sidebar>
				</Page>
			</View>
		)
	}
}

stories
	.add('Default', () => (
		<View
			STORYBOOKdoNotWrap
			sidebarItems={personalItems}
			user={user}
			business={business}
			isSidebarExpanded
		>
			<Page
				header={{
					title: 'Hello Human'
				}}
			/>
		</View>
	))
	.add('Save Bar', () => (
		<View
			STORYBOOKdoNotWrap
			sidebarItems={personalItems}
			user={user}
			business={business}
			isSidebarExpanded
		>
			<Page
				header={{
					title: 'Hello Human'
				}}
			/>
			<SaveBar isVisible={boolean('isVisible', true)} />
		</View>
	))
	.add('Skill View', () => <SkillViewExample STORYBOOKdoNotWrap />)
	.add('Guest Profile', () => {
		let messages = generateMessages({ count: 50, interval: 31 })
		return (
			<View
				STORYBOOKdoNotWrap
				sidebarItems={bizItems}
				user={user}
				business={business}
				isSidebarExpanded
			>
				<Page hasSidebar>
					<FeedBuilder
						messages={messages}
						messageCount={50}
						onRowsRequested={() => null}
					/>
					<Sidebar isLarge isCollapsible={false} side="right">
						<SidebarSection
							isCentered
							verticalSpacing="loose"
							horizontalSpacing="loose"
						>
							<Avatar
								isLarge
								isCentered
								image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80"
							/>
							<Heading>
								<TextStyle type="strong">Dorian Feeney</TextStyle>
							</Heading>
						</SidebarSection>
						<SidebarSection horizontalSpacing="loose" className="u-flex-row">
							<Button
								isSmall
								kind="secondary"
								className="u-flex-child-grow"
								text="Call Dorian"
								icon={{
									name: 'phone',
									isLineIcon: true
								}}
							/>
							<ContextMenu
								isSmall
								className="u-ml-tight"
								actions={[
									{
										text: 'One action'
									},
									{
										text: 'two action'
									},
									{
										text: 'red action'
									},
									{
										text: 'blue action'
									}
								]}
								isSimple
							/>
						</SidebarSection>
					</Sidebar>
				</Page>
			</View>
		)
	})
