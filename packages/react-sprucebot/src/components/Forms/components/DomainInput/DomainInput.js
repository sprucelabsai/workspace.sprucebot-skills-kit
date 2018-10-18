// @flow
// TODO: May be better as a stateful component in order to trim itself
import React from 'react'
import TextInput from '../TextInput/TextInput'

type Props = {
	id: string
}

const DomainInput = (props: Props) => {
	const { id, ...rest } = props
	return <TextInput id={id} {...rest} />
}

export default DomainInput
