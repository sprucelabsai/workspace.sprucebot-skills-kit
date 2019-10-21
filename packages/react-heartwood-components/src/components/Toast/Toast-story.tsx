import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Toast from './Toast'
import ToastWrapper from './components/ToastWrapper/ToastWrapper'
import { ButtonKinds } from '../Button/Button'

const stories = storiesOf('Toast', module)

interface IToasterProps {
	showFollowup: boolean
	headline: string
	text: string
}

interface IToasterState {
	toasts: any[]
}

class Toaster extends Component<IToasterProps, IToasterState> {
	public state = {
		toasts: []
	}

	public addToast = (
		kind: 'neutral' | 'positive' | 'negative' | 'warn' | 'info'
	) => {
		const { showFollowup } = this.props
		const ids = {
			neutral: '1',
			positive: '2',
			negative: '3',
			warn: '4',
			info: '5'
		}
		const headlines = {
			neutral: 'Neat',
			positive: 'Great!',
			negative: 'Oh No!',
			warn: 'Uh-oh',
			info: 'Did you know?'
		}
		const texts = {
			neutral: 'Something just happened and it was fine.',
			positive: 'You did something amazing. Congrats!',
			negative: 'Run away! This is awful.',
			warn: 'Something is not quite right',
			info: 'Penguins cannot fly'
		}
		const timeouts = {
			neutral: 'never',
			positive: 10000,
			negative: 3000,
			warn: 'never',
			info: 2000
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
							text: 'Add Toast',
							onClick: () => this.addToast('neutral')
						},
						{
							text: 'Add Happy Toast',
							onClick: () => this.addToast('positive')
						},
						{
							text: 'Add Sad Toast',
							onClick: () => this.addToast('negative')
						},
						{
							kind: ButtonKinds.Secondary,
							text: 'Add Warning Toast',
							onClick: () => this.addToast('warn')
						},
						{
							kind: ButtonKinds.Secondary,
							text: 'Add Info Toast',
							onClick: () => this.addToast('info')
						}
					]}
				/>
				<ToastWrapper toasts={toasts} handleRemove={this.removeToast} />
			</div>
		)
	}
}

const toastKinds = ['neutral', 'positive', 'negative', 'warn', 'info']

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
			onAction={() => null}
			followupText={boolean('followupAction', false) ? 'Undo' : undefined}
		/>
	))
	.add('All Kinds', () => (
		<div style={{ padding: '1rem' }}>
			{toastKinds.map(kind => (
				<div key={kind} style={{ padding: '1rem' }}>
					<Toast
						id="toast"
						kind={kind.toString()}
						headline={text('headline', 'Neat') + ' ' + kind + ' toast'}
						text={text('text', 'Something just happened and it was fine.')}
						onRemove={() => null}
						onAction={() => null}
						followupText={boolean('followupAction', false) ? 'Undo' : undefined}
					/>
				</div>
			))}
		</div>
	))
	.add('Toaster', () => (
		<Toaster
			headline={text('headline', 'Neat')}
			text={text('text', 'Something just happened and it was fine.')}
			showFollowup={boolean('showFollowup', false)}
		/>
	))
