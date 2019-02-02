//@flow
import React, { PureComponent, Fragment } from 'react'
import cx from 'classnames'
import { Formik, Form } from 'formik'

import BigSearchHeader from '../BigSearchHeader/BigSearchheader'
import BigSearchFooter from '../BigSearchFooter/BigSearchFooter'

import Avatar from '../../../../../Avatar/Avatar'
import Text from '../../../../../Text/Text'
import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from '../../../../../Forms'

type User = {
	id: string,
	phoneNumber: string,
	image?: string,
	firstName?: string,
	lastName?: string
}

type Props = {
	/** pass through handle back button click */
	onClickBack: () => void,

	/** pass through handle close button click */
	onClickClose: () => void
}

type State = {}

export default class QuickAddUserView extends PureComponent<Props, State> {
	_formRef: any = React.createRef()

	state = {}

	handleValidation = async (values: Object) => {
		const errors = {}

		if (Object.keys(errors).length > 0) {
			throw errors
		}

		return {}
	}

	render() {
		const { onClickBack, onClickClose } = this.props

		return (
			<Fragment>
				<BigSearchHeader
					onClickBack={onClickBack}
					onClickClose={onClickClose}
					title="Merge users?"
				/>
				<BigSearchBody>
					<Text>
						It looks like a user with that phone number already exists. Would
						you like to merge these users?
					</Text>
				</BigSearchBody>
				<BigSearchFooter
					primaryAction={{
						text: 'Yes, merge these users',
						type: 'submit',
						disabled: false,
						isLoading: false,
						onClick: () => console.log('submit')
					}}
				/>
			</Fragment>
		)
	}
}
