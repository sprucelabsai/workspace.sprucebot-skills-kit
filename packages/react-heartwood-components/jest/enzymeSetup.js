import 'raf/polyfill'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

// Mock the global logger that is always available
global.log = {
	trace: () => console.log('trace', arguments),
	debug: () => console.log('debug', arguments),
	info: () => console.log('info', arguments),
	warn: () => console.log('warn', arguments),
	crit: () => console.log('crit', arguments),
	error: () => console.log('error', arguments),
	superInfo: () => console.log('superInfo', arguments),
	metric: () => console.log('metric', arguments)
}

// taken from: https://github.com/facebook/jest/issues/3457
// added to test propTypes
expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received
		const type =
			initialType === 'object'
				? Array.isArray(received)
					? 'array'
					: initialType
				: initialType
		return type === argument
			? {
					message: () => `expected ${received} to be type ${argument}`,
					pass: true
			  }
			: {
					message: () => `expected ${received} to be type ${argument}`,
					pass: false
			  }
	}
})
