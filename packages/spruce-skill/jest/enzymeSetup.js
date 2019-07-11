import 'raf/polyfill'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

// Mock the global logger that is always available
global.log = {
	trace: (...args) => console.log('trace', args),
	debug: (...args) => console.log('debug', args),
	info: (...args) => console.log('info', args),
	warn: (...args) => console.log('warn', args),
	crit: (...args) => console.log('crit', args),
	error: (...args) => console.log('error', args),
	superInfo: (...args) => console.log('superInfo', args),
	metric: (...args) => console.log('metric', args)
}
