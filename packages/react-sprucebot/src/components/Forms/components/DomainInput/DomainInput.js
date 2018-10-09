// @flow
// TODO: May be better as a stateful component in order to trim itself
import React from 'react'
import TextInput from '../TextInput/TextInput'

type Props = {}

const DomainInput = (props: Props) => {
	const { ...rest } = props
	return <TextInput {...rest} />
}

export default DomainInput
