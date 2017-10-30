import React from 'react'
import Link from 'next/link'
import {
	Container,
	H1,
	H2,
	H3,
	BotText,
	Pre,
	Card,
	Paragraph
} from 'react-sprucebot'

import Page from '../containers/Page'
import Styleguide from '../containers/Styleguide'

const DeveloperPage = props => (
	<div>
		<Container>
			<H1>Hello Sprucebot Skills Developer!</H1>
			<BotText>I come pre-configured with a few different pages:</BotText>
			<ul>
				<li>
					<Link href="/marketing">
						<a>Marketing Page</a>
					</Link>
				</li>
				<li>
					<Link href="/owner">
						<a>Owner Page</a>
					</Link>
				</li>
			</ul>
			<H2>Getting Started</H2>
			{codeExample(props)}
		</Container>
		<H2>🌲 🤖</H2>
		<Styleguide />
	</div>
)

export default Page(DeveloperPage)

function codeExample({ actions, ...props }) {
	return (
		<Card>
			<H3>interfaces/pages/index.js</H3>
			<Pre>
				{`
import React from 'react'
import Page from 'sprucebot/Page'
import Container from 'sprucebot/Container'

const MyCustomPage = props => (
  <Container>
    Add some custom jsx here
  </Container>
)

export default Page(MyCustomPage)
	`}
			</Pre>
			<H3>Available Props</H3>
			<Paragraph>
				Try adding query string ?userId=1 to the url and watch how these props
				change
			</Paragraph>
			<ul>
				{Object.keys(props).map(key => (
					<Pre key={key}>
						{key} :{' '}
						{typeof props[key] === 'function'
							? 'function()'
							: JSON.stringify(props[key])}
					</Pre>
				))}
			</ul>

			<H3>Available Actions</H3>
			<ul>
				{Object.keys(actions).map(key => (
					<Pre key={key}>{key} : function()</Pre>
				))}
			</ul>
		</Card>
	)
}
