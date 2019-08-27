// To augment a module definition we have to import it but eslint will complain about it being unused
// @ts-ignore
import config from 'config'
import { SpruceConfig } from '@sprucelabs/spruce-skill-server'
import acl from '../../config/acl'
import defaultConfig from '../../config/default'

type aclType = typeof acl
type configType = typeof defaultConfig
// interface s extends SpruceConfig<aclType> {}
// type baseConfigType = typeof SpruceConfig

declare module 'config' {
	// interface IConfig extends baseConfigType, configType {}
	interface IConfig extends configType {}
}
