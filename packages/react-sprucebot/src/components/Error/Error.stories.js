import React from 'react'
import moment from 'moment'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import Error from './Error'
import readme from './Error.md'

const stories = storiesOf('Error', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, withInfo()(() => <Error errorMessage="YaBlewIt" />))
)
