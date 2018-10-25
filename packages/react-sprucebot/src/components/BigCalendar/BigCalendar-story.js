// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import BigCalendar from './BigCalendar'

const stories = storiesOf('Big Calendar', module)

stories.addDecorator(withKnobs)

stories.add('default', () => {
	const users = [
		{
			name: 'Carolyn Selheim-Miller',
			nameWithLastInitial: 'Carolyn S.',
			casualName: 'Carolyn',
			profileImages: {
				profile60:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X60.png',
				'profile60@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X60@2x.png',
				profile150:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X150.png',
				'profile150@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/180e751d-422f-4bdf-b6db-a3ad81f65be5--X150@2x.png'
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
			},
			id: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
			firstName: 'Carolyn',
			lastName: 'Selheim-Miller',
			profileImageUUID: '180e751d-422f-4bdf-b6db-a3ad81f65be5',
			createdAt: '2018-07-17T19:02:52.758Z',
			updatedAt: '2018-10-18T15:31:57.304Z'
		},
		{
			updatedAt: '2018-10-24T23:33:58.794Z',
			createdAt: '2016-11-17T18:45:32.706Z',
			id: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
			firstName: 'Taylor',
			lastName: 'Romero',
			name: 'Taylor Romero',
			profileImageUUID: 'f9ea1f05-a801-4f34-9d86-ec75c5c3881c',
			profileImages: {
				profile60:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X60.png',
				'profile60@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X60@2x.png',
				profile150:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X150.png',
				'profile150@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/f9ea1f05-a801-4f34-9d86-ec75c5c3881c--X150@2x.png'
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
			},
			casualName: 'Taylor'
		},
		{
			updatedAt: '2018-10-12T18:16:14.579Z',
			createdAt: '2016-11-17T18:45:32.707Z',
			id: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
			firstName: 'Brandon',
			lastName: 'Minch',
			name: 'Brandon Minch',
			profileImageUUID: '164224db-8523-48ee-8314-ae371cd47ca1',
			profileImages: {
				profile60:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X60.png',
				'profile60@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X60@2x.png',
				profile150:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X150.png',
				'profile150@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/164224db-8523-48ee-8314-ae371cd47ca1--X150@2x.png'
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
			},
			casualName: 'Brandon'
		},
		{
			updatedAt: '2018-10-19T18:43:32.454Z',
			createdAt: '2017-05-10T20:39:26.871Z',
			id: '909beac7-42f7-443f-bd86-c762705c0c18',
			firstName: 'Ricky',
			lastName: 'Padilla',
			name: 'Ricky Padilla',
			profileImageUUID: '0725ae46-cfe1-46f6-afa5-80c0233b6dba',
			profileImages: {
				profile60:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X60.png',
				'profile60@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X60@2x.png',
				profile150:
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X150.png',
				'profile150@2x':
					'https://s3.amazonaws.com/sprucebot-dev/userProfileImages/0725ae46-cfe1-46f6-afa5-80c0233b6dba--X150@2x.png'
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
			},
			casualName: 'Ricky'
		}
	]

	const location = {
		id: '9139bfeb-7143-4a50-abad-2f768decb1d1',
		name: 'Barbershop #32',
		addressLine1: '3833 Steele st',
		addressLine2: 'Unit D',
		addressCity: 'Denver',
		addressState: 'CO',
		addressZip: '80205',
		addressCountry: 'US',
		geo: {
			lat: 39.7695943,
			lng: -104.9500088
		},
		OrganizationId: 'bc02c800-60f2-4e37-8ed1-a32f6a50e0a2',
		isPublic: false,
		timezone: 'America/Denver',
		archived: false,
		profileImages: {
			profile60:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
			'profile60@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
			profile150:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
			'profile150@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
		},
		phoneNumber: null,
		enableLockScreen: true
	}

	return (
		<Container>
			<BigCalendar allUsers={users} location={location} />
		</Container>
	)
})
