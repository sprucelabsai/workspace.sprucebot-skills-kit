import React, { Component } from 'react'
import ReactCrop, { getPixelCrop } from 'react-image-crop'

import BotText from '../BotText/BotText'
import Button from '../Button/Button'
import ExecutionEnvironment from 'exenv'
import Loader from '../Loader/Loader'
import PropTypes from 'prop-types'
import SubmitWrapper from '../SubmitWrapper/SubmitWrapper'
import getOrientedImage from 'exif-orientation-image'
import classNames from 'classnames'

if (ExecutionEnvironment.canUseDOM) {
	require('blueimp-canvas-to-blob')
}

export default class ImageCropper extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: '',
			base64Image: props.base64Image,
			crop: props.crop,
			pixelCrop: props.prop,
			changed: false,
			loading: !!props.src, // if there is an image src being passed, we have to actually fetch it
			tapToCrop: props.tapToCrop,
			uploading: false,
			newFile: false,
			type: props.src ? `image/${props.src.split('.').pop()}` : false,
			aspect: props.crop.aspect
		}
	}

	initiateFileUpload() {
		if (this.state.uploading) {
			return
		}
		this.input.click()
	}

	componentDidMount() {
		// is browser out-to-date, Mayura???
		if (typeof FileReader === 'undefined') {
			this.setState({
				errorMessage: this.props.outOfDateBrowserMessage
			})
		} else {
			// setup file reader
			this.reader = new FileReader()
			this.reader.onload = this.onFileReaderLoadImage.bind(this)
			this.reader.onerror = this.onFileReaderLoadImageFail.bind(this)
		}
	}

	onChange(e) {
		const file = e.target.files[0]
		if (!file.type.match('image.*')) {
			alert(this.props.badImageMessage)
			return
		}

		getOrientedImage(file, (err, canvas) => {
			if (!err) {
				this.setState({ changed: true, newFile: true })
				canvas.toBlob(blob => this.reader.readAsDataURL(blob))
			}
		})
	}

	onFileReaderLoadImage(e) {
		const base64 = e.target.result
		const type = base64.substr(5, base64.search(';') - 5)
		this.setState({
			loading: false,
			tapToCrop: false,
			errorMessage: false,
			base64Image: base64,
			type: type
		})
	}

	onFileReaderLoadImageFail(err) {
		console.error(err)
		this.setState({ errorMessage: this.props.uploadImageFailedMessage })
	}

	onCropChange(crop, pixelCrop) {
		const maxWidth = window.innerWidth - 20
		const maxHeight = window.innerHeight - 20
		const x = window.event.x
		const y = window.event.y

		if (x > maxWidth || x < 20 || y < 20 || y > maxHeight) {
			this.cropper.onDocMouseTouchEnd()
		}
		this.setState({ crop, pixelCrop, changed: true })
	}

	onImageLoadedFromCropper(image) {
		if (!this.cropper) {
			// this can happen when the cropper is hidden, then shown
			return
		} else {
			const crop = this.state.crop
			const pixelCrop = getPixelCrop(image, crop)
			const widthHeight =
				image.height < image.width ? image.height / 2 : image.width / 2
			const width = (widthHeight / image.width) * 100
			const height = (widthHeight / image.height) * 100
			crop.width = width
			crop.height = height
			crop.x = width >= height ? width / 2 : width
			crop.y = width <= height ? height / 2 : height

			if (this.state.aspect) {
				crop.aspect = this.state.aspect
			}
			this.setState({
				crop,
				pixelCrop,
				loading: false
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src !== this.props.src) {
			this.setState({
				type: `image/${nextProps.src.split('.').pop()}`,
				base64Image: false,
				newFile: true,
				src: nextProps.src
			})
		}
	}

	hideBlock() {
		this.setState({ tapToCrop: false, crop: this.state.crop, changed: true })
	}

	async onSave() {
		const { pixelCrop, type } = this.state

		if (this.state.uploading) {
			return
		}

		if (!type) {
			this.setState({
				errorMessage: this.props.badImageMessage
			})
			return
		}

		try {
			this.setState({ uploading: true })

			const image = await new Promise((resolve, reject) => {
				const image = new Image()
				image.onload = () => {
					resolve(image)
				}
				image.onerror = function(err) {
					reject(err)
				}
				image.src = this.cropper.imageRef.src
			})

			const canvas = document.createElement('canvas')
			canvas.width = pixelCrop.width
			canvas.height = pixelCrop.height
			const ctx = canvas.getContext('2d')

			ctx.drawImage(
				image,
				pixelCrop.x,
				pixelCrop.y,
				pixelCrop.width,
				pixelCrop.height,
				0,
				0,
				pixelCrop.width,
				pixelCrop.height
			)
			const cropped = canvas.toDataURL(type)

			await this.props.onSave(cropped, type)

			// reset things how they were
			this.setState({
				tapToCrop: this.props.tapToCrop,
				changed: false,
				newFile: false,
				base64Image: cropped
			})
		} catch (err) {
			console.error(err)
			this.setState({ errorMessage: this.props.uploadImageFailedMessage })
		}

		this.setState({ uploading: false })
	}

	cancel() {
		this.setState({
			tapToCrop: this.props.tapToCrop,
			crop: this.props.crop,
			changed: false
		})
	}

	render() {
		const {
			accept,
			uploadButtonText,
			uploadNewButtonText,
			saveButtonText,
			tapToCropButtonText,
			cancelButtonText,
			src,
			className,
			...props
		} = this.props

		const {
			uploading,
			base64Image,
			crop,
			loading,
			changed,
			tapToCrop,
			errorMessage,
			newFile
		} = this.state

		const cropSrc = base64Image || src
		const wrapperClassNames = classNames('react_crop_wrapper', {
			loading: loading,
			tap_to_crop: tapToCrop
		})

		return (
			<div className="image_cropper">
				{errorMessage && <BotText>{errorMessage}</BotText>}
				{loading && <Loader />}
				{!errorMessage && cropSrc && (
					<div className={wrapperClassNames}>
						<ReactCrop
							ref={cropper => (this.cropper = cropper)}
							keepSelection={true}
							onImageLoaded={this.onImageLoadedFromCropper.bind(this)}
							src={cropSrc}
							crop={crop}
							onChange={this.onCropChange.bind(this)}
						/>
						{tapToCrop && (
							<div className="block">
								{!loading && (
									<Button onClick={this.hideBlock.bind(this)}>
										{tapToCropButtonText}
									</Button>
								)}
							</div>
						)}
					</div>
				)}
				<input
					style={{ display: 'none' }}
					type="file"
					ref={input => {
						this.input = input
					}}
					accept={accept}
					onChange={this.onChange.bind(this)}
				/>
				{!loading && (
					<SubmitWrapper>
						{changed && !errorMessage && (
							<Button busy={uploading} onClick={this.onSave.bind(this)} primary>
								{saveButtonText}
							</Button>
						)}

						{changed && !newFile && !errorMessage && (
							<Button
								busy={uploading}
								onClick={this.cancel.bind(this)}
								secondary
							>
								{cancelButtonText}
							</Button>
						)}

						<Button
							busy={uploading}
							alt
							onClick={this.initiateFileUpload.bind(this)}
						>
							{src ? uploadNewButtonText : uploadButtonText}
						</Button>
					</SubmitWrapper>
				)}
			</div>
		)
	}
}

ImageCropper.propTypes = {
	base64Image: PropTypes.string,
	imageUrl: PropTypes.string,
	onSave: PropTypes.func.isRequired,
	badImageMessage: PropTypes.any.isRequired,
	outOfDateBrowserMessage: PropTypes.any.isRequired,
	uploadImageFailedMessage: PropTypes.any.isRequired,
	loadingImageFailedMessage: PropTypes.any.isRequired,
	uploadButtonText: PropTypes.any.isRequired,
	uploadNewButtonText: PropTypes.any.isRequired,
	tapToCropButtonText: PropTypes.any.isRequired,
	saveButtonText: PropTypes.any.isRequired,
	cancelButtonText: PropTypes.any.isRequired,
	accept: PropTypes.string.isRequired,
	crop: PropTypes.object.isRequired,
	tapToCrop: PropTypes.bool
}

ImageCropper.defaultProps = {
	accept: 'image/*',
	loadingImageFailedMessage: "Uh man, I couldn't load your image.",
	badImageMessage: 'Bad upload! You gotta select an image.',
	outOfDateBrowserMessage:
		'You gotta update your browser to upload and crop images. ☹️',
	uploadImageFailedMessage:
		"So, this is embarrassing, but I could not upload that file and couldn't tell you why. 😞",
	uploadButtonText: 'Upload Image',
	uploadNewButtonText: 'Upload Different Image',
	saveButtonText: 'Save Changes',
	tapToCropButtonText: 'Tap to Re-Crop',
	cancelButtonText: 'Cancel Crop',
	tapToCrop: false,
	crop: {}
}
