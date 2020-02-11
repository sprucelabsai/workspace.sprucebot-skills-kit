import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import config from 'config'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const isClient = typeof window !== 'undefined'
if (isClient) {
	global.log = require('@sprucelabs/log/client')

	// Set up log options
	global.log.setOptions({
		level: config.LOG_LEVEL,
		captureFELogs: config.CAPTURE_FE_LOGS,
		logUrl: `${config.SERVER_HOST}/api/1.0/logs.json`,
		useTrace: config.LOG_USE_TRACE,
		useSourcemaps: config.LOG_USE_TRACE,
		appName: config.SLUG,
		appEnv: config.ENV,
		userAgent:
			isClient && navigator.userAgent ? navigator.userAgent : 'unknown',
		packageVersion: config.PACKAGE_VERSION,
		packageName: config.PACKAGE_NAME,
		metricsUrl: config.METRICS_URL,
		metricsEnabled: isClient && config.METRICS_ENABLED
	})
}

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	componentDidMount() {
		if (config.METRICS_ENABLED && config.METRICS_BROWSER_STATS_ENABLED) {
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
				{pageProps.initialProps && pageProps.initialProps.legacyStylesheet ? (
					<Head>
						<link
							href={publicRuntimeConfig.LEGACY_SKILL_STYLESHEET}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					</Head>
				) : (
					<Head>
						<link
							href={publicRuntimeConfig.SKILL_STYLESHEET}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					</Head>
				)}
				<Component {...pageProps} />
			</Container>
		)
	}
}
