import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'

export default class Select extends Component {
	get value() {
		return this.input.value
	}

	render() {
		const p = { ...this.props }

		// set the proper tag
		p.tag = 'select'

		// build the class
		p.className = `custom_dropdown ${p.className || ''} `
		if (p.label) {
			p.className += ' with_label'
		}
		return (
			<Input
				ref={input => {
					this.input = input
				}}
				{...p}
			/>
		)
	}
}
