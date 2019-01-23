// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	object,
	number,
	select
} from '@storybook/addon-knobs/react'
import FormBuilder from './FormBuilder'
import Page, { PageContent } from '../../../Page'
import Card, { CardHeader, CardBody, CardSection } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'

const stories = storiesOf('FormBuilder', module)

const withLayout = storyFn => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>
					<Card>
						<CardBody>{storyFn()}</CardBody>
					</Card>
				</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
)

stories.addDecorator(withKnobs)
// stories.addDecorator(withLayout)

stories
	.add('Basic', () => (
		<FormBuilder
			rows={[
				{
					id: 'settings',
					fields: [
						{
							id: 'settingsList',
							element: 'list',
							items: [
								{
									title: 'Guest SMS cancellations',
									subtitle: 'Guests can cancel an appointment via SMS',
									toggleId: 'smsCancellations',
									toggleProps: {
										onChange: () => {
											console.log('Boop')
										}
									}
								},
								{
									title: 'Guest SMS confirmations',
									subtitle: 'Guests can confirm an appointment via SMS',
									toggleId: 'smsConfirmations'
								}
							]
						}
					]
				}
			]}
		/>
	))
	.add('With Submit', () => (
		<FormBuilder
			validate={values => {
				let errors = {}
				if (!values.publicName) {
					errors.publicName = 'Please include a public name'
				}
				if (!values.streetAddress) {
					errors.streetAddress = 'Please include a street address'
				}
				if (!values.city) {
					errors.city = 'Please include a city'
				}
				if (!values.postalCode) {
					errors.postalCode = 'Please include a postal/zip code'
				}
				if (!values.country) {
					errors.country = 'Please include a country'
				}
				if (!values.region) {
					errors.region = 'Please include a state or region'
				}
				return errors
			}}
			onSubmit={values => console.log('Submit', { values })}
			initialValues={{
				publicName: 'Chimera Hair Salon',
				streetAddress: '',
				streetAddress2: '',
				city: '',
				postalCode: '',
				country: 'United States',
				region: ''
			}}
			formLayout={{
				spacing: 'tight'
			}}
			rows={[
				{
					id: 'publicNameRow',
					fields: [
						{
							element: 'textInput',
							id: 'publicName',
							label: 'Public Name',
							helper: 'This is the name that your guests will see',
							required: true
						}
					]
				},
				{
					id: 'streetAddressRow',
					fields: [
						{
							element: 'textInput',
							id: 'streetAddress',
							label: 'Street Address',
							placeholder: '123 High St',
							required: true
						}
					]
				},
				{
					id: 'streetAddress2row',
					fields: [
						{
							element: 'textInput',
							id: 'streetAddress2',
							label: 'Unit, Suite, Etc… (Optional)',
							required: false
						}
					]
				},
				{
					id: 'cityAndPostalRow',
					fields: [
						{
							id: 'city',
							element: 'textInput',
							label: 'City',
							placeholder: 'Springfield',
							required: true
						},
						{
							id: 'postalCode',
							element: 'textInput',
							label: 'Postal / Zip Code',
							placeholder: '888888',
							required: true
						}
					]
				},
				{
					id: 'countryAndRegionRow',
					fields: [
						{
							id: 'country',
							element: 'textInput',
							label: 'Country',
							placeholder: 'Select an option…',
							required: true
						},
						{
							id: 'region',
							element: 'textInput',
							label: 'State',
							placeholder: 'Select an option…',
							required: true
						}
					]
				}
			]}
			primaryCTA={{
				text: 'Add location'
			}}
		/>
	))
	.add('Settings page', () => (
		<Page>
			<PageContent>
				<Layout>
					<LayoutSection>
						<Card>
							<CardHeader title="Appointment settings" />
							<CardBody>
								<FormBuilder
									initialValues={{
										pastApptEditingCutoff: '45min',
										pastApptBookingCutoff: '10min',
										guestUpdateDelays: '1min',
										autoConfirmAppts: true
									}}
									onSubmit={values => console.log('Submit', { values })}
									formLayout={{
										spacing: 'tight'
									}}
									rows={[
										{
											id: 'pastEditingCutoffRow',
											fields: [
												{
													element: 'textInput',
													id: 'pastApptEditingCutoff',
													title: 'Cutoff for editing appointments in the past',
													description:
														'Once an appointment is past, how many minutes should I wait until I block the ability to edit it? Note: Paid appointments cannot be edited.	'
												}
											]
										},
										{
											id: 'pastApptBookingCutoffRow',
											fields: [
												{
													element: 'textInput',
													id: 'pastApptBookingCutoff',
													title: 'Booking past appointment cutoff',
													description:
														'How far in the past should I allow appointments to be booked?	'
												}
											]
										},
										{
											id: 'guestUpdateDelaysRow',
											fields: [
												{
													element: 'textInput',
													id: 'guestUpdateDelays',
													title: 'Guest update delays',
													description:
														'How long should I wait before sending an update text to the guest when changes are made to their appointment? This gives you time to make a few edits back-to-back without the guest receiving a ton of texts.'
												}
											]
										},
										{
											id: 'autoConfirmRow',
											fields: [
												{
													id: 'autoConfirm',
													element: 'list',
													items: [
														{
															id: 'autoConfirm',
															title: 'Auto-Confirm Appointments',
															subtitle:
																'Should I auto-confirm all booked appointments?',
															toggleId: 'autoConfirm',
															toggleProps: {
																defaultChecked: true,
																onChange: () => {
																	console.log('Boop')
																}
															}
														}
													]
												}
											]
										}
									]}
								/>
							</CardBody>
						</Card>
					</LayoutSection>
				</Layout>
			</PageContent>
		</Page>
	))
