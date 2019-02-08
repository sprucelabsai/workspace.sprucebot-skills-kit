// @flow
import React, { Fragment, Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react'
import PagedModal from './PagedModal'
import Button from '../Button/Button'
import {
	Checkbox,
	TextInput,
	TextArea,
	FormLayout,
	FormLayoutItem
} from '../Forms'

type Props = {}

type State = {
	currentPageIndex: number
}

class PageModalExample extends Component<Props, State> {
	state = {
		currentPageIndex: 0
	}

	handleBack = () => {
		console.log('here')
		this.setState(prevState => ({
			currentPageIndex:
				prevState.currentPageIndex > 0 ? prevState.currentPageIndex - 1 : 0
		}))
	}

	render() {
		const { currentPageIndex } = this.state

		return (
			<PagedModal
				isOpen={boolean('isOpen', true)}
				onAfterOpen={() => console.log('onAfterOpen')}
				onRequestClose={() => console.log('onRequestClose')}
				onClickBack={this.handleBack}
				canGoBack={currentPageIndex > 0}
				isSmall={boolean('isSmall', true)}
				pages={[
					{
						title: 'Page 1',
						isCurrent: currentPageIndex === 0,
						body: (
							<FormLayout>
								<FormLayoutItem>
									<TextInput
										label="Phone Number"
										placeholder="(555)-555-5555"
									/>
								</FormLayoutItem>
							</FormLayout>
						),
						footerPrimaryAction: {
							text: 'Next',
							onClick: () => this.setState({ currentPageIndex: 1 })
						}
					},
					{
						title: 'Page 2',
						isCurrent: currentPageIndex === 1,
						body: (
							<FormLayout>
								<FormLayoutItem>
									<TextInput label="First Name" />
								</FormLayoutItem>
							</FormLayout>
						),
						footerPrimaryAction: {
							text: 'Submit',
							onClick: () => console.log('Submit!')
						}
					}
				]}
			/>
		)
	}
}

const stories = storiesOf('Paged Modal', module)

stories.addDecorator(withKnobs)

stories.add('Page Modal', () => <PageModalExample />)
