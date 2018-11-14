// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import Page, { PageHeader, PageContent } from './index'

const stories = storiesOf('Page', module)

stories.addDecorator(withKnobs)

stories.add('Page', () => (
	<Page>
		<PageHeader
			backLinkHref={text('backLinkHref', '') || ''}
			backLinkText={text('backLinkText', '') || 'Back'}
			title={text('title', '') || 'Page Title'}
		/>
		<PageContent>
			<p>Page Content</p>
		</PageContent>
	</Page>
))
