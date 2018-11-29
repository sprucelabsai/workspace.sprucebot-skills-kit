// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs/react'
import TextContainer from './TextContainer'
import Heading from '../Heading/Heading'
import Subheading from '../Subheading/Subheading'
import Text from '../Text/Text'

const stories = storiesOf('Text Container', module)

const spacingOptions = {
	Base: null,
	Tight: 'tight',
	Loose: 'loose'
}

stories.addDecorator(withKnobs)

stories.add('Text Container', () => (
	<TextContainer
		spacing={select('spacing', spacingOptions, spacingOptions.Base)}
	>
		<Heading>Do you like roller coasters?</Heading>
		<Subheading>If you could time travel, what would you do?</Subheading>
		<Text>
			Swimming hundreds of feet beneath the ocean’s surface in many parts of the
			world are prolific architects called giant larvaceans.
		</Text>
		<Text>
			These zooplankton are not particularly giant themselves (they resemble
			tadpoles and are about the size of a pinkie finger), but every day.
		</Text>
		<Subheading>How many pairs of shoes do you own?</Subheading>
		<Text>
			Swimming hundreds of feet beneath the ocean’s surface in many parts of the
			world are prolific architects called giant larvaceans.
		</Text>
		<Text>
			These zooplankton are not particularly giant themselves (they resemble
			tadpoles and are about the size of a pinkie finger), but every day.
		</Text>
	</TextContainer>
))
