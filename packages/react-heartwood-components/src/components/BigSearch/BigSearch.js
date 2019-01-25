// @flow
import React, { Component } from 'react'
import { Formik, Form } from 'formik'

import Button from '../Button/Button'
import { Search } from '../Forms'

type Props = {}

type State = {
	isAddGuestShowing: boolean
}

export default class BigSearch extends Component<Props, State> {
	static defaultProps = {}

	state = {
		isAddGuestShowing: false
	}

	render() {
		const { isAddGuestShowing } = this.state
		return (
			<div class="big-search-overlay">
				<div class="big-search">
					<div class="big-search__search-view-header">
						<div class="big-search__search-view-search-bar">
							<Search type="text" placeholder={'CHANGE ME'} readOnly={false} />
							<div class="big-search__search-view-search-bar-buttons">
								<Button text="Clear" />
								<Button icon={{ name: 'close' }} />
							</div>
						</div>
						<Button
							className="big-search__search-view-context-btn"
							text="Quick add a new guest"
							icon={{ name: 'add' }}
						/>
					</div>
				</div>
			</div>
		)
	}
}
