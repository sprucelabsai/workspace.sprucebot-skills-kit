import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Toast from './Toast'
import ToastWrapper from './components/ToastWrapper/ToastWrapper'
const stories = storiesOf('Toast', module)

interface IToastExampleProps {
	showFollowup: boolean
	headline: string
	text: string
}

interface IToastExampleState {
	toasts: any[]
}

class ToastExample extends Component<IToastExampleProps, IToastExampleState> {
	public state = {
		toasts: []
	}

	public addToast = (kind: 'neutral' | 'positive' | 'negative') => {
		const { showFollowup } = this.props
		const ids = {
			neutral: '1',
			positive: '2',
			negative: '3'
		}
		const headlines = {
			neutral: 'Neat',
			positive: 'Great!',
			negative: 'Oh No!'
		}
		const texts = {
			neutral: 'Something just happened and it was fine.',
			positive: 'You did something amazing. Congrats!',
			negative: 'Run away! This is awful.'
		}
		const timeouts = {
			neutral: 'never',
			positive: 10000,
			negative: 3000
		}
		this.setState(prevState => {
			const newToasts = [...prevState.toasts]
			newToasts.push({
				headline: headlines[kind],
				text: texts[kind],
				kind,
				id: ids[kind],
				followupAction: showFollowup ? () => console.log('Undo') : null,
				timeout: timeouts[kind]
			})
			return {
				toasts: newToasts
			}
		})
	}

	// TODO: Hook up this functionality
	public removeToast = () => {
		this.setState(prevState => {
			const toasts = [...prevState.toasts]
			return {
				toasts
			}
		})
	}

	public render(): React.ReactElement {
		const { toasts } = this.state
		return (
			<div>
				<ButtonGroup
					actions={[
						{
							kind: 'secondary',
							text: 'Add Toast',
							onClick: () => this.addToast('neutral')
						},
						{
							kind: 'secondary',
							text: 'Add Happy Toast',
							onClick: () => this.addToast('positive')
						},
						{
							kind: 'secondary',
							text: 'Add Sad Toast',
							onClick: () => this.addToast('negative')
						}
					]}
				/>
				<ToastWrapper toasts={toasts} handleRemove={this.removeToast} />
			</div>
		)
	}
}

stories.addDecorator(withKnobs)

stories
	.add('Toast', () => (
		<Toast
			id="toast"
			kind={select(
				'kind',
				['neutral', 'positive', 'negative', 'warn', 'info'],
				'neutral'
			)}
			headline={text('headline', 'Neat')}
			text={text('text', 'Something just happened and it was fine.')}
			onRemove={() => null}
			followupAction={() => null}
			followupText={boolean('followupAction', false) && 'Undo'}
		/>
	))
	.add('Toaster', () => (
		<ToastExample
			headline={text('headline', 'Neat')}
			text={text('text', 'Something just happened and it was fine.')}
			showFollowup={boolean('showFollowup', false)}
		/>
	))
