// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Dropzone from './Dropzone'

type Props = {}
type State = {
	uploadProgress: number,
	fileWasUploaded: boolean
}

class DropzoneExample extends Component<Props, State> {
	interval: any
	state = {
		uploadProgress: 0,
		fileWasUploaded: false
	}

	fakeUpload = () => {
		const { uploadProgress } = this.state
		if (uploadProgress >= 100) {
			clearInterval(this.interval)
			this.setState({
				uploadProgress: 0,
				fileWasUploaded: true
			})
		} else {
			this.setState(prevState => ({
				uploadProgress: prevState.uploadProgress + 1
			}))
		}
	}

	onDropAccepted = () => {
		this.interval = setInterval(this.fakeUpload, 10)
	}

	render() {
		const { uploadProgress, fileWasUploaded } = this.state
		return (
			<Dropzone
				id={text('id', 'photos')}
				label={text('label', 'Profile Photo')}
				postLabel={text('postLabel', '')}
				accept={text('accpet', 'image/*')}
				onDropAccepted={this.onDropAccepted}
				buttonText={text('buttonText', 'Upload an Image')}
				fileWasUploaded={fileWasUploaded}
				uploadProgress={uploadProgress}
				error={text('error', 'Please upload an image file.')}
				isSmall={boolean('isSmall', false)}
				isCircular={boolean('isCircular', false)}
			/>
		)
	}
}

const stories = storiesOf('Dropzone', module)

stories.addDecorator(withKnobs)

stories

	.add('Static', () => (
		<Container size="small" center>
			<Dropzone
				id={text('id', 'photos')}
				label={text('label', 'Profile Photo')}
				postLabel={text('postLabel', '')}
				accept={text('accpet', 'image/*')}
				onDropAccepted={() => console.log('onDropAccepted')}
				buttonText={text('buttonText', 'Upload an Image')}
				fileWasUploaded={boolean('fileWasUploaded', false)}
				uploadProgress={number('uploadProgress', 0)}
				error={text('error', 'Please upload an image file.')}
				isSmall={boolean('isSmall', false)}
				isCircular={boolean('isCircular', false)}
			/>
		</Container>
	))
	.add('Dynamic', () => (
		<Container size="small" center>
			<DropzoneExample />
		</Container>
	))
