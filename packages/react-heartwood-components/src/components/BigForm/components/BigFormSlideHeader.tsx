import React from 'react'
import cx from 'classnames'
import SprucebotTypedMessage from '../../SprucebotTypedMessage/SprucebotTypedMessage'
import {
	IHWSprucebotAvatarStateOfMind,
	IHWSprucebotTypedMessageSize
} from '@sprucelabs/spruce-types'

export interface IBigFormSlideHeaderProps {
	/** what question are we asking (fed to typed message) */
	question: string
	/** the state of mind of sprucebot for this header */
	sprucebotStateOfMind?: IHWSprucebotAvatarStateOfMind
	/** how big should sprubot be? */
	sprucebotSize?: IHWSprucebotTypedMessageSize
	/** all children */
	children?: React.ReactElement
}

class BigFormSlideHeader extends React.Component<IBigFormSlideHeaderProps> {
	public static defaultProps = {
		sprucebotSize: IHWSprucebotTypedMessageSize.Medium,
		sprucebotStateOfMind: IHWSprucebotAvatarStateOfMind.Chill
	}

	messageRef = React.createRef<SprucebotTypedMessage>()

	public focus = async () => {
		if (this.messageRef.current) {
			await this.messageRef.current.reset()
			await this.messageRef.current.play()
		}
	}
	public blur = () => {
		return this.messageRef.current && this.messageRef.current.pause()
	}

	public render(): React.ReactElement {
		const {
			question,
			sprucebotSize,
			sprucebotStateOfMind,
			children
		} = this.props

		return (
			<div className={cx('slide-header')}>
				<SprucebotTypedMessage
					ref={this.messageRef}
					paused={true}
					startDelayMs={300}
					id="top-question"
					size={sprucebotSize}
					defaultAvatar={{
						id: 'question',
						stateOfMind: sprucebotStateOfMind
					}}
					sentences={[
						{
							words: question
						}
					]}
				/>
				{children}
			</div>
		)
	}
}

export default BigFormSlideHeader
