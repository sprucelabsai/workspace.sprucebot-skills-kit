//@flow
import React, { PureComponent, Fragment } from 'react'
import cx from 'classnames'
import { Formik, Form } from 'formik'

import BigSearchHeader from '../BigSearchHeader/BigSearchheader'
import BigSearchFooter from '../BigSearchFooter/BigSearchFooter'

import Avatar from '../../../../../Avatar/Avatar'
import Subheading from '../../../../../Subheading/Subheading'
import Loader from '../../../../../Loader/Loader'
import {
	TextInput,
	PhoneInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem,
	isValidPhoneNumber
} from '../../../../../Forms'

type User = {
	id: string,
	phoneNumber: string,
	image?: string,
	firstName?: string,
	lastName?: string
}

type Props = {
	/** handle user added or updated */
	onUserAddedOrUpdated: (user: User) => void,

	/** pass through handle back button click */
	onClickBack: () => void,

	/** pass through handle close button click */
	onClickClose: () => void
}

type State = {
	existingUser: ?User,
	currentPhoneNumber: string,
	canAddOrUpdateUser: boolean,
	isSearchingUsers: boolean,
	isSubmitting: boolean
}

export default class QuickAddUserView extends PureComponent<Props, State> {
	_formRef: any = React.createRef()

	state = {
		existingUser: null,
		currentPhoneNumber: '',
		canAddOrUpdateUser: false,
		isSearchingUsers: false,
		isSubmitting: false
	}

	searchExistingUsers = async (phoneNumber: string) => {
		this.setState({ isSearchingUsers: true })

		//TODO: Search for existing users and populate form if existing user is found.
		const existingUser =
			phoneNumber === '+13035555555'
				? {
						id: '123',
						image: require('../../../../../../../static/assets/users/user-01--96w.png'),
						firstName: 'Vicenta',
						lastName: 'Maggio',
						phoneNumber: '+13035555555'
				  }
				: null

		const mockRequest = ms => new Promise(resolve => setTimeout(resolve, ms))
		return mockRequest(1000).then(() => {
			this.setState({
				canAddOrUpdateUser: true,
				isSearchingUsers: false,
				existingUser: existingUser
			})

			this.resetQuickAddForm({
				...existingUser,
				phoneNumber:
					(existingUser && existingUser.phoneNumber) ||
					this.state.currentPhoneNumber
			})
		})
	}

	resetQuickAddForm = (existingUser?: Object) => {
		const { current: form } = this._formRef
		if (form instanceof Formik) {
			form.resetForm(existingUser)
		}
	}

	handleSubmitQuickAdd = async (values: Object) => {
		this.setState({ isSubmitting: true })
		//TODO: Submit the quick add form
		const mockRequest = ms => new Promise(resolve => setTimeout(resolve, ms))

		return mockRequest(1000).then(() => {
			this.setState({ isSubmitting: false })

			this.onUserAddedOrUpdated && this.onUserAddedOrUpdated({})
		})
	}

	handlePhoneChange = (phone: string) => {
		const { current: form } = this._formRef
		if (form instanceof Formik) {
			form.setFieldValue('phoneNumber', phone)
		}
	}
	handlePhoneBlur = () => {
		const { current: form } = this._formRef
		if (form instanceof Formik) {
			form.setFieldTouched('phoneNumber', true)
		}
	}

	handleValidation = async (values: Object) => {
		const errors = {}

		try {
			const isInvalidPhone =
				!values.phoneNumber || !isValidPhoneNumber(values.phoneNumber, 'US')
					? (errors.phoneNumber = 'Please enter a valid phone number.')
					: false

			if (
				values.phoneNumber &&
				values.phoneNumber !== this.state.currentPhoneNumber
			) {
				this.setState({
					canAddOrUpdateUser: false,
					existingUser: null,
					currentPhoneNumber: values.phoneNumber
				})

				if (!isInvalidPhone) {
					this.searchExistingUsers(values.phoneNumber)
				}
			}
		} catch (err) {
			values.phoneNumber = 'Please enter a valid phone number.'
		}

		if (Object.keys(errors).length > 0) {
			throw errors
		}

		return {}
	}

	render() {
		const { onClickBack, onClickClose } = this.props
		const { existingUser, isSearchingUsers, canAddOrUpdateUser } = this.state
		return (
			<Fragment>
				<BigSearchHeader
					onClickBack={onClickBack}
					onClickClose={onClickClose}
					title="Quick add a guest"
				/>
				<div className={cx('big-search__view-body')}>
					<Formik
						ref={this._formRef}
						initialValues={existingUser || {}}
						validate={this.handleValidation}
						render={props => {
							const {
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								dirty,
								isValid,
								isSubmitting
							} = props
							return (
								<Form
									className={cx('big-search__quick-add-form', {
										'big-search__quick-add-form--show-user-fields': canAddOrUpdateUser
									})}
								>
									<FormLayout spacing="tight">
										<FormLayoutItem>
											{
												<PhoneInput
													name="phoneNumber"
													label="Phone Number"
													placeholder="(555) 555-5555"
													onChange={this.handlePhoneChange}
													onBlur={this.handlePhoneBlur}
													value={values.phoneNumber || ''}
													error={touched.phoneNumber && errors.phoneNumber}
												/>
											}
										</FormLayoutItem>
										{existingUser && (
											<FormLayoutItem>
												<Subheading>
													It looks like a user with that number already exists:
												</Subheading>
											</FormLayoutItem>
										)}
										{existingUser && existingUser.image && (
											<FormLayoutItem>
												<Avatar
													className="big-search__quick-add-user-avatar"
													alt={existingUser.firstName || ''}
													image={existingUser.image}
													isLarge
												/>
											</FormLayoutItem>
										)}
										<FormLayoutGroup>
											<FormLayoutItem className="big-search__quick-add-first-name">
												{
													<TextInput
														name="firstName"
														label="First Name (Optional)"
														placeholder="Guest's first name"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.firstName || ''}
														error={touched.firstName && errors.firstName}
													/>
												}
											</FormLayoutItem>
											<FormLayoutItem className="big-search__quick-add-last-name">
												{
													<TextInput
														name="lastName"
														label="Last Name (Optional)"
														placeholder="Guest's last name"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.lastName || ''}
														error={touched.lastName && errors.lastName}
													/>
												}
											</FormLayoutItem>
										</FormLayoutGroup>
									</FormLayout>
								</Form>
							)
						}}
					/>
					{isSearchingUsers && <Loader />}
				</div>
				{canAddOrUpdateUser && (
					<BigSearchFooter
						primaryAction={{
							text: existingUser ? 'Go' : 'Add guest',
							type: 'submit',
							disabled: false,
							isLoading: false,
							onClick: this.handleSubmitQuickAdd
						}}
					/>
				)}
			</Fragment>
		)
	}
}
