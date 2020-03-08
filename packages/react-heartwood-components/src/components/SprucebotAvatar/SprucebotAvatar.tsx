import {
	IHWSprucebotAvatar,
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import cx from 'classnames'
import chillingAnimation from './animations/chilling.json'

const ANIMATION_MAP = {
	[IHWSprucebotAvatarStateOfMind.Chill]: chillingAnimation
}

export default class SprucebotAvatar extends Component<IHWSprucebotAvatar> {
	public static defaultProps = {
		stateOfMind: IHWSprucebotAvatarStateOfMind.Chill,
		size: IHWSprucebotAvatarSize.Medium
	}

	public render() {
		const { stateOfMind, size } = this.props

		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData:
				ANIMATION_MAP[stateOfMind || IHWSprucebotAvatarStateOfMind.Chill],
			rendererSettings: {}
		}

		return (
			<div
				className={cx('sprucebot-avatar', {
					'sprucebot-avatar-small': size === IHWSprucebotAvatarSize.Small,
					'sprucebot-avatar-medium': size === IHWSprucebotAvatarSize.Medium,
					'sprucebot-avatar-large': size === IHWSprucebotAvatarSize.Large
				})}
			>
				<Lottie options={defaultOptions} />
			</div>
		)
	}
}
