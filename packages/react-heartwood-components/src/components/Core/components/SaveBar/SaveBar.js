// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'

export type Props = {
	/** The current location */
	location?: Object
}

type State = {}

export default class SaveBar extends React.PureComponent<Props, State> {
	state = {}

	static defaultProps = {}

	render() {
		const classes = cx('')

		return (
			<div className="save-bar">
				<div className="save-bar__left">
					{location ? (
						<p className="save-bar__text">{location.name}</p>
					) : (
						<p className="save-bar__text">Sprucebot</p>
					)}
				</div>
				<div className="save-bar__right">
					<p className="save-bar__title">Unsaved changes</p>
					<Button kind="simple">Discard</Button>
					<Button kind="primary">Save</Button>
				</div>
			</div>
		)
	}
}
