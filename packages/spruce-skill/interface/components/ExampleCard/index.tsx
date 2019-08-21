import React, { Component } from 'react'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text
} from '@sprucelabs/react-heartwood-components'

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
					<CardHeader title={title} />
					<CardBody isFullBleed={false}>
						<Text>{text}</Text>
					</CardBody>
				</Card>
			</div>
		)
	}
}
