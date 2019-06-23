import React, { Component } from 'react'

export default (config, Sharable) => {
	const actionGo = ({ actions, internal = false }) => {
		let newActions = false

		if (!internal && config && config.actionsToEvents) {
			newActions = {}

			Object.keys(config.actionsToEvents).map(namespace => {
				//build namespace
				newActions[namespace] = {}

				Object.keys(config.actionsToEvents[namespace]).map(action => {
					//save event
					const event = config.actionsToEvents[namespace][action]

					newActions[namespace][action] = async payload => {
						const response = await actions.sharable.emitEvent(event, payload)
						return response.results
					}

					return {
						event,
						action
					}
				})
			})
		}

		return { ...actions, ...newActions }
	}

	return class SharableWrapper extends Component {
		render() {
			const { ...props } = this.props
			return <Sharable {...props} actions={actionGo(props)} />
		}
	}
}
