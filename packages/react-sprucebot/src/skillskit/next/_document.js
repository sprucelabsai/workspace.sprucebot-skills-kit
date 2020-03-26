import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
const debug = require('debug')('@sprucelabs/react-sprucebot')

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, query, store }) {
		const page = renderPage(App => props => <App {...props} />)
		// Store is undefined when hmr is the first
		// request the server sees after boot
		// Ideally store is always defined.
		// Revisit when using `next>5.0.0`
		if (!store) {
			debug('No store in _document')
			return { ...page }
		}
		const { auth, config } = store.getState()
		let whitelabel = config.WHITELABEL

		return { ...page, whitelabel, auth, config }
	}

	render() {
		let bodyClassName =
			this.props.config && this.props.config.SLUG
				? ` skill-${this.props.config.SLUG}`
				: ''

		return (
			<html className={`skill${bodyClassName}`}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link
						href={
							(this.props.config && this.props.config.SKILL_STYLESHEET) ||
							'https://hello.sprucebot.com/skills.css'
						}
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
					/>
					{this.props.whitelabel && (
						<link
							href={this.props.whitelabel}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
				</Head>
				<body className={bodyClassName}>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}