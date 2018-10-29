// @flow
import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import ImageCropper from './ImageCropper'
import AvatarIcon from '../../../static/assets/icons/Users/Geometric-Close-Up-Single-User-Actions-Neutral/single-neutral-actions-image--56w.svg'
import ShopIcon from '../../../static/assets/icons/Shopping-E-Commerce/Shops/shop-1--56w.svg'

const stories = storiesOf('ImageCropper', module)

type Props = {
	isCircular: boolean,
	width: number,
	height: number
}
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
		const { isCircular, width, height } = this.props

		return (
			<Container size="small">
				<ImageCropper
					image={text(
						'image',
						'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=320&h=320&q=80'
					)}
					width={width}
					height={height}
					isCircular={isCircular}
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
						isCircular: isCircular,
						error: 'Upload an image',
						defaultIcon: isCircular ? (
							<AvatarIcon className="dropzone__icon" />
						) : (
							<ShopIcon className="dropzone__icon" />
						)
					}}
					color={[249, 250, 252, 1]}
				/>
			</Container>
		)
	}
}

stories.addDecorator(withKnobs)

stories.add('Avatar', () => (
	<ImageCropperExample
		width={number('width', 160)}
		height={number('height', 160)}
		isCircular={boolean('isCircular', true)}
	/>
))
