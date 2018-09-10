import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Pager from './Pager'
import readme from './Pager.md'

const stories = storiesOf('Pager', module)
stories.addDecorator(withKnobs)

stories.add('Interactive', withReadme(readme, () => <Pager totalPages={1} />))
