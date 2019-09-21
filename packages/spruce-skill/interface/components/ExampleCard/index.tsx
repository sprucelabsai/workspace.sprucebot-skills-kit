import React, { Component } from 'react'
import { Card, Text } from '@sprucelabs/react-heartwood-components'

interface IExampleCardProps {
	title: string
	text: string
}

export default class ExampleCard extends Component<IExampleCardProps> {
	public render(): React.ReactElement {
		const { title, text } = this.props
		return (
			<div style={{ margin: '2rem', width: '20rem' }}>
				<Card>
					<Card.Header title={title} />
					<Card.Body isFullBleed={false}>
						<Text text={text} />
					</Card.Body>
				</Card>
			</div>
		)
	}
}
