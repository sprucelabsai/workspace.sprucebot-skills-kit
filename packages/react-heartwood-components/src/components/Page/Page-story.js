// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react'
import Page, { PageContent } from './index'

import { manyTabs } from '../../../.storybook/data/tabs'

const buttonKinds = {
	Primary: 'primary',
	Secondary: 'secondary',
	Simple: 'simple'
}

const stories = storiesOf('Page', module)

stories.addDecorator(withKnobs)

stories
	.add('Page', () => (
		<Page
			header={{
				className: 'custom-classname',
				title: text('title', '') || 'Page Title',
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<PageContent>
				<p>Page Content</p>
			</PageContent>
		</Page>
	))
	.add('With Back Link', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<PageContent>
				<p>Page Content</p>
			</PageContent>
		</Page>
	))
	.add('With Primary Action', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				primaryAction: {
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: text('icon', ''),
					isSmall: boolean('isSmall', true)
				},
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<PageContent>
				<p>Page Content</p>
			</PageContent>
		</Page>
	))
	.add('With Back Link & Primary Action', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				primaryAction: {
					text: boolean('text', 'Do something'),
					kind: select('kind', buttonKinds, 'primary'),
					icon: text('icon', ''),
					isSmall: boolean('isSmall', true)
				},
				hasBottomBorder: boolean('hasBottomBorder', false),
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<PageContent>
				<p>Page Content</p>
			</PageContent>
		</Page>
	))
	.add('With many tabs', () => (
		<Page
			header={{
				title: text('title', 'Page Title'),
				backLinkHref: '#',
				backLinkText: text('backLinkText', 'Back'),
				tabs: manyTabs,
				collapsed: boolean('isCollapsed', false)
			}}
		>
			<PageContent>
				<p>Hello I ama PageContent</p>
			</PageContent>
		</Page>
	))
