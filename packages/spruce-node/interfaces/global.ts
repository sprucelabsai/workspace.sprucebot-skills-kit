/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-namespace */
import { ISpruceLog, ISpruceLogger } from '@sprucelabs/log'
declare global {
	// @ts-ignore
	const log: ISpruceLog
	// @ts-ignore
	const logger: ISpruceLogger
}

export {}
