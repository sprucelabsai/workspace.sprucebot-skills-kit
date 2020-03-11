import {
	IHWSprucebotAvatar,
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import cx from 'classnames'
import chillAnimation from './animations/chill.json'
import accomplishedAnimation from './animations/accomplished.json'
import contemplativeAnimation from './animations/contemplative.json'

const ANIMATION_MAP = {
	[IHWSprucebotAvatarStateOfMind.Chill]: chillAnimation,
	[IHWSprucebotAvatarStateOfMind.Accomplished]: accomplishedAnimation,
	[IHWSprucebotAvatarStateOfMind.Contemplative]: contemplativeAnimation
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
