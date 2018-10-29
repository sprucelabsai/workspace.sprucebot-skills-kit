// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean
} from '@storybook/addon-knobs/react'
import Wrapper from '../../../.storybook/Wrapper'
import Button from './Button'
import Icon from '../Icon/Icon'
import Icon11 from '../../../static/assets/icons/Phones-Mobile-Devices/Phone/phone-retro-1.svg'

type GroupProps = {
	kind: string
}

const ButtonGroup = (props: GroupProps = { kind: '' }) => {
	const btnText = text('text', 'Hello World')
	const isSmall = boolean('isSmall', false)
	const isFullWidth = boolean('isFullWidth', false)
	const icon = text('icon', 'edit')
	return (
		<Fragment>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				isFullWidth={false}
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={`Link ${btnText}`}
				kind={props.kind || ''}
				href={text('href', '#')}
				target="_blank"
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				disabled
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				disabled
				isLoading={boolean('isLoading', true)}
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				text={btnText}
				kind={props.kind || ''}
				icon={
					icon ? (
						<Icon
							icon={text('icon', 'edit')}
							className={text('iconClassName', 'btn__line-icon')}
						/>
					) : null
				}
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
			<Button
				className={text('className', 'l-mr-small l-mb-small')}
				isSmall={isSmall}
				isFullWidth={isFullWidth}
				kind={props.kind || ''}
				icon={
					icon ? (
						<Icon
							icon={text('icon', 'edit')}
							className={text('iconClassName', 'btn__line-icon')}
						/>
					) : null
				}
				onClick={text('onClick', '() => console.log("you clicked")')}
			/>
		</Fragment>
	)
}

const stories = storiesOf('Button', module)
stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)
stories.addDecorator(withKnobs)

stories
	.add('Primary', () => <ButtonGroup kind={text('kind', 'primary')} />)
	.add('Secondary', () => <ButtonGroup kind={text('kind', 'secondary')} />)
	.add('Simple', () => <ButtonGroup kind={text('kind', 'secondary')} />)
	.add('Caution', () => <ButtonGroup kind={text('kind', 'caution')} />)
