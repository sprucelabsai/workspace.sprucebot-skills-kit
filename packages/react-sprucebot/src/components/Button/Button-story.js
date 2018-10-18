// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import Wrapper from '../../../.storybook/Wrapper'
import Button from './Button'
import Icon11 from '../../../static/assets/icons/Phones-Mobile-Devices/Phone/phone-retro-1.svg'

type GroupProps = {
	kind: string
}

const ButtonGroup = (props: GroupProps = { kind: '' }) => {
	const btnText = text('Text', 'Hello World')
	const isSmall = boolean('Small', false)
	const isFullWidth = boolean('Full Width', false)
	return (
		<Fragment>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				isFullWidth={false}
			/>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={`Link ${btnText}`}
				kind={props.kind || ''}
				href="#"
				target="_blank"
			/>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				disabled
			/>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				disabled
				isLoading
			/>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				icon={<Icon11 className="btn__line-icon" />}
			/>
			<Button
				className="l-mr-small l-mb-small"
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				kind={props.kind || ''}
				icon={<Icon11 className="btn__line-icon" />}
			/>
		</Fragment>
	)
}

const stories = storiesOf('Button', module)

stories.addDecorator(withKnobs)

stories
	.add('Primary', () => <ButtonGroup kind="primary" />)
	.add('Secondary', () => <ButtonGroup kind="secondary" />)
	.add('Simple', () => <ButtonGroup kind="simple" />)
	.add('Caution', () => <ButtonGroup kind="caution" />)
