// @flow
import React, { Component, Fragment } from 'react'
import type { Node } from 'react'
import ReactDropzone from 'react-dropzone'
import cx from 'classnames'
import { InputPre } from '../Forms/FormPartials'
import Button from '../Button/Button'
import DefaultIcon from '../../../static/assets/icons/Interface-Essential/Time-Files/time-clock-file-upload.svg'
import UploadedIcon from '../../../static/assets/icons/Interface-Essential/Time-Files/time-clock-file-check.svg'
import DropIcon from '../../../static/assets/icons/Interface-Essential/Select/cursor-select-4.svg'
import WarnIcon from '../../../static/assets/icons/Interface-Essential/Alerts/alert-triangle--56w.svg'

export type Props = {
	/** Unique identifier for the dropzone */
	id: string,

	/** Callback when file(s) are dropped */
	onDrop: Function,

	/** Text for the button */
	buttonText: string,

	/** Text shown when file(s) are dropped that aren't accepted */
	error: string,

	/** Displays progress while uploading */
	uploadProgress: number,

	/** onDragEnter callback */
	onDragEnter?: Function,

	/** onDragLeave callback */
	onDragLeave?: Function,

	/** onDragOver callback */
	onDragOver?: Function,

	/** onDrop callback */
	onDrop?: Function,

	/** onDropAccepted callback */
	onDropAccepted: Function,

	/** onDropRejected callback */
	onDropRejected?: Function,

	/** onFileDialogCancel callback */
	onFileDialogCancel?: Function,

	/** onDragStart callback */
	onDragStart?: Function,

	/** Optional label for the Dropzone */
	label: ?string,

	/** Optional text to show after the label */
	postLabel?: string,

	/** Set true to use a smaller Dropzone */
	isSmall?: boolean,

	/** Set true to make the Dropzone circular. Should only be used when isSmall is set to true */
	isCircular?: boolean,

	/** Set true when a file has been successfully uploaded */
	fileWasUploaded?: boolean,

	/** The icon to display before an upload has happened */
	defaultIcon?: Node
}

type State = {
	userCanDrop: boolean
}

export default class Dropzone extends Component<Props, State> {
	dropzone: any

	static defaultProps = {
		fileWasUploaded: false,
		isSmall: false,
		isCircular: false
	}

	onDragEnter = (e: any) => {
		const { onDragEnter } = this.props
		if (onDragEnter) {
			onDragEnter()
		}
		this.setState({
			userCanDrop: true
		})
	}
	onDragLeave = () => {
		const { onDragLeave } = this.props
		if (onDragLeave) {
			onDragLeave()
		}
		this.setState({
			userCanDrop: false
		})
	}
	onDragOver = () => {
		const { onDragOver } = this.props
		if (onDragOver) {
			onDragOver()
		}
	}
	onDragStart = () => {
		const { onDragStart } = this.props
		if (onDragStart) {
			onDragStart()
		}
	}
	onDrop = () => {
		const { onDrop } = this.props
		if (onDrop) {
			onDrop()
		}
	}
	onDropAccepted = () => {
		const { onDropAccepted } = this.props
		onDropAccepted()
		this.setState({
			userCanDrop: false
		})
	}
	onDropRejected = () => {
		const { onDropRejected } = this.props
		if (onDropRejected) {
			onDropRejected()
		}
		this.setState({
			userCanDrop: false
		})
	}
	onFileDialogCancel = () => {
		const { onFileDialogCancel } = this.props
		if (onFileDialogCancel) {
			onFileDialogCancel()
		}
	}
	render() {
		const {
			id,
			label,
			postLabel,
			onDrop,
			buttonText,
			error,
			isSmall,
			isCircular,
			fileWasUploaded,
			uploadProgress,
			defaultIcon,
			...rest
		} = this.props
		const defaultClass = cx('dropzone', {
			'dropzone-small': isSmall,
			'dropzone-circular': isCircular
		})
		return (
			<Fragment>
				{label && <InputPre id={id} label={label} postLabel={postLabel} />}
				<ReactDropzone
					ref={ref => (this.dropzone = ref)}
					className={defaultClass}
					activeClassName="dropzone--is-hovered"
					rejectClassName="dropzone--has-error"
					disabledClassName="dropzone--is-disabled"
					onDragEnter={this.onDragEnter}
					onDragLeave={this.onDragLeave}
					onDragOver={this.onDragOver}
					onDragStart={this.onDragStart}
					onDrop={this.onDrop}
					onDropAccepted={this.onDropAccepted}
					onDropRejected={this.onDropRejected}
					onFileDialogCancel={this.onFileDialogCancel}
					disabled={!!uploadProgress}
					{...rest}
				>
					{({ isDragAccept, isDragReject }) => (
						<Fragment>
							{!!uploadProgress && (
								<Fragment>
									<p className="dropzone__helper-text">Uploading…</p>
									<div className="dropzone__uploading-progress-wrapper">
										<div
											className="dropzone__uploading-progress"
											style={{ width: `${uploadProgress}%` }}
										/>
									</div>
								</Fragment>
							)}
							<div className="dropzone__icons">
								{!uploadProgress && !isDragAccept && !isDragReject && (
									<Fragment>
										{fileWasUploaded ? (
											<UploadedIcon className="dropzone__icon dropzone__did-upload-icon" />
										) : (
											defaultIcon || <DefaultIcon className="dropzone__icon" />
										)}
									</Fragment>
								)}
								{isDragAccept && (
									<DropIcon className="dropzone__icon dropzone__allow-drop-icon" />
								)}
								{isDragReject && (
									<WarnIcon className="dropzone__icon dropzone__warn-drop-icon" />
								)}
							</div>
							<Button
								kind={isSmall ? 'simple' : 'secondary'}
								isSmall={isSmall}
								text={buttonText}
								className="dropzone__btn"
								disabled={!!uploadProgress}
							/>
							{!isCircular && (
								<Fragment>
									<p className="dropzone__text">or drop files to upload</p>
									{isDragAccept && (
										<p className="dropzone__helper-text-bottom dropzone__helper-text-accepted">
											Drop files to upload them
										</p>
									)}
									{isDragReject && (
										<p className="dropzone__helper-text-bottom dropzone__helper-text-rejected">
											{error}
										</p>
									)}
								</Fragment>
							)}
						</Fragment>
					)}
				</ReactDropzone>
			</Fragment>
		)
	}
}
