import {
	IHWSprucebotAvatar,
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotAvatarSize
} from '@sprucelabs/spruce-types'
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import cx from 'classnames'
import * as chillingAnimation from './animations/chilling.json'

export interface ISprucebotAvatarProps extends Omit<IHWSprucebotAvatar, 'id'> {
	/** optional id for view caching */
	id?: string
}

const ANIMATION_MAP = {
	[IHWSprucebotAvatarStateOfMind.Chilling]: chillingAnimation.default
}

export default class SprucebotAvatar extends Component<ISprucebotAvatarProps> {
	public static defaultProps = {
		stateOfMind: IHWSprucebotAvatarStateOfMind.Chilling,
		size: IHWSprucebotAvatarSize.Medium
	}

	public render() {
		const { stateOfMind, size } = this.props

		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData:
				ANIMATION_MAP[stateOfMind || IHWSprucebotAvatarStateOfMind.Chilling],
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
