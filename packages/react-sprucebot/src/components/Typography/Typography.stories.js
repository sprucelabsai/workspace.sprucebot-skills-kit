import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withReadme } from 'storybook-readme'
import {
	Paragraph,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	A,
	SectionHeading
} from './Typography'
import readme from './Typography.md'

const stories = storiesOf('Typography', module)
stories.addDecorator(withKnobs)

stories.add(
	'Interactive',
	withReadme(readme, () => (
		<div>
			<H1>Heading One</H1>
			<H2>Heading Two</H2>
			<H3>Heading Three</H3>
			<H4>Heading Four</H4>
			<H5>Heading Five</H5>
			<H6>Heading Six</H6>
			<SectionHeading>Section Heading</SectionHeading>
			<Paragraph>This is body Copy</Paragraph>
			<A>Link</A>
		</div>
	))
)
