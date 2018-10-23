// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import ImageCropper from './ImageCropper'

const stories = storiesOf('ImageCropper', module)

type Props = {}
type State = {
	image: string
}

class ImageCropperExample extends Component<Props, State> {
	state = {
		image: ''
	}

	handleDrop = (files: any) => {
		files.forEach(file => {
			const reader = new FileReader()
			reader.onload = () => {
				const fileAsDataURL = reader.result
				this.setState({
					image: fileAsDataURL
				})
			}
			reader.readAsDataURL(file)
		})
	}

	render() {
		const { image } = this.state

		return (
			<Container size="small">
				<ImageCropper
					image={
						boolean('With Image', true)
							? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=320&h=320&q=80'
							: image
					}
					width={160}
					height={160}
					isCircular
					dropzoneProps={{
						id: 'dropzone',
						onDrop: () => console.log('onDrop'),
						onDragEnter: () => console.log('onDragEnter'),
						onDragStart: () => console.log('onDragStart'),
						onDragOver: () => console.log('onDragOver'),
						onDragLeave: () => console.log('onDragLeave'),
						onDropAccepted: this.handleDrop,
						buttonText: 'Add Image',
						isSmall: true,
						isCircular: true,
						error: 'Upload an image'
					}}
					color={[249, 250, 252, 1]}
				/>
			</Container>
		)
	}
}

stories.addDecorator(withKnobs)

stories.add('Avatar', () => <ImageCropperExample />)
