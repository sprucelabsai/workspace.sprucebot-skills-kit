// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Page from './Page'
import PageHeader from './PageHeader'
import PageContent from './PageContent'

const stories = storiesOf('Page', module)

stories.addDecorator(withKnobs)

stories.add('Page', () => (
	<Page>
		<PageHeader
			backLinkHref="/page"
			backLinkText="Previous Page"
			title="Page Title"
		/>
		<PageContent>
			<p>Page Content</p>
		</PageContent>
	</Page>
))
