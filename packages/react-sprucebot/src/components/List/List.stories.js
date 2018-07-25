import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import List from './List'
import readme from './List.md'

const stories = storiesOf('List', module)
stories.addDecorator(withKnobs)

stories.add('Placeholder', withReadme(readme, () => <p>Placeholder</p>))
