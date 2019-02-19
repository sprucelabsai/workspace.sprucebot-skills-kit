// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs/react'
import FormBuilder from './FormBuilder'
import Modal from '../../../Modal/Modal'
import Page, { PageContent } from '../../../Page'
import Card, { CardBody } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'

const stories = storiesOf('FormBuilder', module)

stories.addDecorator(withKnobs)
// stories.addDecorator(withLayout)

stories
	.add('Basic', () => (
		<Page>
			<PageContent>
				<Layout>
					<LayoutSection>
						<Card>
							<CardBody>
								<FormBuilder
									kind="page"
									validate={console.log}
									sections={object('sections', [
										{
											title: 'Appointment Settings',
											fields: [
												{
													name: 'guestSMSCancellations',
													type: 'boolean',
													props: {
														label: 'Guest SMS cancellations',
														helper: 'Guests can cancel an appointment via SMS'
													}
												},
												{
													name: 'Personalized Message',
													type: 'text',
													props: {
														label: 'Confirmation message',
														helper:
															'You have {{Organization.name}} and {{Location.name}}'
													}
												}
											]
										}
									])}
								/>
							</CardBody>
						</Card>
					</LayoutSection>
				</Layout>
			</PageContent>
		</Page>
	))
	.add('With Submit', () => (
		<Page>
			<PageContent>
				<Layout>
					<LayoutSection>
						<Card>
							<CardBody>
								<FormBuilder
									validate={values => {
										console.log('Validate: ', { values })
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
									sections={object('sections', [
										{
											fields: [
												{
													type: 'text',
													name: 'publicName',
													props: {
														label: 'Public Name',
														helper:
															'This is the name that your guests will see',
														required: true
													}
												},
												{
													type: 'text',
													name: 'streetAddress',
													props: {
														label: 'Street Address',
														placeholder: '123 High St',
														required: true
													}
												},
												{
													type: 'text',
													name: 'streetAddress2',
													props: {
														label: 'Unit, Suite, Etc… (Optional)',
														required: false
													}
												},
												{
													name: 'city',
													type: 'text',
													props: {
														label: 'City',
														placeholder: 'Springfield',
														required: true
													}
												},
												{
													name: 'postalCode',
													type: 'text',
													props: {
														label: 'Postal / Zip Code',
														placeholder: '888888',
														required: true
													}
												},
												{
													name: 'country',
													type: 'text',
													props: {
														label: 'Country',
														placeholder: 'Select an option…',
														required: true
													}
												},
												{
													name: 'region',
													type: 'text',
													props: {
														label: 'State',
														placeholder: 'Select an option…',
														required: true
													}
												}
											]
										}
									])}
									primaryCTA={{
										text: 'Add location'
									}}
								/>
							</CardBody>
						</Card>
					</LayoutSection>
				</Layout>
			</PageContent>
		</Page>
	))
	.add('Settings page', () => (
		<Page>
			<PageContent>
				<FormBuilder
					kind="page"
					initialValues={{
						pastApptEditingCutoff: '45min',
						pastApptBookingCutoff: '10min',
						guestUpdateDelays: '1min',
						autoConfirmAppts: true,
						apptReminder1: '24hrs',
						apptReminder1Buffer: '48hrs',
						apptReminder2: '1hr',
						apptReminder2Buffer: '2hrs'
					}}
					validate={values => {
						let errors = {}
						if (!values.pastApptEditingCutoff) {
							errors.pastApptEditingCutoff = 'Please include a cutoff time'
						}
						if (!values.pastApptBookingCutoff) {
							errors.pastApptBookingCutoff = 'Please include a cutoff time'
						}
						if (!values.guestUpdateDelays) {
							errors.guestUpdateDelays = 'Please include a delay'
						}
						if (!values.apptReminder1) {
							errors.apptReminder1 = 'Please include a reminder time'
						}
						if (!values.apptReminder1Buffer) {
							errors.apptReminder1Buffer = 'Please include a buffer time'
						}
						if (!values.apptReminder2) {
							errors.apptReminder2 = 'Please include a reminder time'
						}
						if (!values.apptReminder2Buffer) {
							errors.apptReminder2Buffer = 'Please include a buffer time'
						}
						return errors
					}}
					onSubmit={values => console.log('Submit', { values })}
					formLayout={{
						spacing: 'tight'
					}}
					sections={object('sections', [
						{
							title: 'Appointment settings',
							fields: [
								{
									type: 'duration',
									name: 'pastApptEditingCutoff',
									props: {
										minMinutes: 5,
										maxMinutes: 60 * 5,
										label: 'Cutoff for editing appointments in the past',
										helper:
											'Once an appointment is past, how many minutes should I wait until I block the ability to edit it? Note: Paid appointments cannot be edited.',
										required: true
									}
								},
								{
									type: 'text',
									name: 'pastApptBookingCutoff',
									props: {
										label: 'Booking past appointment cutoff',
										helper:
											'How far in the past should I allow appointments to be booked?',
										required: true
									}
								},
								{
									type: 'text',
									name: 'guestUpdateDelays',
									props: {
										label: 'Guest update delays',
										helper:
											'How long should I wait before sending an update text to the guest when changes are made to their appointment? This gives you time to make a few edits back-to-back without the guest receiving a ton of texts.',
										required: true
									}
								},
								{
									name: 'autoConfirm',
									type: 'boolean',
									props: {
										label: 'Auto-Confirm Appointments',
										helper: 'Should I auto-confirm all booked appointments?',
										defaultValue: false
									}
								}
							]
						},
						{
							title: 'Reminder Settings',
							fields: [
								{
									name: 'apptReminder1',
									type: 'text',
									props: {
										label: 'Appointment Reminder 1',
										helper:
											'How many hours before an appointment should I send the first reminder?',
										required: true
									}
								},
								{
									name: 'apptReminder1Buffer',
									type: 'text',
									props: {
										label: 'Appointment Reminder 1 Buffer',
										helper:
											"How many hours before an appointment does a guest need to book to activate the first reminder? Example, I don't want to send a 24 hour reminder if someone booked 25 hours ago because they'd get a confirmation text and then a reminder an hour later.",
										required: true
									}
								},
								{
									name: 'apptReminder2',
									type: 'text',
									props: {
										label: 'Appointment Reminder 2',
										helper:
											'How many hours before an appointment should I send the second reminder?'
									}
								},
								{
									name: 'apptReminder2Buffer',
									type: 'text',
									props: {
										label: 'Appointment Reminder 2 Buffer',
										helper:
											"How many hours before an appointment does a guest need to book to activate the second reminder?  Example, I don't want to send an hour reminder if someone booked 61 minutes ago because they'd get a confirmation text and then a reminder a minute later.",
										required: true
									}
								},
								{
									name: 'appointmentSync',
									type: 'select',
									props: {
										label: 'How often should I sync appointments?',
										helper:
											'How often should I check for new appointments and sync them?',
										options: {
											hourly: 'Hourly',
											daily: 'Daily',
											weekly: 'Weekly'
										},
										defaultValue: 'weekly',
										required: true
									}
								}
							]
						}
					])}
				/>
			</PageContent>
		</Page>
	))
	.add('In a modal', () => (
		<Page>
			<PageContent>
				<Modal isOpen isSmall>
					<Modal.Header title="New location group" />
					<FormBuilder
						initialValues={{
							groupName: ''
						}}
						validate={() => {
							let errors = {}

							// TODO: Hook up groupName custom error
							// if (!groupName) {
							// 	errors.groupName = 'Please name this group'
							// }

							return errors
						}}
						onSubmit={values => console.log('Submit', { values })}
						formLayout={{
							spacing: 'tight'
						}}
						kind="modal"
						sections={[
							{
								fields: [
									{
										name: 'groupName',
										type: 'text',
										props: {
											label: 'Group Name',
											placeholder: 'e.g. East, West, Midwest, etc…'
										}
									}
								]
							}
						]}
						primaryCTA={{
							text: 'Create group'
						}}
						secondaryCTA={{
							text: 'Cancel'
						}}
					/>
				</Modal>
			</PageContent>
		</Page>
	))
