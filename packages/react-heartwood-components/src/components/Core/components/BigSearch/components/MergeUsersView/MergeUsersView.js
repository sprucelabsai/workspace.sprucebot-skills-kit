//@flow
import React, { PureComponent, Fragment } from 'react'
import cx from 'classnames'
import { Formik, Form } from 'formik'

import List from '../../../../../List'

import BigSearchHeader from '../BigSearchHeader/BigSearchheader'
import BigSearchBody from '../BigSearchBody/BigSearchBody'
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
	avatar?: string,
	name?: string
}

type Props = {
	/** imported user to merge */
	importedUser: User,

	/** internal user to merge with */
	internalUser: User,

	/** imported user title */
	importedUserTitle?: string,

	/** pass through handle confirm merge */
	onClickConfirmMerge: () => void,

	/** pass through handle back button click */
	onClickBack: () => void,

	/** pass through handle close button click */
	onClickClose: () => void
}

type State = {}

export default class QuickAddUserView extends PureComponent<Props, State> {
	_formRef: any = React.createRef()

	state = {}

	static defaultProps = {
		importedUserTitle: 'Imported User'
	}

	handleValidation = async (values: Object) => {
		const errors = {}

		if (Object.keys(errors).length > 0) {
			throw errors
		}

		return {}
	}

	render() {
		const {
			importedUser,
			internalUser,
			importedUserTitle,
			onClickConfirmMerge,
			onClickBack,
			onClickClose
		} = this.props

		return (
			<Fragment>
				<BigSearchHeader
					onClickBack={onClickBack}
					onClickClose={onClickClose}
					title="Merge users?"
				/>
				<BigSearchBody className={'big-search__merge-users-view'}>
					<Text>
						It looks like a user with that phone number already exists. Would
						you like to merge these users?
					</Text>
					<List
						isSmall
						header={{ title: importedUserTitle }}
						items={[
							{
								avatar: importedUser.avatar || '',
								title: importedUser.name || '',
								description: importedUser.description || ''
							}
						]}
					/>
					<List
						isSmall
						header={{ title: 'Internal User' }}
						items={[
							{
								avatar: importedUser.avatar || '',
								title: importedUser.name || '',
								description: importedUser.description || ''
							}
						]}
					/>
				</BigSearchBody>
				<BigSearchFooter
					primaryAction={{
						text: 'Yes, merge these users',
						type: 'submit',
						disabled: false,
						isLoading: false,
						onClick: onClickConfirmMerge
					}}
					secondaryAction={{
						text: 'Cancel',
						disabled: false,
						isLoading: false,
						onClick: onClickBack
					}}
				/>
			</Fragment>
		)
	}
}
