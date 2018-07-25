import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Search from './Search'
import readme from './Search.md'

const stories = storiesOf('Search', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => <Search onSelectUser={() => null} locationId={1} />)
)
