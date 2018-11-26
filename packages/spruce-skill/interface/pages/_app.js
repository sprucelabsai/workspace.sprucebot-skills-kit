import React from 'react'
import App, { Container } from 'next/app'

global.log = require('@sprucelabs/log/client')

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	componentDidMount() {
		const {
			PACKAGE_VERSION,
			PACKAGE_NAME,
			LOG_LEVEL,
			SLUG,
			ENV,
			METRICS_URL,
			METRICS_ENABLED,
			METRICS_BROWSER_STATS_ENABLED
		} = this.props.pageProps.initialState.config

		global.log.setOptions({
			level: LOG_LEVEL,
			appName: SLUG,
			appEnv: ENV,
			userAgent:
				navigator && navigator.userAgent ? navigator.userAgent : 'unknown',
			packageVersion: PACKAGE_VERSION,
			packageName: PACKAGE_NAME,
			metricsUrl: METRICS_URL,
			metricsEnabled: METRICS_ENABLED
		})

		if (METRICS_ENABLED && METRICS_BROWSER_STATS_ENABLED) {
			// We need to wait to ensure that "loadTime" has been set
			setTimeout(() => {
				log.collectBrowserMetrics()
				log.debug('Browser Page Load Metrics Collected:', log.times())
			}, 1000)
		}
	}

	componentDidCatch(error, info) {
		log.crit({ error, info })
		log.metric('componentDidCatch')
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Container>
				<Component {...pageProps} />
			</Container>
		)
	}
}
