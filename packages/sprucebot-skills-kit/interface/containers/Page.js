import { Page, withStore } from '@sprucelabs/react-sprucebot'
import config from './../client'
import actions from './../store/actions'
import reducers from './../store/reducers'
import { lang } from '@sprucelabs/react-sprucebot'
import defaultLang from './../lang/default'

// Load the react-sprucebot stylesheet
import '@sprucelabs/react-sprucebot/styles.scss'

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
