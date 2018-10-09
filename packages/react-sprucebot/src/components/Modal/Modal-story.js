// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Modal from './Modal'
import Button from '../Button/Button'
import { Checkbox, TextInput, TextArea } from '../Forms'

type Props = {}
type State = {
	isOpen: boolean
}

class ModalExample extends Component<Props, State> {
	state = {
		isOpen: true
	}

	toggleVisibility = () => {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}))
	}

	onAfterOpen = () => {}

	onRequestClose = () => {
		this.setState({
			isOpen: false
		})
	}
	render() {
		const { isOpen } = this.state
		return (
			<Container>
				<Button
					kind="secondary"
					text="Give me modal"
					onClick={this.toggleVisibility}
				/>
				<Modal
					isOpen={isOpen}
					onAfterOpen={this.onAfterOpen}
					onRequestClose={this.onRequestClose}
					isSmall
				>
					<Modal.Header
						title="New Service Category"
						onRequestClose={this.onRequestClose}
					/>
					<form>
						<Modal.Body>
							<div className="form-row">
								<TextInput label="Category Name" placeholder="i.e. Barber" />
							</div>
							<div className="form-row">
								<TextInput
									label="Teaser"
									postLabel="0/64"
									placeholder="Haircuts, shaves, and touch-ups."
									helper="Add a short teaser for your guests to see when they browse your services. Please limit to 64 characters."
								/>
							</div>
							<div className="form-row">
								<TextArea
									label="Description"
									placeholder="Optional category description…"
									helper="Add a short teaser for your guests to see when they browse your services."
									rows={3}
								/>
							</div>
							<div className="form-row">
								<Checkbox
									label="Hide this category"
									postText="It will still be visible to your teammates, but will be hidden from guests."
								/>
							</div>
						</Modal.Body>
						<Modal.Footer
							primaryAction={{
								text: 'Create Category',
								onClick: () => console.log('Next'),
								type: 'submit'
							}}
							secondaryAction={{
								text: 'Cancel',
								onClick: () => console.log('Cancel')
							}}
						/>
					</form>
				</Modal>
			</Container>
		)
	}
}

const stories = storiesOf('Modal', module)

stories.addDecorator(withKnobs)

stories.add('Modal', () => <ModalExample />)
