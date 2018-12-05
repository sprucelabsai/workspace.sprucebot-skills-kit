// @flow
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	number,
	object
} from '@storybook/addon-knobs/react'
import Modal from './Modal'
import Button from '../Button/Button'
import {
	Checkbox,
	TextInput,
	TextArea,
	FormLayout,
	FormLayoutItem
} from '../Forms'

type Props = {
	title: string,
	canGoBack: boolean,
	hasSecondaryButton: boolean,
	includeFooter: boolean
}
type State = {
	isOpen: boolean
}

class ModalExample extends Component<Props, State> {
	state = {
		isOpen: false
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
		const { title, canGoBack, hasSecondaryButton, includeFooter } = this.props
		return (
			<Fragment>
				<Button
					kind="secondary"
					text="Give me modal"
					onClick={this.toggleVisibility}
				/>
				<Modal
					isOpen={isOpen}
					onAfterOpen={this.onAfterOpen}
					onRequestClose={this.onRequestClose}
					isSmall={boolean('isSmall', true)}
				>
					<Modal.Header
						title={title}
						onRequestClose={this.onRequestClose}
						handleGoBack={canGoBack ? () => console.log('take me home') : null}
					/>
					<form>
						<Modal.Body>
							<FormLayout>
								<FormLayoutItem>
									<TextInput label="Category Name" placeholder="i.e. Barber" />
								</FormLayoutItem>
								<FormLayoutItem>
									<TextInput
										label="Teaser"
										postLabel="0/64"
										placeholder="Haircuts, shaves, and touch-ups."
										helper="Add a short teaser for your guests to see when they browse your services. Please limit to 64 characters."
									/>
								</FormLayoutItem>
								<FormLayoutItem>
									<TextArea
										label="Description"
										placeholder="Optional category description…"
										helper="Add a short teaser for your guests to see when they browse your services."
										rows={3}
									/>
								</FormLayoutItem>
								<FormLayoutItem>
									<Checkbox
										id="hide-category"
										label="Hide this category"
										postText="It will still be visible to your teammates, but will be hidden from guests."
									/>
								</FormLayoutItem>
							</FormLayout>
						</Modal.Body>
						{includeFooter && (
							<Modal.Footer
								primaryAction={{
									text: 'Create Category',
									onClick: () => console.log('Next'),
									type: 'submit'
								}}
								secondaryAction={
									hasSecondaryButton && {
										text: 'Cancel',
										onClick: () => console.log('Cancel')
									}
								}
							/>
						)}
					</form>
				</Modal>
			</Fragment>
		)
	}
}

const stories = storiesOf('Modal', module)

stories.addDecorator(withKnobs)

stories
	.add('Modal', () => (
		<ModalExample
			title={text('title', 'New Service Category')}
			canGoBack={boolean('handleGoBack', false)}
			includeFooter={boolean('Modal.Footer', true)}
			hasSecondaryButton={boolean('secondaryAction', false)}
		/>
	))
	.add('static', () => (
		<Modal
			isOpen={boolean('isOpen', true)}
			onAfterOpen={() => console.log('onAfterOpen')}
			onRequestClose={() => console.log('onRequestClose')}
			isSmall={boolean('isSmall', true)}
		>
			<Modal.Header
				title={text('title', 'New Service Category')}
				onRequestClose={() => console.log('onRequestClose')}
				handleGoBack={
					boolean('canGoBack', false) ? () => console.log('take me home') : null
				}
			/>
			<form>
				<Modal.Body>
					<FormLayout>
						<FormLayoutItem>
							<TextInput label="Category Name" placeholder="i.e. Barber" />
						</FormLayoutItem>
						<FormLayoutItem>
							<TextInput
								label="Teaser"
								postLabel="0/64"
								placeholder="Haircuts, shaves, and touch-ups."
								helper="Add a short teaser for your guests to see when they browse your services. Please limit to 64 characters."
							/>
						</FormLayoutItem>
						<FormLayoutItem>
							<TextArea
								label="Description"
								placeholder="Optional category description…"
								helper="Add a short teaser for your guests to see when they browse your services."
								rows={3}
							/>
						</FormLayoutItem>
						<FormLayoutItem>
							<Checkbox
								id="hide-category"
								label="Hide this category"
								postText="It will still be visible to your teammates, but will be hidden from guests."
							/>
						</FormLayoutItem>
					</FormLayout>
				</Modal.Body>
				{boolean('includeFooter', true) && (
					<Modal.Footer
						primaryAction={object('primaryAction', {
							text: 'Create Category',
							onClick: () => console.log('Next'),
							type: 'submit'
						})}
						secondaryAction={object('secondaryAction', {
							text: 'Cancel',
							onClick: () => console.log('Cancel')
						})}
					/>
				)}
			</form>
		</Modal>
	))
