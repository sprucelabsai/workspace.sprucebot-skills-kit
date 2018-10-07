import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import {
	H1,
	BotText,
	Paragraph as P,
	Tabs,
	TabPane,
	SectionHeading,
	Loader,
	List,
	ListItem
} from '@sprucelabs/react-sprucebot'

export default class TeamDashboard extends Component {
	userListItems(users) {
		return users.map((user, idx) => (
			<ListItem
				key={`item-${idx}`}
				online={user.status === 'online'}
				title={user.User.name}
				subtitle={
					user.lastRecordedVisit
						? moment(new Date(user.lastRecordedVisit)).fromNow()
						: 'Never'
				}
				rightTitle={`${user.visits} visit${user.visits === 1 ? '' : 's'}`}
				avatar={
					user.User.profileImages
						? user.User.profileImages.profile60
						: user.User.defaultProfileImages.profile60
				}
			/>
		))
	}

	render() {
		const {
			lang,
			auth,
			guestsLoading,
			guestsError,
			guests,
			teammates,
			teammatesError,
			teammatesLoading
		} = this.props

		return (
			<div>
				<H1>
					{lang.getText('teamDashboardWelcome', {
						user: auth
					})}
				</H1>
				<BotText>
					{lang.getText('teamDashboardBotText', {
						user: auth
					})}
				</BotText>
				<SectionHeading>
					{lang.getText('teammateDashboardHeading')}
				</SectionHeading>
				<Tabs>
					<TabPane title={lang.getText('guestsTabTitle')}>
						{guestsLoading && <Loader />}
						{guestsError && (
							<BotText>{lang.getText('errorLoadingGuests')}</BotText>
						)}
						{guests &&
							guests.length === 0 && (
								<BotText>{lang.getText('noGuestsBotText')}</BotText>
							)}
						{guests &&
							guests.length > 0 && <List>{this.userListItems(guests)}</List>}
					</TabPane>
					<TabPane title={lang.getText('teammatesTabTitle')}>
						{teammatesLoading && <Loader />}
						{teammatesError && (
							<BotText>{lang.getText('errorLoadingTeammates')}</BotText>
						)}
						{teammates && <List>{this.userListItems(teammates)}</List>}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

TeamDashboard.propTypes = {
	guestsLoading: PropTypes.bool,
	guestsError: PropTypes.object,
	guests: PropTypes.array,
	teammatesLoading: PropTypes.bool,
	teammatesError: PropTypes.object,
	teammates: PropTypes.array,
	auth: PropTypes.object.isRequired
}

TeamDashboard.defaultProps = {
	guestsLoading: true,
	teammatesLoading: true
}
