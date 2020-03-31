import {
	IHWButtonKinds,
	IHWButtonTypes,
	IHWCardBuilder,
	IHWCardBuilderBodyItemType,
	IHWLayoutBuilderSectionType
} from '@sprucelabs/spruce-types'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ButtonKinds } from '../Button/Button'
import LayoutSection from '../Layout/components/LayoutSection/LayoutSection'
import Layout from '../Layout/Layout'
import Page, { PageContent } from '../Page'
import { LayoutBuilder } from './LayoutBuilder'

const stories = storiesOf('LayoutBuilder', module)

const cardJSON: IHWCardBuilder = {
	id: 'foo',
	header: {
		title: 'Introducing the Card Builder! (Note: WIP)',
		labelText: '',
		actions: [
			{
				id: 'foo',
				type: IHWButtonTypes.Button,
				text: 'More Info',
				href: '#',
				htmlAttributes: {
					target: '_blank'
				},
				isSmall: true
			}
		]
	},
	body: {
		items: [
			{
				type: IHWCardBuilderBodyItemType.Text,
				viewModel: {
					id: 'first',
					text: `The Card Builder enables Skill devs to build cards using JSON. It should not be used for core cards.`
				}
			}
		]
	},
	footer: {
		buttonGroup: {
			actions: [
				{
					id: 'foo',
					type: IHWButtonTypes.Button,
					text: 'Fire a JS Callback!',
					htmlAttributes: {
						onClick: () => window.alert('clicked!')
					},
					kind: ButtonKinds.Secondary,
					isSmall: true
				}
			]
		}
	}
}
stories.addDecorator(story => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>{story()}</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
))

stories.addDecorator(withKnobs)

stories.add('default', () => (
	<LayoutBuilder
		sections={[
			{
				type: IHWLayoutBuilderSectionType.CardBuilder,
				viewModel: cardJSON
			},
			{
				type: IHWLayoutBuilderSectionType.Button,
				viewModel: {
					id: 'new-button',
					text: 'My cool button',
					kind: IHWButtonKinds.Primary
				}
			}
		]}
	/>
))
