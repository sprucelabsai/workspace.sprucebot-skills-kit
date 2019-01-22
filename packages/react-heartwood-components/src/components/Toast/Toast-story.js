// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Toast from './Toast'
import ToastWrapper from './components/ToastWrapper/ToastWrapper'
const stories = storiesOf('Toast', module)

type Props = {
	children: Node,
	showUndo: boolean,
	headline: string,
	text: string
}

type State = {
	toasts: Array<Object>
}

class ToastExample extends Component<Props, State> {
	state = {
		toasts: []
	}

	addToast = (kind: 'neutral' | 'positive' | 'negative') => {
		const { showUndo, text, headline } = this.props
		this.setState(prevState => {
			const newToasts = [...prevState.toasts]
			newToasts.push({
				headline,
				text,
				kind,
				onUndo: showUndo ? () => console.log('Undo') : null
			})
			return {
				toasts: newToasts
			}
		})
	}

	removeToast = (idx: number) => {
		this.setState(prevState => {
			const toasts = [...prevState.toasts]
			const removedToast = toasts.splice(idx, 1)
			return {
				toasts
			}
		})
	}

	render() {
		const { children } = this.props
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

stories.add('Toast', () => (
	<ToastExample
		headline={text('headline', 'Neat')}
		text={text('text', 'Something just happened and it was fine')}
		showUndo={boolean('showUndo', false)}
	/>
))