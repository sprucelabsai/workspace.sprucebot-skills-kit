import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
const debug = require('debug')('@sprucelabs/spruce-next-helpers')

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

		let orgWhitelabel

		//we have any whitelabelling happening?
		if (
			auth &&
			auth.Location &&
			auth.Location.Organization &&
			auth.Location.Organization.allowWhiteLabelling &&
			auth.Location.Organization.whiteLabellingStylesheetUrl
		) {
			orgWhitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl
		}

		return { ...page, whitelabel, auth, config, orgWhitelabel }
	}

	render() {
		let bodyClassName =
			this.props.config && this.props.config.SLUG
				? `skill skill-${this.props.config.SLUG}`
				: 'skill'

		return (
			<html className={`skill${bodyClassName}`}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{this.props.config && this.props.config.SKILL_STYLESHEET && (
						<link
							href={this.props.config.SKILL_STYLESHEET}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
					{this.props.whitelabel && (
						<link
							href={this.props.whitelabel}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
					{this.props.orgWhitelabel && (
						<link
							href={this.props.orgWhitelabel}
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
