// To augment a module definition we have to import it but eslint will complain about it being unused
// @ts-ignore
import config from 'config'
import { SpruceConfig } from '@sprucelabs/spruce-skill-server'
import defaultConfig from '../../config/default'

type configType = typeof defaultConfig
type baseConfigType = typeof SpruceConfig

declare module 'config' {
	interface IConfig extends baseConfigType, configType {
		blahblabhalbhalbhalbhalbhablh: boolean
	}
}
