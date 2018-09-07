import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import StatsSlider from './StatsSlider'
import readme from './StatsSlider.md'

const stories = storiesOf('StatsSlider', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<StatsSlider
			stats={[
				{
					dir: 1,
					value: 12,
					title: 'Things'
				},
				{
					dir: 0,
					value: 3,
					title: 'Stuff'
				},
				{
					dir: 0,
					value: 5,
					title: 'Other Stuff'
				},
				{
					dir: 1,
					value: 12,
					title: 'Things'
				},
				{
					dir: 0,
					value: 3,
					title: 'Stuff'
				},
				{
					dir: 0,
					value: 5,
					title: 'Other Stuff'
				}
			]}
		/>
	))
)
