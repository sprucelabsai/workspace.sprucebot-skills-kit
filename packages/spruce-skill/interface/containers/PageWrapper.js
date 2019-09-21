import { PageWrapper, withStore, lang } from '@sprucelabs/spruce-next-helpers'
import config from './../client.json'
import actions from './../store/actions'
import reducers from './../store/reducers'
import defaultLang from './../lang/default'

let overridesLang = {}
try {
	overridesLang = require('./../lang/overrides')
} catch (err) {
	// Do nothing
}

//setup lang
lang.mixin(defaultLang, overridesLang || {})

export default Wrapped =>
	withStore(PageWrapper(Wrapped), {
		actions,
		reducers,
		config: { ...config }
	})
