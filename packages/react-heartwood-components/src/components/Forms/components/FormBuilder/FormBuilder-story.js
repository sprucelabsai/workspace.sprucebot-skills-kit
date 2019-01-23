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
import Card from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'

const stories = storiesOf('FormBuilder', module)

const withLayout = storyFn => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>
					<Card>{storyFn()}</Card>
				</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
)

stories.addDecorator(withKnobs)
stories.addDecorator(withLayout)

stories.add('Basic', () => (
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
