// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import Page, { PageHeader, PageContent } from './index'

const stories = storiesOf('Page', module)

stories.addDecorator(withKnobs)

stories.add('Page', () => (
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
