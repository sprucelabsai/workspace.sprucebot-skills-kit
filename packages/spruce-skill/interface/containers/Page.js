import { Page, withStore } from '@sprucelabs/react-heartwood-components'
import config from './../client'
import actions from './../store/actions'
import reducers from './../store/reducers'
import { lang } from '@sprucelabs/react-heartwood-components'
import defaultLang from './../lang/default'

let overridesLang = {}
try {
	overridesLang = require('./../lang/overrides')
} catch (err) {}

//setup lang
lang.mixin(defaultLang, overridesLang || {})

export default Wrapped =>
	withStore(Page(Wrapped), {
		actions,
		reducers,
		config: { ...config }
	})
