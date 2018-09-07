import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Feed from './Feed'
import readme from './Feed.md'

const stories = storiesOf('Feed', module)
stories.addDecorator(withKnobs)

const demoGuest = {
	id: 'b8d62e17-a511-4b9b-ae8a-56710f89af48',
	role: 'guest',
	status: 'offline',
	visits: 1,
	LocationId: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
	UserId: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
	User: {
		id: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
		firstName: 'Niki',
		name: 'Niki R.',
		profileImageUUID: null,
		profileImages: {
			profile60: 'https://hello.sprucebot.com/avatar.jpg',
			'profile60@2x': 'https://hello.sprucebot.com/avatar.jpg',
			profile150: 'https://hello.sprucebot.com/avatar.jpg',
			'profile150@2x': 'https://hello.sprucebot.com/avatar.jpg'
		},
		defaultProfileImages: {
			profile60:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
			'profile60@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
			profile150:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
			'profile150@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
		}
	},
	isConnected: true,
	lastRecordedVisit: '2017-12-01T23:05:35.705Z',
	updatedAt: '2017-12-02T00:06:05.448Z',
	Location: {
		id: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
		name: 'Spruce',
		addressLine1: '4347 Tennyson St',
		addressLine2: null,
		addressCity: 'Denver',
		addressState: 'CO',
		addressZip: '80212',
		addressCountry: 'US',
		geo: { lat: 39.775644, lng: -105.044258 },
		OrganizationId: 'fcdd548b-fe3b-42dc-8c66-6810411cd84d'
	}
}

const data = [
	{
		date: new Date('2018-02-14'),
		id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
		message: "Here's a basic FeedItem"
	},
	{
		date: new Date('2017-08-03'),
		id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
		message: 'Ryan J. has arrived! This FeedItem has a user!',
		user: demoGuest
	},
	{
		date: new Date('2017-04-26'),
		id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
		message: 'Ryan J. has arrived! This FeedItem has a user AND an attachment!',
		user: demoGuest,
		attachments: [
			{
				title: 'Membership level',
				value: 'Platinum'
			}
		]
	},
	{
		date: new Date('2016-03-25'),
		id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
		message:
			'Ryan J. has arrived! Ryan is important, this FeedItem has a user with a big avatar AND an attachment!',
		user: demoGuest,
		bigAvatar: true,
		attachments: [
			{
				title: 'Membership level',
				value: 'Platinum'
			}
		]
	},
	{
		date: new Date('2015-01-05'),
		id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
		message:
			'Shane M. has arrived! This FeedItem has the whole enchilada, complete with a big avatar and multiple attachments',
		user: demoGuest,
		bigAvatar: true,
		attachments: [
			{
				title: 'Membership level',
				value: 'Platinum',
				fullWidth: true
			},
			{
				title: 'Total Points',
				value: 5302
			},
			{
				title: 'Visits',
				value: 5
			}
		]
	}
]

stories.add(
	'Default',
	withReadme(
		readme,
		withInfo()(() => (
			<Feed
				loading={boolean('Loading', false)}
				showHeaders={boolean('Show Headers', false)}
				data={data}
			/>
		))
	)
)
