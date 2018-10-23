// @flow
import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Button from '../Button/Button'
import Dropzone, { Props as DropzoneProps } from '../Dropzone/Dropzone'
import { Slider } from '../Forms'
import RotateLeftIcon from '../../../static/assets/icons/Design/Rotate/rotate-back.svg'
import RotateRightIcon from '../../../static/assets/icons/Design/Rotate/rotate-forward.svg'

type Props = {
	image?: string,
	width: number,
	height: number,
	dropzoneProps: DropzoneProps,
	isCircular?: boolean
}
type State = {
	scale: number,
	rotate: number
}

export default class ImageCropper extends Component<Props, State> {
	state = {
		scale: 1,
		rotate: 0
	}

	handleScale = (e: any) => {
		const newVal = e.currentTarget.value

		this.setState({
			scale: newVal / 100
		})
	}

	handleRotate = (dir: 'left' | 'right') => {
		this.setState(prevState => {
			const newRotate =
				dir === 'left' ? prevState.rotate - 90 : prevState.rotate + 90
			return {
				rotate: newRotate
			}
		})
	}

	render() {
		const {
			image,
			width,
			height,
			isCircular,
			dropzoneProps,
			...rest
		} = this.props
		const { scale, rotate } = this.state
		return (
			<div className="image-cropper">
				<div className="image-cropper__dropzone-wrapper">
					{image ? (
						<AvatarEditor
							image={image}
							width={width}
							height={height}
							scale={scale}
							rotate={rotate}
							border={0}
							borderRadius={isCircular ? 100 : 0}
							color={[255, 255, 255, 1]}
							{...rest}
						/>
					) : (
						<Dropzone {...dropzoneProps} />
					)}
				</div>
				<div className="image-cropper__controls-row">
					<Button
						kind="secondary"
						className="image-cropper__rotate-btn"
						text="Rotate Left"
						icon={<RotateLeftIcon className="btn__line-icon" />}
						disabled={!image}
						onClick={() => this.handleRotate('left')}
					/>
					<Button
						kind="secondary"
						className="image-cropper__rotate-btn"
						text="Rotate Right"
						icon={<RotateRightIcon className="btn__line-icon" />}
						disabled={!image}
						onClick={() => this.handleRotate('right')}
					/>
				</div>
				<div className="image-cropper__controls-row">
					<Slider
						label="Scale"
						id="scale"
						min="100"
						max="200"
						value={100}
						postLabel={`${Math.round(scale * 100)}%`}
						disabled={!image}
						onChange={this.handleScale}
					/>
				</div>
				<div className="image-cropper__controls-row">
					<Button
						kind="primary"
						isFullWidth
						text="Save Image"
						disabled={!image}
					/>
				</div>
			</div>
		)
	}
}
