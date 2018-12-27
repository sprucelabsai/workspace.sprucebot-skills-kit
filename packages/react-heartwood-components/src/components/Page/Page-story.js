// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react'
import Page, { PageHeader, PageContent } from './index'

const buttonKinds = {
	Primary: 'primary',
	Secondary: 'secondary',
	Simple: 'simple'
}

const stories = storiesOf('Page', module)

stories.addDecorator(withKnobs)

stories
	.add('Page', () => (
		<Page>
			<PageHeader
				backLinkHref={text('backLinkHref', '') || ''}
				backLinkText={text('backLinkText', '') || 'Back'}
				title={text('title', '') || 'Page Title'}
				primaryAction={
					boolean('Show Primary Action', false) && {
						text: 'Do Stuff',
						kind: 'primary'
					}
				}
				hasBottomBorder={boolean('hasBottomBorder', false)}
			/>
			<PageContent>
				<p>Page Content</p>
			</PageContent>
		</Page>
	))
	.add('With Back Link', () => (
		<Page>
			<PageHeader
				backLinkHref="#"
				backLinkText={text('backLinkText', '') || 'Back'}
				title={text('title', '') || 'Page Title'}
				hasBottomBorder={boolean('hasBottomBorder', false)}
			/>
		</Page>
	))
	.add('With Primary Action', () => (
		<Page>
			<PageHeader
				title={text('title', '') || 'Page Title'}
				hasBottomBorder={boolean('hasBottomBorder', false)}
				primaryAction={{
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: text('icon', ''),
					isSmall: boolean('isSmall', true)
				}}
			/>
		</Page>
	))
	.add('With Back Link & Primary Action', () => (
		<Page>
			<PageHeader
				title={text('title', '') || 'Page Title'}
				backLinkHref="#"
				backLinkText={text('backLinkText', '') || 'Back'}
				hasBottomBorder={boolean('hasBottomBorder', false)}
				primaryAction={{
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: {
						name: text('icon', ''),
						isLineIcon: boolean('isLineIcon', true)
					},
					isSmall: boolean('isSmall', true)
				}}
			/>
		</Page>
	))
