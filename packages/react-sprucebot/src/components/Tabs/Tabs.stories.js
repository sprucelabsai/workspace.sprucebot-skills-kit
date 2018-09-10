import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import { Tabs, TabPane } from './Tabs'
import readme from './Tabs.md'

const stories = storiesOf('Tabs', module)
stories.addDecorator(withKnobs)

stories
	.add(
		'Two Tabs',
		withReadme(readme, () => (
			<Tabs onChange={() => null}>
				<TabPane title="day">
					<div>
						<p>I am the tab pane</p>
					</div>
				</TabPane>
				<TabPane title="week">
					<div>
						<p>I TOO am the tab pane</p>
					</div>
				</TabPane>
			</Tabs>
		))
	)
	.add(
		'Three Tabs',
		withReadme(readme, () => (
			<Tabs onChange={() => null}>
				<TabPane title="day">
					<div>
						<p>I am the tab pane</p>
					</div>
				</TabPane>
				<TabPane title="week">
					<div>
						<p>I TOO am the tab pane</p>
					</div>
				</TabPane>
				<TabPane title="month">
					<div>
						<p>I TOO am the tab pane</p>
					</div>
				</TabPane>
			</Tabs>
		))
	)
