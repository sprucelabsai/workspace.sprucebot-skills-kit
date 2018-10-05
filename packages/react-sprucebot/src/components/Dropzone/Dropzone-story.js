// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
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
				id="photos"
				label={text('Label', 'Profile Photo')}
				accept="image/*"
				onDropAccepted={this.onDropAccepted}
				buttonText={text('Button Text', 'Upload an Image')}
				fileWasUploaded={fileWasUploaded}
				uploadProgress={uploadProgress}
				error="Please upload an image file."
				isSmall={boolean('Small', false)}
				isCircular={boolean('Circular', false)}
			/>
		)
	}
}

const stories = storiesOf('Dropzone', module)

stories.addDecorator(withKnobs)

stories.add('Dropzone', () => (
	<Container size="small" center>
		<DropzoneExample />
	</Container>
))
