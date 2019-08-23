/* eslint-disable */
// To augment a module definition we have to import it but eslint will complain about it being unused
// @ts-ignore
import config from 'config'
/* eslint-enable */
import defaultConfig from '../../spruce-skill/config/default'

type defaultConfigType = typeof defaultConfig

declare module 'config' {
	export interface IConfig extends defaultConfigType {}
}
